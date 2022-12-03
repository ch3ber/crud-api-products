const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

app.get('/', (req, res) => {
  res.send(`Hola mi primer server en express.
  <br>
  Rutas disponibles:
  <ul>
    <li>/api/v1</li>
    <li>/products</li>
    <li>/categories</li>
    <li>/users</li>
  </ul>
  `)
})

// app.use('/api/v1', router)
// router.use('/products', productsRouter)
// router.use('/categories', categoriesRouter)
// router.use('/users', usersRouter)

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('App listening in port: ' + port)
})
