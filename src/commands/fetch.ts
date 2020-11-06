import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import FileManager from '../services/file-manager.service'
import SecretsManager from '../services/secrets-manager.service'
import {Files} from '../constants'

export default class Fetch extends Command {
  private fileManager = new FileManager()

  private secretsManager = new SecretsManager()

  static description = 'This command used to fetch the secrets manager data and save it into .env file'

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
    const {flags} = this.parse(Fetch)

    if (flags.profile) {
      this.secretsManager.changeProfile = flags.profile
    }

    await cli.action.start('starting a process', 'initializing')

    const secrets = await this.secretsManager.fetchSecrets()
    const envsList = Object.entries(secrets).map(([key, value]) => `${key}='${value}'`).join('\n')

    await this.fileManager.createFile(Files.Env, envsList)
    await cli.action.stop('env\'s successfully fetched')
  }
}
