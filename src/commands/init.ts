import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import FileManager from '../services/file-manager.service'
import {Credentials} from '../attributes'

export default class Init extends Command {
  private fileManager = new FileManager()

  static description = 'This command used to init the secrets manager in root directory of the project'

  static examples = [
    '$ sm-cli init',
    '$ sm-cli init -k AWS_ACCESS_KEY_ID -s AWS_SECRET_ACCESS_KEY -p PROJECT_NAME',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-a, --accessKey=VALUE)
    keyId: flags.string({
      char: 'k',
      description: 'AWS access key id',
    }),
    // flag with a value (-s, --secretAccessKey=VALUE)
    secretAccessKey: flags.string({
      char: 's',
      description: 'AWS secret access key',
    }),
    // flag with a value (-p, --project=VALUE)
    project: flags.string({
      char: 'p',
      description: 'Project secrets name',
    }),
  }

  async run() {
    const {flags} = this.parse(Init)
    let credentials: Partial<Credentials> = {}

    if (flags.keyId && flags.secretAccessKey && flags.project) {
      credentials = flags
    } else {
      credentials.keyId = await cli.prompt('Enter AWS access key id')
      credentials.secretAccessKey = await cli.prompt('Enter AWS secret access key')
      credentials.project = await cli.prompt('Enter project name')
    }

    await cli.action.start('starting a process', 'initializing')

    await this.fileManager.createFile('.secretsrc', credentials)
    await this.fileManager.appendLine('.gitignore', '.secretsrc')
    await this.fileManager.appendLine('.gitignore', '.env')

    await cli.action.stop('secrets manager successfully initialized')
  }
}

