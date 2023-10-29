import { LayerEnum } from './constants/layers.enum'
import { TypeEnum } from './constants/types.enum'

// export types
export type FileTemplate = {
  name: string
  type: TypeEnum
  layer: LayerEnum
  template: string
  target: string
  props?: any
  indexPath?: string
}

export type Config = {
  domainPath: string
  applicationPath: string
  infrastructurePath: string
}
