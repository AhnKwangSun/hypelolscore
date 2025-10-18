'use client'

import { useState } from 'react'
import { playersData, Player, Position, Team } from '@/lib/playersData'
import ParticipantSelection from './ParticipantSelection'
import TeamSelection from './TeamSelection'
import TeamActions from './TeamActions'

export default function TeamBuilder() {
  const [selectedParticipants, setSelectedParticipants] = useState<Set<number>>(new Set())
  const [teamA, setTeamA] = useState<Team>({
    top: null,
    jungle: null,
    middle: null,
    bottom: null,
    supports: null
  })
  const [teamB, setTeamB] = useState<Team>({
    top: null,
    jungle: null,
    middle: null,
    bottom: null,
    supports: null
  })
  const [teamAScore, setTeamAScore] = useState(0)
  const [teamBScore, setTeamBScore] = useState(0)
  const [balanceText, setBalanceText] = useState('선택 필요')
  const [balancePercentage, setBalancePercentage] = useState(0)
  const [isBalanced, setIsBalanced] = useState(true)
  const [targetDiff, setTargetDiff] = useState(2)

  // 팀 점수 계산
  const calculateTeamScore = (team: Team): number => {
    let totalScore = 0
    let playerCount = 0

    Object.entries(team).forEach(([position, player]) => {
      if (player) {
        totalScore += player[position as Position]
        playerCount++
      }
    })

    return playerCount > 0 ? Math.round(totalScore * 10) / 10 : 0
  }

  // 밸런스 업데이트
  const updateBalance = (scoreA: number, scoreB: number) => {
    if (scoreA === 0 && scoreB === 0) {
      setBalanceText('선택 필요')
      setBalancePercentage(0)
      setIsBalanced(true)
      return
    }

    const totalScore = scoreA + scoreB
    const balanceRatio = scoreA / totalScore
    const percentage = Math.round(balanceRatio * 100)

    setBalancePercentage(percentage)

    const scoreDiff = Math.abs(scoreA - scoreB)
    const balanced = scoreDiff <= (totalScore * 0.1)

    setIsBalanced(balanced)
    setBalanceText(balanced
      ? `밸런스 (${scoreDiff.toFixed(1)}점 차이)`
      : `불균형 (${scoreDiff.toFixed(1)}점 차이)`
    )
  }

  // 팀 통계 업데이트
  const updateTeamStats = (newTeamA: Team, newTeamB: Team) => {
    const scoreA = calculateTeamScore(newTeamA)
    const scoreB = calculateTeamScore(newTeamB)
    
    setTeamAScore(scoreA)
    setTeamBScore(scoreB)
    updateBalance(scoreA, scoreB)
  }

  // 팀 선택 처리
  const handleTeamSelection = (team: 'A' | 'B', position: Position, playerId: string) => {
    if (!playerId) {
      // 선택 해제
      if (team === 'A') {
        const newTeamA = { ...teamA, [position]: null }
        setTeamA(newTeamA)
        updateTeamStats(newTeamA, teamB)
      } else {
        const newTeamB = { ...teamB, [position]: null }
        setTeamB(newTeamB)
        updateTeamStats(teamA, newTeamB)
      }
      return
    }

    const player = playersData.find(p => p.id === parseInt(playerId))
    if (!player) return

    let newTeamA = { ...teamA }
    let newTeamB = { ...teamB }

    if (team === 'A') {
      newTeamA[position] = player
      // 다른 팀에서 같은 플레이어 제거
      Object.keys(newTeamB).forEach(pos => {
        if (newTeamB[pos as Position]?.id === player.id) {
          newTeamB[pos as Position] = null
        }
      })
      setTeamA(newTeamA)
      setTeamB(newTeamB)
    } else {
      newTeamB[position] = player
      // 다른 팀에서 같은 플레이어 제거
      Object.keys(newTeamA).forEach(pos => {
        if (newTeamA[pos as Position]?.id === player.id) {
          newTeamA[pos as Position] = null
        }
      })
      setTeamA(newTeamA)
      setTeamB(newTeamB)
    }

    updateTeamStats(newTeamA, newTeamB)
  }

  // 팀 초기화
  const clearTeams = () => {
    const emptyTeam: Team = {
      top: null,
      jungle: null,
      middle: null,
      bottom: null,
      supports: null
    }
    setTeamA(emptyTeam)
    setTeamB(emptyTeam)
    updateTeamStats(emptyTeam, emptyTeam)
  }

  // 자동 밸런싱
  const autoBalanceTeams = () => {
    if (selectedParticipants.size !== 10) {
      alert('내전 참여자를 정확히 10명 선택해주세요! (현재: ' + selectedParticipants.size + '명)')
      return
    }

    clearTeams()

    const positions: Position[] = ['top', 'jungle', 'middle', 'bottom', 'supports']
    const availablePlayers = playersData.filter(p => selectedParticipants.has(p.id))

    let bestTeamA: Team | null = null
    let bestTeamB: Team | null = null
    let bestDiff = Infinity
    let attempts = 0
    const maxAttempts = 10000

    const calculateTeamScoreFromPositions = (team: Record<Position, Player | null>): number => {
      let totalScore = 0
      Object.entries(team).forEach(([position, player]) => {
        if (player) {
          totalScore += player[position as Position]
        }
      })
      return totalScore
    }

    const tryRandomTeamComposition = (): { teamA: Team, teamB: Team } | null => {
      const usedPlayers = new Set<number>()
      const tempTeamA: any = {}
      const tempTeamB: any = {}

      for (const position of positions) {
        const preferredPlayers = availablePlayers.filter(
          p => p.preferredPosition.includes(position) && !usedPlayers.has(p.id)
        )

        if (preferredPlayers.length < 2) {
          return null
        }

        const shuffled = [...preferredPlayers].sort(() => Math.random() - 0.5)
        const playerA = shuffled[0]
        const playerB = shuffled[1]

        usedPlayers.add(playerA.id)
        usedPlayers.add(playerB.id)

        tempTeamA[position] = playerA
        tempTeamB[position] = playerB
      }

      return { teamA: tempTeamA as Team, teamB: tempTeamB as Team }
    }

    while (attempts < maxAttempts) {
      const result = tryRandomTeamComposition()

      if (result) {
        const scoreA = calculateTeamScoreFromPositions(result.teamA)
        const scoreB = calculateTeamScoreFromPositions(result.teamB)
        const diff = Math.abs(scoreA - scoreB)

        if (diff < bestDiff) {
          bestDiff = diff
          bestTeamA = result.teamA
          bestTeamB = result.teamB

          if (diff <= targetDiff) {
            console.log(`목표 달성! ${attempts + 1}번째 시도에서 ${diff.toFixed(1)}점 차이 발견`)
            break
          }
        }
      }

      attempts++
    }

    if (bestTeamA && bestTeamB) {
      setTeamA(bestTeamA)
      setTeamB(bestTeamB)
      updateTeamStats(bestTeamA, bestTeamB)
      console.log(`총 ${attempts}번 시도, 최종 점수 차이: ${bestDiff.toFixed(1)}점`)
    } else {
      alert('밸런싱에 실패했습니다. 선호 라인을 조정해주세요.')
    }
  }

  // 랜덤 팀 구성
  const randomizeTeams = () => {
    if (selectedParticipants.size < 10) {
      alert('내전 참여자를 10명 선택해주세요!')
      return
    }

    clearTeams()

    const availablePlayers = playersData.filter(p => selectedParticipants.has(p.id))
    const shuffledPlayers = [...availablePlayers].sort(() => Math.random() - 0.5)
    const positions: Position[] = ['top', 'jungle', 'middle', 'bottom', 'supports']

    const newTeamA: any = {}
    const newTeamB: any = {}

    positions.forEach((position, i) => {
      const playerA = shuffledPlayers[i * 2]
      const playerB = shuffledPlayers[i * 2 + 1]

      if (playerA) newTeamA[position] = playerA
      if (playerB) newTeamB[position] = playerB
    })

    setTeamA(newTeamA as Team)
    setTeamB(newTeamB as Team)
    updateTeamStats(newTeamA as Team, newTeamB as Team)
  }

  return (
    <div className="team-builder">
      <h2>🏆 5:5 팀 구성</h2>

      <ParticipantSelection
        selectedParticipants={selectedParticipants}
        setSelectedParticipants={setSelectedParticipants}
        clearTeams={clearTeams}
      />

      <TeamSelection
        teamA={teamA}
        teamB={teamB}
        teamAScore={teamAScore}
        teamBScore={teamBScore}
        balanceText={balanceText}
        balancePercentage={balancePercentage}
        isBalanced={isBalanced}
        selectedParticipants={selectedParticipants}
        onTeamSelection={handleTeamSelection}
      />

      <TeamActions
        targetDiff={targetDiff}
        setTargetDiff={setTargetDiff}
        autoBalanceTeams={autoBalanceTeams}
        randomizeTeams={randomizeTeams}
        clearTeams={clearTeams}
      />
    </div>
  )
}

