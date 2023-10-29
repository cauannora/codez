import { GluegunToolbox } from 'gluegun'
import { FileTemplate } from '../types'
import { LayerEnum } from '../constants/layers.enum'
import { TypeEnum } from '../constants/types.enum'

module.exports = {
  name: 'use-case',
  alias: ['u', '--use-case'],
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
        name: `${kebabCase}.use-case.ts`,
        type: TypeEnum.INTERFACE,
        layer: LayerEnum.DOMAIN,
        template: 'application/use-case.interface.ts.ejs',
        target: `core/domain/use-cases/${kebabCase}.use-case.ts`,
        props: {
          name: pascalCase,
        },
      },
      {
        name: `${kebabCase}.use-case.ts`,
        type: TypeEnum.IMPLEMENTATION,
        layer: LayerEnum.APPLICATION,
        template: 'application/use-case.ts.ejs',
        target: `core/application/${kebabCase}.use-case.ts`,
        props: {
          name: pascalCase,
          importPath: `../domain/use-cases/${kebabCase}.use-case`,
          importName: `I${pascalCase}UseCase`,
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
