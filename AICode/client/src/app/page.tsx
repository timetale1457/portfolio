'use client'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    // 1. WebSocket 연결
    const ws = new WebSocket('ws://localhost:3001')
    setSocket(ws)

    ws.onopen = () => console.log('✅ WebSocket 연결 완료')
    ws.onmessage = (msg) => console.log('📨 메시지 도착:', msg.data)
    ws.onclose = () => console.log('❌ 연결 종료됨')

    // 2. 카메라 & 마이크 스트림 가져오기
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      })
      .catch((err) => {
        console.error('🎥 미디어 접근 실패:', err)
      })

    return () => {
      ws.close()
    }
  }, [])

  return (
    <main className="flex justify-center items-center min-h-screen bg-black">
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="w-[600px] rounded-lg border border-white"
      />
    </main>
  )
}
