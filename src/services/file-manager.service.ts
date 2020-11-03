import * as fs from 'fs'

class FileManager {
  public async createFile(path: string, data: any) {
    const content = typeof data === 'string' ? data : JSON.stringify(data, null, 1)
    return fs.writeFileSync(path, content)
  }

  public async appendLine(path: string, line: string) {
    return fs.appendFileSync(path, `\n${line}`)
  }

  public readFile(path: string) {
    return fs.readFileSync(path, 'utf8')
  }

  public async writeFile(path: string, data: any) {
    return fs.writeFileSync(path, data)
  }

  public async lineExistsInFile(path: string, line: string) {
    const existedFile = await this.readFile(path)
    return existedFile.includes(line)
  }

  public async appendLineIfNotExists(path: string, line: string) {
    const lineExists = this.lineExistsInFile(path, line)
    if (lineExists) {
      return
    }

    return this.appendLine(path, `${line}`)
  }

  public async replaceLine(path: string, line: string) {
    const file = await this.readFile(path)

    const tmpArr = file.split('\n')
    const lineIndex = tmpArr.findIndex(item => item.includes(line))

    tmpArr.splice(lineIndex, 1, line)

    return this.writeFile(path, tmpArr.join('\n'))
  }
}

export default FileManager

