import { ManipulateIndex } from './../utils/manipulate-index'
import { GluegunToolbox } from 'gluegun'
import { LayerEnum } from '../constants/layers.enum'
import { FileTemplate } from '../types'
import { TypeEnum } from '../constants/types.enum'

module.exports = {
  name: 'repository',
  alias: ['r', '--repository'],
  run: async ({
    template: { generate },
    filesystem,
    print,
    parameters,
    strings,
  }: GluegunToolbox) => {
    if (!parameters.first) {
      print.error('<name> argument not given.')
      print.error('----> codez repository <nome>')
      return
    }

    const kebabCase = strings.kebabCase(parameters.first)
    const pascalCase = strings.pascalCase(parameters.first)

    const filesList: FileTemplate[] = [
      {
        name: 'Repositories',
        type: TypeEnum.INTERFACE,
        layer: LayerEnum.DOMAIN,
        template: 'repositories/repository.interface.ts.ejs',
        target: `core/domain/repositories/${kebabCase}.repository.ts`,
        props: {
          name: pascalCase,
        },
        indexPath: 'core/domain/repositories/index.ts',
      },
      {
        name: 'Repositories',
        type: TypeEnum.IMPLEMENTATION,
        layer: LayerEnum.INFRASTRUCTURE,
        template: 'repositories/repository.ts.ejs',
        target: `core/infrastructure/repositories/${kebabCase}.repository.ts`,
        props: {
          name: pascalCase,
          importPath: `../../domain/repositories`,
          importName: `I${pascalCase}Repository`,
        },
        indexPath: 'core/infrastructure/repositories/index.ts',
      },
    ]

    const spin = print.spin()
    filesList.map(async (file) => {
      spin.text = `Generating ${file.name} file...`

      //Verify if file already exists on directory
      if (filesystem.exists(file.target) && parameters.options.force !== true) {
        spin.fail(`${file.target} file already exists!`)
        return
      }

      //Generate file
      await generate(file)

      //Manipulate index.ts file
      new ManipulateIndex().addOrCreateExport(
        file.indexPath,
        `./${kebabCase}.repository`
      )
      if (parameters.options.force) {
        spin.warn(`${file.target} overrides!`)
      } else {
        spin.succeed(`${file.target} file generated!`)
      }
    })

    await Promise.all(filesList)
  },
}
