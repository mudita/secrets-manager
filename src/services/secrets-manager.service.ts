import * as AWS from 'aws-sdk'
import FileManager from './file-manager.service'
import {Credentials} from '../attributes'

class SecretsManager {
  private fileManager = new FileManager()

  private client: AWS.SecretsManager

  private credentials: Credentials

  constructor() {
    this.credentials = this.fileManager.readFile('.secretsrc')

    this.client = new AWS.SecretsManager({
      region: 'eu-central-1',
      accessKeyId: this.credentials.keyId,
      secretAccessKey: this.credentials.secretAccessKey,
    })
  }

  public async fetchSecrets() {
    const response = await this.client.getSecretValue({SecretId: this.credentials.project}).promise()
    return JSON.parse(response.SecretString ?? '')
  }
}

export default SecretsManager
