'use client'

import { playersData } from '@/lib/playersData'

interface Props {
  selectedParticipants: Set<number>
  setSelectedParticipants: (participants: Set<number>) => void
  clearTeams: () => void
}

export default function ParticipantSelection({ 
  selectedParticipants, 
  setSelectedParticipants,
  clearTeams 
}: Props) {
  const toggleParticipant = (playerId: number) => {
    const newSet = new Set(selectedParticipants)
    
    if (newSet.has(playerId)) {
      newSet.delete(playerId)
    } else {
      if (newSet.size >= 10) {
        alert('최대 10명까지만 선택할 수 있습니다.')
        return
      }
      newSet.add(playerId)
    }
    
    setSelectedParticipants(newSet)
  }

  const selectAll = () => {
    const newSet = new Set<number>()
    playersData.slice(0, 10).forEach(player => {
      newSet.add(player.id)
    })
    setSelectedParticipants(newSet)
  }

  const clearSelection = () => {
    setSelectedParticipants(new Set())
    clearTeams()
  }

  return (
    <div className="participant-selection">
      <h3>📋 내전 참여자 선택 (10명)</h3>
      <div className="participant-grid">
        {playersData.map(player => (
          <button
            key={player.id}
            className={`participant-btn ${selectedParticipants.has(player.id) ? 'selected' : ''}`}
            onClick={() => toggleParticipant(player.id)}
          >
            {player.name}
          </button>
        ))}
      </div>
      <div className="participant-actions">
        <button onClick={selectAll} className="small-btn">전체 선택</button>
        <button onClick={clearSelection} className="small-btn">선택 초기화</button>
        <span className="selected-count">
          선택: <strong>{selectedParticipants.size}</strong> / 10명
        </span>
      </div>
    </div>
  )
}

