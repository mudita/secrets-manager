import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import FileManager from '../services/file-manager.service'
import {variablesKeyFormatter} from '../utils/string.utils'
import {Variable} from '../attributes'
import {Files} from '../constants'

export default class Update extends Command {
  private fileManager = new FileManager()

  static description = 'This command used to update existing variant in .env file'

  static examples = [
    '$ sm-cli update',
    '$ sm-cli update -k VARIABLE_KEY -v VARIABLE_VALUE',
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
    const {flags} = this.parse(Update)
    let variable: Partial<Variable> = {}

    if (flags.key) {
      variable.key = variablesKeyFormatter(flags.key)
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
      this.fileManager.replaceLine(Files.Env, formattedVariable)
    } else {
      const response = await inquirer.prompt([{
        name: 'replace',
        message: 'This key doesn\'t exists in .env. Do you want to add it?',
        type: 'confirm',
      }])

      if (response.replace) {
        await this.fileManager.appendLine(Files.Env, formattedVariable)
      } else {
        this.exit(0)
      }
    }

    await cli.action.stop(`variable: ${variable.key} successfully updated`)
  }
}
