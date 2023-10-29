import * as fs from 'fs'

export class GetTsConfig {
  private config = null

  constructor() {
    try {
      const tsconfigWithComments = fs.readFileSync('tsconfig.json', 'utf8')
      const tsconfigWithoutComments = tsconfigWithComments.replace(
        /\/\*[\s\S]*?\*\/|\/\/.*/g,
        ''
      )
      this.config = JSON.parse(tsconfigWithoutComments)
    } catch (error) {
      throw new Error('tsconfig.json not found')
    }
  }
}
