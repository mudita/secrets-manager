import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import FileManager from '../services/file-manager.service'
import SecretsManager from '../services/secrets-manager.service'

export default class Fetch extends Command {
  private fileManager = new FileManager()

  private secretsManager = new SecretsManager()

  static description = 'This command used to fetch the secrets manager data and save it into .env file'

  static examples = [
    '$ sm-cli fetch',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    await cli.action.start('starting a process', 'initializing')

    const secrets = await this.secretsManager.fetchSecrets()
    const envsList = Object.entries(secrets).map(([key, value]) => `${key}='${value}'`).join('\n')

    await this.fileManager.createFile('.env', envsList)

    await cli.action.stop('env\'s successfully fetched')
  }
}
