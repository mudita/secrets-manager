import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import FileManager from '../services/file-manager.service'
import {Config} from '../attributes'
import {DEFAULT_REGION} from '../constants'

export default class Init extends Command {
  private fileManager = new FileManager()

  static description = 'This command used to init the secrets manager in root directory of the project'

  static examples = [
    '$ sm-cli init',
    '$ sm-cli init -p PROJECT_NAME -r SECRETS_MANAGER_REGION',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-p, --project=VALUE)
    project: flags.string({
      char: 'p',
      description: 'Project secrets name',
    }),
    // flag with a value (-r, --region=VALUE)
    region: flags.string({
      char: 'r',
      description: 'Secrets manager region',
    })
  }

  async run() {
    const {flags} = this.parse(Init)
    let credentials: Partial<Config> = {}

    if (flags.project) {
      credentials.project = flags.project
    } else {
      credentials.project = await cli.prompt('Enter project name')
    }

    if (flags.region) {
      credentials.region = flags.region
    } else {
      credentials.region = await cli.prompt('Enter secrets manager region', { default: DEFAULT_REGION })
    }

    await cli.action.start('starting a process', 'initializing')

    await this.fileManager.createFile('.secretsrc', credentials)
    await this.fileManager.appendLineIfNotExists('.gitignore', '.secretsrc')
    await this.fileManager.appendLineIfNotExists('.gitignore', '.env')

    await cli.action.stop('secrets manager successfully initialized')
  }
}

