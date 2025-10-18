'use client'

import { useState, useEffect } from 'react'
import TeamBuilder from '@/components/TeamBuilder'

export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>🏆 롤내전 5:5 팀 구성</h1>
        <p>라인별로 플레이어를 선택하여 공정한 팀을 구성하세요</p>
      </header>

      <main>
        <TeamBuilder />
      </main>

      <footer>
        <p>Hype 롤 내전 점수 시스템 v1.0</p>
      </footer>
    </div>
  )
}

