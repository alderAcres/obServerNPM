const express = require('express')
const Layer = require('./layer') // method that I had to import directly from express
const app = express()
const PORT = 5000
const fs = require('fs')
// global store for req and response objects

let observer = {};

observer.appVar = {};

observer.newStack = [];

observer.loggerMid = {
  req: [], 
  res: [], 
  context: [], 
}
// dummy middleware function 
observer.observerMiddleware = (req, res, next) => {
  console.log('this is our middleware function!')
  observer.loggerMid.req.push("ourReq")
  observer.loggerMid.res.push("ourRes")
  next();
}

observer.js = (req, res, next) => {
  observer.appVar._router.stack.forEach((layer, index) => {
    if (layer.route) {
      layer.route.stack.forEach((existingMiddleware) => {
        // Create a new express layer for our middleware function 
        const ourMiddleware = Layer('/', {}, observer.observerMiddleware)
        ourMiddleware.method = existingMiddleware.method // attach some required properties

        observer.newStack.push(existingMiddleware) // push the user's middleware to the stack
        observer.newStack.push(ourMiddleware) // push our middleware to the stack
      })
     layer.route.stack = observer.newStack // reassign the stack
    }
  })
}


module.exports = observer;