const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
})
const bodyParser = require('body-parser')
const Process = require('./core/process')
const proc = new Process()
const port = 3001

app.use(bodyParser.json())
app.use(express.static('static'))

app.post('/', (req, res) => {
    let result = proc.get(req.body)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end()
    io.emit('render', result)
});

io.on('connection', (socket) => {
    console.log('a user connected')
})

http.listen(port)