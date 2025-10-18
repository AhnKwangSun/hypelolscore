'use client'

interface Props {
  targetDiff: number
  setTargetDiff: (value: number) => void
  autoBalanceTeams: () => void
  randomizeTeams: () => void
  clearTeams: () => void
}

export default function TeamActions({
  targetDiff,
  setTargetDiff,
  autoBalanceTeams,
  randomizeTeams,
  clearTeams
}: Props) {
  return (
    <div className="team-actions">
      <div className="balance-input-group">
        <label htmlFor="scoreDiffInput">목표 점수 차이:</label>
        <input
          type="number"
          id="scoreDiffInput"
          value={targetDiff}
          onChange={(e) => setTargetDiff(parseFloat(e.target.value) || 2)}
          min="0"
          max="10"
          step="0.5"
        />
        <span>점 이내</span>
      </div>
      <button onClick={autoBalanceTeams} className="action-btn">
        자동 밸런싱
      </button>
      <button onClick={randomizeTeams} className="action-btn">
        랜덤 팀
      </button>
      <button onClick={clearTeams} className="action-btn">
        팀 초기화
      </button>
    </div>
  )
}

