# What is this?

ObServer.js is a npm package and a cross platform, intuitive desktop application that allows developers to send requests and not just view the response, 
but to also gain access to the entire response lifecycle. This data includes the exact path the response took through routes and middlewares, local and param variables, 
timestamps for each middleware function to track performance metrics, and helpful
information to trace when and why errors occur. 

Imagine the typical request/ response cycle that you're accustomed to, but in a visualized manner that tracks the entire journey of the response to allow for greater clarity with complex backend code and a more thorough understanding of server side data for enhanced debugging support.

# Installation 

`npm i observer-js`
Then... show usage. How a user would use it!

```
const obServer = require('observer-js')


app.use(obServer) 
```

# Options 