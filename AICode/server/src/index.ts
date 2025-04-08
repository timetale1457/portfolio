import express from 'express'
import { WebSocketServer } from 'ws'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`)
})

const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  console.log('✅ 클라이언트 WebSocket 연결됨')

  ws.on('message', (message: string) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(message)
      }
    })
  })

  ws.on('close', () => {
    console.log('❌ 클라이언트 연결 종료됨')
  })
})
