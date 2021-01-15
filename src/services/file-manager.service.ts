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
    const exists = this.fileExistsSync(path)
    
    if (exists) {
      return fs.readFileSync(path, 'utf8')
    } else {
      throw new Error(`File: ${path} doesn't exists`)
    }
  }

  public async readOrCreate(path: string) {
    const exists = this.fileExistsSync(path)
    if (!exists) {
      await this.createFile(path, '')
    }

    return this.readFile(path)
  }

  public fileExistsSync(path: string) {
    return fs.existsSync(path)
  }

  public async writeFile(path: string, data: any) {
    return fs.writeFileSync(path, data)
  }

  public async lineExistsInFile(path: string, line: string) {
    const existedFile = await this.readFile(path)
    return Boolean(existedFile.split('\n').find((line: string) => {
      const [key,] = line.split('=')
      return key === line
    }))
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

    const lineKey = line.split('=')[0]
    const tmpArr = file.split('\n')
    const lineIndex = tmpArr.findIndex((item: string) => {
      const key = item.split('=')[0]
      return key === lineKey
    })

    tmpArr.splice(lineIndex, 1, line)

    return this.writeFile(path, tmpArr.join('\n'))
  }

  public async removeLine(path: string, lineKey: string) {
    const file = await this.readFile(path)

    const tmpArr = file.split('\n')
    const lineIndex = tmpArr.findIndex((item: string) => {
      const key = item.split('=')[0]
      return key === lineKey
    })

    tmpArr.splice(lineIndex, 1)

    return this.writeFile(path, tmpArr.join('\n'))
  }
}

export default FileManager

