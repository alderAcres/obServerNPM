const express = require('express')
const Layer = require('./layer') // method that I had to import directly from express
const app = express()
const PORT = 5000
// global store for req and response objects

const loggerMid = {
  req: [], 
  res: [], 
  context: [], 
}

// dummy middleware function 
const observerMiddleware = (req, res, next) => {
  console.log('this is our middleware function!')
  loggerMid.req.push(req)
  loggerMid.res.push(res)
  next();
}

const alterMiddlewareStack = (req, res, next) => {
  console.log('ALTERING STACK')
  app._router.stack.forEach((layer, index) => {
    if (layer.route) {
      const newStack = []
      layer.route.stack.forEach((existingMiddleware) => {
        // Create a new express layer for our middleware function 
        const ourMiddleware = Layer('/', {}, observerMiddleware)
        ourMiddleware.method = existingMiddleware.method // attach some required properties

        newStack.push(existingMiddleware) // push the user's middleware to the stack
        newStack.push(ourMiddleware) // push our middleware to the stack
      })
     layer.route.stack = newStack // reassign the stack
    }
  })
  next()
}

app.use(alterMiddlewareStack)

const function2 = (req, res, next) => {
  console.log('STACK TRACE 1', app._router.stack[3].route)
  // , app._router.stack[4].route
  next()
}

const function3 = (req, res, next) => {
  console.log('STACK TRACE 2')
  next()
}

const function4 = (req, res) => {
  console.log('STACK TRACE 3')
  console.log('GLOBAL VARIABLES TO STORE REQUEST/RESPONSE CYCLE')
  res.send('done')
}

app.get('/', function2, function3, function4)

app.get('/2', function2, function3, function4)

app.listen(PORT, () => console.log('listening on port ' + PORT))

module.exports.observerjs = observerjs;