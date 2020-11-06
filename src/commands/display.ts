import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import FileManager from '../services/file-manager.service'
import {Files} from '../constants'

export default class Display extends Command {
  private fileManager = new FileManager()

  static description = 'This command used to displaying variables list from .env file'

  static examples = [
    '$ sm-cli display',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const envsList = await this.fileManager.readFile(Files.Env)
    const formattedList = envsList.split('\n').map((line: string) => {
      const keyValue = line.split('=')
      return {key: keyValue[0], value: keyValue[1]}
    })

    cli.table(formattedList, {
      key: {
        header: 'KEY',
      },
      value: {
        header: 'VALUE',
      },
    })
  }
}
