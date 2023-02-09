const http = require('http')
const httpProxy = require('http-proxy')
const jose = require('jose')

const PROXY_PORT = 3128
const JWT_SECRET = new Uint8Array(32)

const validateAuthorization = async (authorizationHeader) => {
  const token = authorizationHeader.split(' ')[1]
  const { _header, payload } = await jose.jwtDecrypt(token, JWT_SECRET)

  return payload
}

const main = async () => {
  // Issue access token
  // This should be done by nevermined one after it validated that a user has a valid subscription
  const token = await new jose.EncryptJWT(
    {
        endpoints: ['http://127.0.0.1:3000'],
        headers: [{ authorization: 'Bearer xxxxx'}]
    })
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256'})
    .setIssuedAt()
    .setExpirationTime('1d')
    .encrypt(JWT_SECRET)

  console.log('Access token:\n\n', token)
   
  const proxy = httpProxy.createProxyServer()
  const server = http.createServer(async function(req, res) {
  
    console.log('proxying request', req.headers)
  
    // validate authorization header
    let payload
    try {
      console.log(JSON.stringify(req.headers))
      payload = await validateAuthorization(req.headers['nvm-authorization'])
    } catch (err) {
      console.error(err)
      res.writeHead(401)
      res.end()
      return
    }
  
    // validate origin url is valid
    const url = new URL(req.url)
  
    if (!payload.endpoints.includes(url.origin)) {
      console.log(`${url.origin} not in ${payload.endpoints}`)
      res.writeHead(401)
      res.end()
      return
    }

    proxy.on('proxyReq', function(proxyReq, req, res, options) {
      proxyReq.removeHeader('nvm-authorization')
      payload.headers.forEach(header => {
        const key = Object.keys(header)[0]
        proxyReq.setHeader(key, header[key])
      })
    })
     
    proxy.web(req, res, { target: url.origin })
  })
   
  console.log(`Proxy listening on port ${PROXY_PORT}`)
  server.listen(PROXY_PORT)
}

(async () => {

  await main()

})()