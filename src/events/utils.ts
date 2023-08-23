/**
 * Taken from https://github.com/Synthetixio/codegen-graph-ts/blob/c7324392c527fd577cdefbdcad976e8c376c03af/src/lib/gql.ts
 */
import _ from 'lodash'
import pluralize from 'pluralize'

export interface GqlArgs {
  [key: string]: true | GqlArgs
}

export type GqlOptions = { [arg: string]: any }

const formatGqlOptions = (options: GqlOptions): string => {
  return _.map(options, (v, k) => {
    let valueString: string
    if (_.isPlainObject(v)) {
      valueString = `{${formatGqlOptions(v)}}`
    } else if (Array.isArray(v)) {
      let parsedArray = '['
      for (let i = 0; i < v.length; i++) {
        parsedArray = parsedArray.concat(`"${v[i]}",`)
      }
      parsedArray = parsedArray.slice(0, -1).concat(']')
      return `${k}:`.concat(parsedArray)
    } else if (_.isNil(v)) {
      valueString = 'null'
    } else if (v[1] == 'x' || (_.isNaN(parseFloat(v.toString())) && typeof v !== 'boolean')) {
      valueString = `"${v}"`
    } else valueString = v
    return `${k}:${valueString}`
  }).join(',')
}

const formatGqlArgs = (args: GqlArgs): string => {
  return (
    '{' +
    _.map(args, (v, k) => {
      if (v === true) {
        return k
      } else {
        return `${k}${formatGqlArgs(v)}`
      }
    }).join(' ') +
    '}'
  )
}

export const generateGql = (name: string, options: GqlOptions, args: GqlArgs): string => {
  return `{${name}${
    Object.keys(options).length ? `(${formatGqlOptions(options)})` : ''
  }${formatGqlArgs(args)}}`
}

export const getMethodName = (eventName: string) => {
  const index = eventName.split('').findIndex((ch) => ch === ch.toLowerCase())
  const normalizedName =
    eventName.substring(0, index).toLocaleLowerCase() + eventName.substring(index, eventName.length)

  return pluralize.plural(_.camelCase(normalizedName))
}
