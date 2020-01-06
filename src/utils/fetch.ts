import nodeFetch, { HeadersInit, RequestInit, Response } from 'node-fetch'
import * as config from '../constants/configs'
import * as spinner from './spinner'

const setApiDomain = (input: string): string => {
  input = !/^(https:|http:)?\/\//.test(input) ? `${config.host}${input}` : input
  input = input.replace(/([^:])[/\\\\]{2,}/, '$1/')
  return input
}

const setApiOptions = (input: RequestInit | any): RequestInit => {
  const userHeaders = input.headers || {}
  const safeHeaders: HeadersInit = Object.assign({}, {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
  }, userHeaders)
  const defaultMethod = input.method || 'GET'
  const body = input.body ? JSON.stringify(input.body) : null
  const nextOptions = Object.assign({}, {
    credentials: 'include',
    mode: 'cors',
    headers: safeHeaders,
    method: defaultMethod.toUpperCase(),
  }, input)

  return body ? Object.assign({}, nextOptions, { body }) : nextOptions
}

const responseParser = <T>(res: Response): Promise<T> => {
  const contentType = res.headers.get('content-type')
  if (`${res.status}`.startsWith('5')) return Promise.reject(new Error('server error'))
  if (`${res.status}` === '404') return Promise.reject(new Error('not found'))
  const key = /\bjson\b/.test(contentType) ? 'json'
    : /\btext\b/.test(contentType) ? 'text' : 'blob'
  const parse = res[key]()
  
  if (res.ok) return parse
  return parse
    .then(err => {
      console.log(err, 44)
      return Promise.reject(err)
    })
}

const fetchBase = <T>(path: string, options = {}): Promise<T> => {
  const url = setApiDomain(path)
  const nextOptions = setApiOptions(options)
  return nodeFetch(url, nextOptions)
    .then(responseParser)
    .then((res: string) => {
      if (typeof res === 'object') return res
      return JSON.parse(res)
    }) as Promise<T>
}

const fetch = <T>(input: string, options: any = {}): Promise<T> => {
  let abortHandle = () => {}
  const defaultAbortTime = options.timeout || 20000
  const abortPromise = new Promise((resolve, reject) => {
    abortHandle = () => {
      spinner.fail()
      reject(new Error('REQUEST_TIMEOUT'))
    }
  })
  
  const fetchWithAbort = Promise.race([
    fetchBase<T>(input, options),
    abortPromise,
  ]) as Promise<T>
  (<any>fetchWithAbort).abort = abortHandle
  
  const timer = setTimeout(() => {
    abortHandle()
    clearTimeout(timer)
  }, defaultAbortTime)
  
  return fetchWithAbort
}

export default fetch
