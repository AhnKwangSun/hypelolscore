'use client'

import { useState } from 'react'
import { Player, Position } from '@/lib/playersData'

interface Props {
  onAddPlayer: (player: Omit<Player, 'id'>) => void
}

export default function PlayerForm({ onAddPlayer }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    top: 5,
    middle: 5,
    bottom: 5,
    supports: 5,
    jungle: 5,
    fighting: 5,
    diceHigh: 5,
    diceLow: 5,
    mental: 5,
    preferredPositions: [] as string[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert('플레이어 이름을 입력해주세요.')
      return
    }

    if (formData.preferredPositions.length === 0) {
      alert('선호 라인을 최소 1개 선택해주세요.')
      return
    }

    const totalScore = 
      formData.top + 
      formData.middle + 
      formData.bottom + 
      formData.supports + 
      formData.jungle + 
      formData.fighting + 
      formData.diceHigh + 
      formData.diceLow + 
      formData.mental

    const newPlayer: Omit<Player, 'id'> = {
      name: formData.name.trim(),
      top: formData.top,
      middle: formData.middle,
      bottom: formData.bottom,
      supports: formData.supports,
      jungle: formData.jungle,
      fighting: formData.fighting,
      diceHigh: formData.diceHigh,
      diceLow: formData.diceLow,
      mental: formData.mental,
      totalScore,
      preferredPosition: formData.preferredPositions
    }

    onAddPlayer(newPlayer)
    
    // 폼 초기화
    setFormData({
      name: '',
      top: 5,
      middle: 5,
      bottom: 5,
      supports: 5,
      jungle: 5,
      fighting: 5,
      diceHigh: 5,
      diceLow: 5,
      mental: 5,
      preferredPositions: []
    })
    
    setIsOpen(false)
  }

  const togglePosition = (position: string) => {
    setFormData(prev => ({
      ...prev,
      preferredPositions: prev.preferredPositions.includes(position)
        ? prev.preferredPositions.filter(p => p !== position)
        : [...prev.preferredPositions, position]
    }))
  }

  const handleNumberChange = (field: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 10) {
      setFormData(prev => ({ ...prev, [field]: numValue }))
    }
  }

  if (!isOpen) {
    return (
      <div className="player-form-toggle">
        <button onClick={() => setIsOpen(true)} className="add-player-btn">
          ➕ 플레이어 추가
        </button>
      </div>
    )
  }

  return (
    <div className="player-form-container">
      <div className="player-form-header">
        <h3>🎮 새 플레이어 추가</h3>
        <button onClick={() => setIsOpen(false)} className="close-btn">✕</button>
      </div>
      
      <form onSubmit={handleSubmit} className="player-form">
        <div className="form-section">
          <label className="form-label">
            플레이어 이름 *
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="이름을 입력하세요"
              className="form-input"
              maxLength={20}
            />
          </label>
        </div>

        <div className="form-section">
          <label className="form-label">선호 라인 * (중복 선택 가능)</label>
          <div className="position-checkboxes">
            {[
              { key: 'top', label: '탑' },
              { key: 'jungle', label: '정글' },
              { key: 'middle', label: '미드' },
              { key: 'bottom', label: '봇' },
              { key: 'supports', label: '서포터' }
            ].map(({ key, label }) => (
              <label key={key} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.preferredPositions.includes(key)}
                  onChange={() => togglePosition(key)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">포지션별 점수 (0~10)</label>
          <div className="score-grid">
            {[
              { key: 'top', label: '탑' },
              { key: 'jungle', label: '정글' },
              { key: 'middle', label: '미드' },
              { key: 'bottom', label: '봇' },
              { key: 'supports', label: '서포터' }
            ].map(({ key, label }) => (
              <div key={key} className="score-input-group">
                <label>{label}</label>
                <input
                  type="number"
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) => handleNumberChange(key, e.target.value)}
                  min="0"
                  max="10"
                  step="0.5"
                  className="score-input"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">기타 능력치 (0~10)</label>
          <div className="score-grid">
            {[
              { key: 'fighting', label: '교전능력+메이킹' },
              { key: 'diceHigh', label: '주사위(고점)' },
              { key: 'diceLow', label: '주사위(저점)' },
              { key: 'mental', label: '멘탈' }
            ].map(({ key, label }) => (
              <div key={key} className="score-input-group">
                <label>{label}</label>
                <input
                  type="number"
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) => handleNumberChange(key, e.target.value)}
                  min="0"
                  max="10"
                  step="0.5"
                  className="score-input"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => setIsOpen(false)} className="cancel-btn">
            취소
          </button>
          <button type="submit" className="submit-btn">
            추가
          </button>
        </div>
      </form>
    </div>
  )
}

