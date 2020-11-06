import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import FileManager from '../services/file-manager.service'
import SecretsManager from '../services/secrets-manager.service'
import {Files} from '../constants'

export default class Sync extends Command {
  private fileManager = new FileManager()

  private secretsManager = new SecretsManager()

  static description = 'This command used to sync variable from local environment with AWS SecretsManager'

  static examples = [
    '$ sm-cli fetch',
    '$ sm-cli fetch -p PROFILE_NAME',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-p, --profile=VALUE)
    profile: flags.string({
      char: 'p',
      description: 'AWS profile name',
    }),
  }

  async run() {
    const {flags} = this.parse(Sync)

    if (flags.profile) {
      this.secretsManager.changeProfile = flags.profile
    }

    await cli.action.start('starting a process', 'initializing')

    const envs = await this.fileManager.readFile(Files.Env)
    const formattedEnvs = envs.split('\n').reduce((acc: Record<string, string>, line: string) => {
      const [key, value] = line.split('=')
      acc[key] = value.replace(/'/g, '')
      return acc
    }, {})

    const secrets = await this.secretsManager.syncSecrets(formattedEnvs)
    const envsList = Object.entries(secrets).map(([key, value]) => `${key}='${value}'`).join('\n')

    await this.fileManager.createFile(Files.Env, envsList)

    await cli.action.stop('env\'s successfully synced')
  }
}
