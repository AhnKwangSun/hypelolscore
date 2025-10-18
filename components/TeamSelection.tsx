'use client'

import { playersData, Position, Team } from '@/lib/playersData'

interface Props {
  teamA: Team
  teamB: Team
  teamAScore: number
  teamBScore: number
  balanceText: string
  balancePercentage: number
  isBalanced: boolean
  selectedParticipants: Set<number>
  onTeamSelection: (team: 'A' | 'B', position: Position, playerId: string) => void
}

export default function TeamSelection({
  teamA,
  teamB,
  teamAScore,
  teamBScore,
  balanceText,
  balancePercentage,
  isBalanced,
  selectedParticipants,
  onTeamSelection
}: Props) {
  const positions: { key: Position; label: string }[] = [
    { key: 'top', label: '탑' },
    { key: 'jungle', label: '정글' },
    { key: 'middle', label: '미드' },
    { key: 'bottom', label: '봇' },
    { key: 'supports', label: '서포터' }
  ]

  const getAvailablePlayers = (team: 'A' | 'B', currentPosition: Position) => {
    const otherTeam = team === 'A' ? teamB : teamA
    const currentTeam = team === 'A' ? teamA : teamB
    const usedPlayerIds = Object.values(otherTeam)
      .filter(p => p !== null)
      .map(p => p!.id)
    
    return playersData.filter(player => 
      selectedParticipants.has(player.id) && 
      !usedPlayerIds.includes(player.id)
    )
  }

  return (
    <div className="team-selection">
      <div className="team-section">
        <h3>팀 A</h3>
        <div className="position-selectors">
          {positions.map(({ key, label }) => (
            <div key={key} className="position-selector">
              <label>{label}</label>
              <select
                className="player-select"
                value={teamA[key]?.id || ''}
                onChange={(e) => onTeamSelection('A', key, e.target.value)}
              >
                <option value="">선택하세요</option>
                {getAvailablePlayers('A', key).map(player => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="team-stats">
          <p>팀 A 총점: <span>{teamAScore}</span>점</p>
        </div>
      </div>

      <div className="vs-section">
        <div className="vs-text">VS</div>
        <div className="balance-indicator">
          <div className="balance-bar">
            <div
              className={`balance-fill ${!isBalanced ? 'unbalanced' : ''}`}
              style={{ width: `${balancePercentage}%` }}
            ></div>
          </div>
          <p>밸런스: <span>{balanceText}</span></p>
        </div>
      </div>

      <div className="team-section">
        <h3>팀 B</h3>
        <div className="position-selectors">
          {positions.map(({ key, label }) => (
            <div key={key} className="position-selector">
              <label>{label}</label>
              <select
                className="player-select"
                value={teamB[key]?.id || ''}
                onChange={(e) => onTeamSelection('B', key, e.target.value)}
              >
                <option value="">선택하세요</option>
                {getAvailablePlayers('B', key).map(player => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="team-stats">
          <p>팀 B 총점: <span>{teamBScore}</span>점</p>
        </div>
      </div>
    </div>
  )
}

