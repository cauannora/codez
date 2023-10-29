import { filesystem } from 'gluegun'

export class ManipulateIndex {
  addOrCreateExport(file: string, exportPath: string): void {
    if (!filesystem.exists(file)) {
      filesystem.write(file, '')
    }

    this.addExport(file, exportPath)
  }

  addExport(file: string, exportPath: string): void {
    const fileContent = filesystem.read(file)
    const fileLines = fileContent.split('\n')

    const exportLine = `export * from '${exportPath}'`

    if (!fileLines.includes(exportLine)) {
      fileLines.push(exportLine)
    }

    filesystem.write(file, fileLines.join('\n'))
  }
}
