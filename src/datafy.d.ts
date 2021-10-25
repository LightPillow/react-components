export type DatafyType =
'string' | 'string[]' | 'password'
| 'number' |
'minute'

export type DatafyProps = {
  type?: DatafyType
  id: string
  title?: string
  hint?: string
  disabled?: boolean
  options?: {
    label?: string
    value: any
  }[]
  required?: boolean
  visible?(values: any): boolean
  render?(value: any, values: any): JSX.Element
  linkTo?(value: any, values: any): string
}
