import * as AWS from 'aws-sdk'
import FileManager from './file-manager.service'
import {Config} from '../attributes'

class SecretsManager {
  private fileManager: FileManager

  private credentials: AWS.SharedIniFileCredentials

  private config: Config

  constructor() {
    this.credentials = new AWS.SharedIniFileCredentials()
    this.fileManager = new FileManager()
    this.config = JSON.parse(this.fileManager.readFile('.secretsrc'))
  }

  public async fetchSecrets() {
    const response = await this.client.getSecretValue({SecretId: this.config.project}).promise()
    return JSON.parse(response.SecretString ?? '')
  }

  set changeProfile(profile: string) {
    this.credentials = new AWS.SharedIniFileCredentials({ profile })
  }

  get client() {
    return new AWS.SecretsManager({
      region: 'eu-central-1',
      accessKeyId: this.credentials.accessKeyId,
      secretAccessKey: this.credentials.secretAccessKey,
    })
  }
}

export default SecretsManager
