const express = require('express')
const socket = require('socket.io')
const http = require('http')
 
const app = express()
const server = http.Server(app)
const io = socket(server)

// 监听连接事件
io.on('connection', function (socket) {

    console.log('新用户连接成功')

    // 监听 chat-message事件
    socket.on('chat-message', function (data) {
        console.log('消息：' + data)
    //    把客户端发过来的数据 群发出去
        io.emit('message', data)
    })

    //监听到断开连接
    socket.on('disconnect', function () {
        console.log('用户断开连接')
    })

})


app.use(express.static('www'))


server.listen(3000, () => console.log('正在运行...'))
