import { inferAsyncReturnType } from '@trpc/server'
//import { v4 as uuid } from 'uuid'
import { desencriptaToken } from './routers/user'

const apiKey = 'AIzaSyBj_k0FF3JDKTkkP68as3regFugpxtrTjU'
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

export const createContext = async (event: H3Event) => {
  //const requestId = uuid()
  //res.setHeader('x-request-id', requestId)

  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you'd might want to do in your ctx fn

  async function getUserFromHeader() {
    const authorization = getCookie(event, 'token') || ''

    if (authorization) {
      try {
        const user = await desencriptaToken(authorization)
        return user
      } catch (error) {
        return null
      }
    }
    return null
  }
  const user = await getUserFromHeader()
  return {
    user,
    //requestId,
  }
}
export type Context = inferAsyncReturnType<typeof createContext>
