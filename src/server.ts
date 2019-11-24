
import express = require('express')
const app = express()

let ejs = require('ejs');

import path = require('path');
app.use(express.static(path.join(__dirname, '/../public')))

import { MetricsHandler } from './metrics'


app.set('views', __dirname + "/../views")
app.set('view engine', 'ejs');

const port: string = process.env.PORT || '8080'


app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})

app.get('/', (req: any, res: any) => {
  res.write("Hello Stranger, Type /hello/:YOURNAME at the end of the address bar")
  res.end()
})

app.get('/hello/:name', 
  (req, res) => {
    res.render('hello.ejs', {name: req.params.name})
  }
)


app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
