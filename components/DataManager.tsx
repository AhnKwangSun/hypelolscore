'use client'

import { Player } from '@/lib/playersData'

interface Props {
  playersData: Player[]
  onImportPlayers: (players: Player[]) => void
}

export default function DataManager({ playersData, onImportPlayers }: Props) {
  // CSV로 내보내기
  const exportToCSV = () => {
    const headers = [
      'ID',
      '이름',
      'TOP',
      'MIDDLE',
      'BOTTOM',
      'SUPPORTS',
      'JUNGLE',
      '교전능력+메이킹',
      '주사위(고점)',
      '주사위(저점)',
      '멘탈',
      '총점',
      '선호라인'
    ]

    const rows = playersData.map(player => [
      player.id,
      player.name,
      player.top,
      player.middle,
      player.bottom,
      player.supports,
      player.jungle,
      player.fighting,
      player.diceHigh,
      player.diceLow,
      player.mental,
      player.totalScore,
      player.preferredPosition.join('|')
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // BOM 추가 (한글 깨짐 방지)
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `롤내전_플레이어_데이터_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // CSV에서 가져오기
  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split('\n').filter(line => line.trim())
        
        // 헤더 제거
        const dataLines = lines.slice(1)
        
        const importedPlayers: Player[] = dataLines.map(line => {
          const values = line.split(',').map(v => v.trim())
          
          return {
            id: parseInt(values[0]) || 0,
            name: values[1] || '',
            top: parseFloat(values[2]) || 0,
            middle: parseFloat(values[3]) || 0,
            bottom: parseFloat(values[4]) || 0,
            supports: parseFloat(values[5]) || 0,
            jungle: parseFloat(values[6]) || 0,
            fighting: parseFloat(values[7]) || 0,
            diceHigh: parseFloat(values[8]) || 0,
            diceLow: parseFloat(values[9]) || 0,
            mental: parseFloat(values[10]) || 0,
            totalScore: parseFloat(values[11]) || 0,
            preferredPosition: values[12] ? values[12].split('|').filter(p => p) : ['middle']
          }
        })

        if (importedPlayers.length > 0) {
          if (confirm(`${importedPlayers.length}명의 플레이어 데이터를 가져오시겠습니까?\n기존 데이터는 덮어씌워집니다.`)) {
            onImportPlayers(importedPlayers)
            alert('데이터를 성공적으로 가져왔습니다!')
          }
        } else {
          alert('가져올 데이터가 없습니다.')
        }
      } catch (error) {
        console.error('CSV 파싱 에러:', error)
        alert('CSV 파일을 읽는 중 오류가 발생했습니다. 파일 형식을 확인해주세요.')
      }
    }
    reader.readAsText(file)
    
    // 같은 파일을 다시 선택할 수 있도록 초기화
    event.target.value = ''
  }

  // TypeScript 코드로 내보내기
  const exportToTypeScript = () => {
    const tsCode = `export const playersData: Player[] = ${JSON.stringify(playersData, null, 2)}`
    
    const blob = new Blob([tsCode], { type: 'text/typescript;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `playersData_${new Date().toISOString().split('T')[0]}.ts`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // JSON으로 내보내기
  const exportToJSON = () => {
    const jsonContent = JSON.stringify(playersData, null, 2)
    
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `players_${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="data-manager">
      <details className="data-manager-details">
        <summary className="data-manager-summary">
          📊 데이터 관리 (총 {playersData.length}명)
        </summary>
        
        <div className="data-manager-content">
          <div className="data-manager-section">
            <h4>📤 내보내기</h4>
            <div className="button-group">
              <button onClick={exportToCSV} className="export-btn csv">
                📄 CSV 다운로드
              </button>
              <button onClick={exportToJSON} className="export-btn json">
                📋 JSON 다운로드
              </button>
              <button onClick={exportToTypeScript} className="export-btn ts">
                💻 TypeScript 다운로드
              </button>
            </div>
            <p className="help-text">
              💡 CSV: Excel에서 편집 가능 | JSON/TS: 개발자용 코드 파일
            </p>
          </div>

          <div className="data-manager-section">
            <h4>📥 가져오기</h4>
            <label className="import-label">
              <input
                type="file"
                accept=".csv"
                onChange={importFromCSV}
                className="file-input"
              />
              <span className="import-btn">📁 CSV 파일 선택</span>
            </label>
            <p className="help-text">
              ⚠️ CSV 파일을 업로드하면 현재 데이터가 대체됩니다
            </p>
          </div>

          <div className="data-manager-section">
            <h4>📝 CSV 파일 형식</h4>
            <pre className="csv-format">
{`ID,이름,TOP,MIDDLE,BOTTOM,SUPPORTS,JUNGLE,교전능력+메이킹,주사위(고점),주사위(저점),멘탈,총점,선호라인
1,지둥이,4,2,1,1,3,3,5,2,9,30,top|jungle
2,환둥이,0,2,2,2,0,1,2,1,10,20,supports`}
            </pre>
            <p className="help-text">
              📌 선호라인은 | (파이프) 기호로 구분 (예: top|middle|jungle)
            </p>
          </div>
        </div>
      </details>
    </div>
  )
}

