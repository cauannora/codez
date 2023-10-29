import { GluegunToolbox } from 'gluegun'
import { FileTemplate } from '../types'
import { LayerEnum } from '../constants/layers.enum'
import { TypeEnum } from '../constants/types.enum'

module.exports = {
  name: 'entity',
  alias: ['e', '--entity'],
  run: async ({
    template: { generate },
    print,
    parameters,
    strings,
  }: GluegunToolbox) => {
    if (!parameters.first) {
      print.error('Argumento "nome" não informado. Por favor, informe um nome.')
      print.error('----> codez repository <nome>')
      return
    }

    const kebabCase = strings.kebabCase(parameters.first)
    const pascalCase = strings.pascalCase(parameters.first)

    const filesList: FileTemplate[] = [
      {
        name: `${kebabCase}.entity.ts`,
        type: TypeEnum.IMPLEMENTATION,
        layer: LayerEnum.APPLICATION,
        template: 'entities/entity.ts.ejs',
        target: `core/domain/entities/${kebabCase}.entity.ts`,
        props: {
          name: pascalCase,
        },
      },
    ]

    const spin = print.spin()
    filesList.map(async (file) => {
      spin.text = `Generating ${file.target} file...`

      await generate(file)

      spin.succeed(`${file.target} file generated!`)
    })

    await Promise.all(filesList)
  },
}
