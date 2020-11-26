import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import FileManager from '../services/file-manager.service'
import {variablesKeyFormatter} from '../utils/string.utils'
import {Variable} from '../attributes'
import {Files} from '../constants'

export default class Remove extends Command {
  private fileManager = new FileManager()

  static description = 'This command used to removing new variable from .env file'

  static examples = [
    '$ sm-cli remove',
    '$ sm-cli remove -k VARIABLE_KEY',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-k, --key=VALUE)
    key: flags.string({
      char: 'k',
      description: 'variable key',
    }),
  }

  async run() {
    const {flags} = this.parse(Remove)
    const variable: Partial<Variable> = {}

    if (flags.key) {
      variable.key = variablesKeyFormatter(flags.key.replace(/\s+/g, '_'))
    } else {
      variable.key = variablesKeyFormatter(await cli.prompt('Enter variable key'))
    }

    this.fileManager.removeLine(Files.Env, variable.key)

    await cli.action.stop(`variable: ${variable.key} successfully removed`)
  }
}
