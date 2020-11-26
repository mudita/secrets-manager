import * as AWS from 'aws-sdk'
import FileManager from './file-manager.service'
import {Config} from '../attributes'
import {Files} from '../constants'

class SecretsManager {
  private fileManager: FileManager

  private credentials: AWS.SharedIniFileCredentials

  private config: Config

  constructor() {
    this.credentials = new AWS.SharedIniFileCredentials()
    this.fileManager = new FileManager()
    this.config = JSON.parse(this.fileManager.readFile(Files.Secretsrc))
  }

  public async syncSecrets(secrets: Record<string, string>) {
    if (Object.keys(secrets).length) {
      await this.client.updateSecret({
        SecretId: this.config.project,
        SecretString: JSON.stringify(secrets),
      }).promise()
    }

    const response = await this.fetchSecrets()
    return response
  }

  public async fetchSecrets() {
    const response = await this.client.getSecretValue({SecretId: this.config.project}).promise()
    return JSON.parse(response.SecretString ?? '')
  }

  set changeProfile(profile: string) {
    this.credentials = new AWS.SharedIniFileCredentials({profile})
  }

  get client() {
    return new AWS.SecretsManager({
      region: this.config.region,
      accessKeyId: this.credentials.accessKeyId,
      secretAccessKey: this.credentials.secretAccessKey,
    })
  }
}

export default SecretsManager
