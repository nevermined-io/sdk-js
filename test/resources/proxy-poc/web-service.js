const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sum', (req, res) => {
    let a = Number(req.query.a)
    let b = Number(req.query.b)
    let result = `${a + b}`
    res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})