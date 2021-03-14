import { NumberFormat, toLocaleString } from '@formatjs/intl-numberformat'
NumberFormat.__addLocaleData(
  require('@formatjs/intl-numberformat/dist/locale-data/en.json') // locale-data for en
)

export const compactNumbers = (num: number, compact: boolean = false) => {
  let options = {}
  if (compact && num >= 1e3)
    options = { notation: 'compact', compactDisplay: 'short' }
  return toLocaleString(num, 'en-US', options)
}

export const pluralize = (
  val: number,
  word: string,
  compact: boolean = false,
  plural: string = word + 's'
) => {
  const uncountable = ['Software']
  const resultNumber =
    typeof val == 'number' ? compactNumbers(val, compact) + ' ' : ''
  const resultString = val === 1 || uncountable.includes(word) ? word : plural
  return resultNumber + resultString
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export const initMiddleware = (middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
