import { GluegunToolbox } from 'gluegun'
import { LayerEnum } from '../constants/layers.enum'
import { FileTemplate } from '../types'
import { ManipulateIndex } from '../utils/manipulate-index'
import { TypeEnum } from '../constants/types.enum'

module.exports = {
  name: 'init',
  alias: ['init', '--init'],
  run: async ({ template: { generate }, print }: GluegunToolbox) => {
    const filesList: FileTemplate[] = [
      {
        name: 'sample.use-case.ts',
        type: TypeEnum.INTERFACE,
        layer: LayerEnum.DOMAIN,
        template: 'application/use-case.interface.ts.ejs',
        target: 'core/domain/use-cases/sample.use-case.ts',
        indexPath: 'core/domain/use-cases/index.ts',
      },
      {
        name: 'sample.repository.ts',
        type: TypeEnum.INTERFACE,
        layer: LayerEnum.INFRASTRUCTURE,
        template: 'repositories/repository.ts.ejs',
        target: 'core/infrastructure/repositories/sample.repository.ts',
        indexPath: 'core/infrastructure/repositories/index.ts',
      },
      {
        name: 'sample.use-case.ts',
        type: TypeEnum.IMPLEMENTATION,
        layer: LayerEnum.APPLICATION,
        template: 'application/use-case.ts.ejs',
        target: 'core/application/sample.use-case.ts',
        indexPath: 'core/application/index.ts',
      },
      {
        name: 'sample.repository.ts',
        type: TypeEnum.IMPLEMENTATION,
        layer: LayerEnum.DOMAIN,
        template: 'repositories/repository.interface.ts.ejs',
        target: 'core/domain/repositories/sample.repository.ts',
        indexPath: 'core/domain/repositories/index.ts',
      },
      {
        name: 'sample.entity.ts',
        type: TypeEnum.IMPLEMENTATION,
        layer: LayerEnum.DOMAIN,
        template: 'entities/entity.ts.ejs',
        target: 'core/domain/entities/sample.entity.ts',
        indexPath: 'core/domain/entities/index.ts',
      },
    ]

    const spin = print.spin()
    filesList.map(async (file) => {
      spin.text = `Generating ${file.target} file...`

      //Manipulate index.ts file
      new ManipulateIndex().addOrCreateExport(
        file.indexPath,
        `./${file.name.replace('.ts', '')}`
      )

      await generate({
        template: file.template,
        target: file.target,
        props: {
          name: 'Sample',
        },
      })

      spin.succeed(`${file.target} file generated!`)
    })

    await Promise.all(filesList)
  },
}
