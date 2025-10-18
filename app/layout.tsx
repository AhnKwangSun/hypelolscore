import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🏆 롤내전 5:5 팀 구성',
  description: '롤내전 플레이어 능력치 및 점수 관리 시스템',
  keywords: '롤내전, 리그오브레전드, 점수, 능력치, 포지션',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏆</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}

