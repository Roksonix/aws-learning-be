import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import httpContentEncodingMiddleware from '@middy/http-content-encoding'

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(httpContentEncodingMiddleware())
}
