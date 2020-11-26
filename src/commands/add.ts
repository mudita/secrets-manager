import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import FileManager from '../services/file-manager.service'
import {variablesKeyFormatter} from '../utils/string.utils'
import {Variable} from '../attributes'
import {Files} from '../constants'

export default class Add extends Command {
  private fileManager = new FileManager()

  static description = 'This command used to adding new variable to .env file'

  static examples = [
    '$ sm-cli add',
    '$ sm-cli add -k VARIABLE_KEY -v VARIABLE_VALUE',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-k, --key=VALUE)
    key: flags.string({
      char: 'k',
      description: 'variable key',
    }),
    // flag with a value (-v, --value=VALUE)
    value: flags.string({
      char: 'v',
      description: 'variable value',
    }),
  }

  async run() {
    const {flags} = this.parse(Add)
    const variable: Partial<Variable> = {}

    if (flags.key) {
      variable.key = variablesKeyFormatter(flags.key.replace(/\s+/g, '_'))
    } else {
      variable.key = variablesKeyFormatter(await cli.prompt('Enter variable key'))
    }

    if (flags.value) {
      variable.value = flags.value
    } else {
      variable.value = await cli.prompt('Enter variable value')
    }

    const formattedVariable = `${variable.key}='${variable.value}'`
    const keyExistsInFile = await this.fileManager.lineExistsInFile(Files.Env, variable.key!)

    if (keyExistsInFile) {
      const response = await inquirer.prompt([{
        name: 'replace',
        message: 'This key already exists in .env. Do you want to replace it?',
        type: 'confirm',
      }])

      if (response.replace) {
        this.fileManager.replaceLine(Files.Env, formattedVariable)
      } else {
        this.exit(0)
      }
    } else {
      await this.fileManager.appendLine(Files.Env, formattedVariable)
    }

    await cli.action.stop(`variable: ${variable.key} successfully added`)
  }
}
