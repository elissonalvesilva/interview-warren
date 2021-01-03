import { ServerError } from '@/presentation/erros'
import { HttpResponse } from '@/presentation/protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const successResponse = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
