import * as fs from 'fs'

class FileManager {
  public async createFile(file: string, data: any) {
    const content = typeof data === 'string' ? data : JSON.stringify(data, null, 1)
    return fs.writeFileSync(file, content)
  }

  public async appendLine(file: string, line: string) {
    return fs.appendFileSync(file, `\n${line}`)
  }

  public readFile(file: string) {
    return fs.readFileSync(file, 'utf8')
  }

  public async appendLineIfNotExists(file: string, line: string) {
    const existedFile = await this.readFile(file)
    if (existedFile.includes(line)) {
      return
    }

    return this.appendLine(file, line)
  }
}

export default FileManager

