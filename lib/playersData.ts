export interface Player {
  id: number
  name: string
  
  // ========== 주 점수: 포지션별 실력 ==========
  top: number
  middle: number
  bottom: number
  supports: number
  jungle: number
  
  // ========== 부가 정보: 재미 요소 (점수 계산에 미포함) ==========
  fighting: number      // 전투 센스
  diceHigh: number      // 주사위 최고치
  diceLow: number       // 주사위 최저치
  mental: number        // 멘탈
  
  totalScore: number    // 주 점수의 합계 (top + middle + bottom + supports + jungle)
  preferredPosition: string[]
}
// 점수를 더 잘 처리하기 위한 아이디어:
// 1. 지금은 0~10의 scale을 포지션별로 두고 있으나, 각 점수의 의미가 애매할 수 있다. 
//    - 예를 들어 5는 "골드상위+플레바닥"인데, 6~8처럼 실제 티어 기반으로 구분하는 것이 더 직관적임.
// 2. 내부적으로는 tier enum 등으로 관리하고, 필요시 등급별 점수(예를 들어 티어별 평균 Elo 값, 
//    혹은 정규분포상 표준화 점수 등)를 병행해도 됨.
// 3. 포지션 별 weight 혹은 역할 맞춤 scaling(탑은 높은데 서폿/정글은 못하는 경우 등)을 반영하여 
//    "주 포지션" 가중치 totalScore 구현.
// 4. totalScore 산정 공식을 투명하게 정해둔다:
//    - 예시: 주요 포지션 점수 × 2 + 부/희망 포지션 점수 + 전투센스, 멘탈 등 부가 점수 합산
//    - 또는 Elo/평균, 표준편차 기반의 느슨한 통계적 환산 등
// 5. 실제 게임 결과, 최근 퍼포먼스 등 동적 업데이트 기능도 좋음.

// 현실적인 예시
// type Tier = "Unranked" | "Iron" | "Bronze" | "Silver" | "Gold" | "Platinum" | "Emerald" | "Diamond" | "Master" | "Grandmaster";

// const tierToScore: Record<Tier, number> = {
//   Unranked: 0,
//   Iron: 2,
//   Bronze: 2,
//   Silver: 3,
//   Gold: 4,
//   Platinum: 6,
//   Emerald: 7,
//   Diamond: 8,
//   Master: 9,
//   Grandmaster: 10,
// };



export const playersData: Player[] = [
  { id: 1, name: "지둥이", top: 4, middle: 2, bottom: 1, supports: 1, jungle: 3, fighting: 3, diceHigh: 5, diceLow: 2, mental: 9, totalScore: 30, preferredPosition: ["top","jungle"] },
  { id: 2, name: "환둥이", top: 0, middle: 2, bottom: 2, supports: 2, jungle: 0, fighting: 1, diceHigh: 2, diceLow: 1, mental: 10, totalScore: 20, preferredPosition: ["supports"] },
  { id: 3, name: "진수", top: 8, middle: 8, bottom: 9, supports: 8, jungle: 7, fighting: 9, diceHigh: 10, diceLow: 7, mental: 5, totalScore: 71, preferredPosition: ["bottom", "top"] },
  { id: 4, name: "코봉이", top: 5, middle: 7.5, bottom: 7, supports: 6, jungle: 7.5, fighting: 7.5, diceHigh: 9, diceLow: 4, mental: 3, totalScore: 56.5, preferredPosition: ["middle", "jungle","bottom"] },
  { id: 5, name: "철수", top: 5, middle: 7, bottom: 8, supports: 7, jungle: 6, fighting: 7, diceHigh: 7, diceLow: 3, mental: 2, totalScore: 52, preferredPosition: ["bottom","middle","jungle"] },
  { id: 6, name: "찬둥이", top: 8.5, middle: 7.5, bottom: 6, supports: 6, jungle: 9, fighting: 10, diceHigh: 10, diceLow: 7, mental: 7, totalScore: 71, preferredPosition: ["jungle", "top"] },
  { id: 7, name: "붐야", top: 0, middle: 0, bottom: 0, supports: 5, jungle: 0, fighting: 4, diceHigh: 5, diceLow: 3, mental: 10, totalScore: 27, preferredPosition: ["supports"] },
  { id: 8, name: "소", top: 3, middle: 0, bottom: 3, supports: 3, jungle: 3, fighting: 5, diceHigh: 7, diceLow: 3, mental: 8, totalScore: 35, preferredPosition: ["top", "bottom", "jungle"] },
  { id: 9, name: "은지", top: 0, middle: 3, bottom: 0, supports: 4.5, jungle: 0, fighting: 4, diceHigh: 5, diceLow: 3, mental: 8, totalScore: 27.5, preferredPosition: ["supports"] },
  { id: 10, name: "광선", top: 9, middle: 8, bottom: 5.5, supports: 5, jungle: 8.5, fighting: 9, diceHigh: 10, diceLow: 6, mental: 7, totalScore: 68, preferredPosition: ["top", "jungle", "middle"] },
  { id: 11, name: "승훈", top: 4, middle: 4, bottom: 5, supports: 4, jungle: 3, fighting: 5, diceHigh: 7, diceLow: 2, mental: 10, totalScore: 44, preferredPosition: ["bottom","top","middle", "supports", "jungle"] },
  { id: 12, name: "재흔", top: 7, middle: 8, bottom: 6, supports: 6, jungle: 4, fighting: 8, diceHigh: 10, diceLow: 6, mental: 8, totalScore: 63, preferredPosition: ["middle","top","bottom"] },
  { id: 13, name: "재만", top: 3, middle: 2, bottom: 3, supports: 2, jungle: 3, fighting: 4, diceHigh: 5, diceLow: 2, mental: 8, totalScore: 32, preferredPosition: ["jungle", "top","middle","bottom"] },
  { id: 14, name: "민수", top: 4.5, middle: 4, bottom: 3, supports: 3, jungle: 4, fighting: 6, diceHigh: 7, diceLow: 3, mental: 10, totalScore: 44.5, preferredPosition: ["top", "jungle","middle"] },
  { id: 15, name: "민승", top: 6, middle: 5.5, bottom: 4, supports: 4, jungle: 4, fighting: 6, diceHigh: 7, diceLow: 3, mental: 3, totalScore: 42.5, preferredPosition: ["top","middle"] },
  { id: 16, name: "민우", top: 4.5, middle: 4.5, bottom: 3, supports: 2, jungle: 2, fighting: 5, diceHigh: 7, diceLow: 2, mental: 10, totalScore: 40, preferredPosition: ["middle", "top"] },
  { id: 17, name: "성환", top: 1, middle: 1, bottom: 0, supports: 7, jungle: 5, fighting: 7, diceHigh: 7, diceLow: 4, mental: 7, totalScore: 39, preferredPosition: ["supports", "jungle"] },
  { id: 18, name: "준현", top: 5, middle: 5, bottom: 5, supports: 5, jungle: 5, fighting: 5, diceHigh: 7, diceLow: 5, mental: 7, totalScore: 49, preferredPosition: ["top", "middle", "bottom", "jungle", "supports"] },
  { id: 19, name: "명준", top: 5, middle: 8, bottom: 7.5, supports: 5, jungle: 7.5, fighting: 8, diceHigh: 10, diceLow: 5, mental: 5, totalScore: 61, preferredPosition: ["middle", "jungle"] },
  { id: 20, name: "선욱", top: 4, middle: 4, bottom: 4, supports: 4, jungle: 4, fighting: 4, diceHigh: 4, diceLow: 4, mental: 10, totalScore: 42, preferredPosition: ["jungle", "middle"] },
  { id: 21, name: "태양", top: 3, middle: 3, bottom: 1, supports: 1, jungle: 0, fighting: 3, diceHigh: 5, diceLow: 2, mental: 8, totalScore: 26, preferredPosition: ["top", "middle"] },
  { id: 22, name: "상훈", top: 6, middle: 7, bottom: 8, supports: 8, jungle: 6, fighting: 8, diceHigh: 10, diceLow: 6, mental: 7, totalScore: 66, preferredPosition: ["supports", "bottom","middle"] },
  { id: 23, name: "소희", top: 0, middle: 3, bottom: 0, supports: 4, jungle: 0, fighting: 4, diceHigh: 5, diceLow: 3, mental: 8, totalScore: 27.5, preferredPosition: ["supports"] },
  { id: 24, name: "코마", top: 0, middle: 0, bottom: 4, supports: 4, jungle: 0, fighting: 4, diceHigh: 5, diceLow: 3, mental: 8, totalScore: 27.5, preferredPosition: ["supports"] },
  { id: 25, name: "언백", top: 9, middle: 10, bottom: 8, supports: 4.5, jungle: 9, fighting: 4, diceHigh: 5, diceLow: 3, mental: 8, totalScore: 27.5, preferredPosition: ["top", "middle","jungle","bottom"] },
  { id: 26, name: "J2", top: 0, middle: 8, bottom: 9, supports: 4.5, jungle: 7, fighting: 4, diceHigh: 5, diceLow: 3, mental: 8, totalScore: 27.5, preferredPosition: ["middle", "bottom","jungle"] },
  { id: 27, name: "석환", top: 8, middle: 9, bottom: 8, supports: 4.5, jungle: 8, fighting: 4, diceHigh: 5, diceLow: 3, mental: 8, totalScore: 27.5, preferredPosition: ["middle","top","bottom","jungle"] },
  { id: 28, name: "짜루", top:6, middle: 5, bottom: 5, supports: 5, jungle: 5, fighting: 4, diceHigh: 5, diceLow: 3, mental: 8, totalScore: 27.5, preferredPosition: ["middle","top","bottom","jungle","supports"] },
]

export type Position = 'top' | 'jungle' | 'middle' | 'bottom' | 'supports'
export type Team = Record<Position, Player | null>

