// 롤내전 플레이어 데이터
let playersData = [
    { id: 1, name: "지둥이", top: 4, middle: 2, bottom: 1, supports: 1, jungle: 3, fighting: 3, diceHigh: 5, diceLow: 2, mental: 9, totalScore: 30 },
    { id: 2, name: "환둥이", top: 0, middle: 2, bottom: 2, supports: 2, jungle: 0, fighting: 1, diceHigh: 2, diceLow: 1, mental: 10, totalScore: 20 },
    { id: 3, name: "진수", top: 8, middle: 8, bottom: 9, supports: 8, jungle: 7, fighting: 9, diceHigh: 10, diceLow: 7, mental: 5, totalScore: 71 },
    { id: 4, name: "코봉이", top: 5, middle: 7.5, bottom: 7, supports: 6, jungle: 7.5, fighting: 7.5, diceHigh: 9, diceLow: 4, mental: 3, totalScore: 56.5 },
    { id: 5, name: "철수", top: 5, middle: 7, bottom: 8, supports: 7, jungle: 6, fighting: 7, diceHigh: 7, diceLow: 3, mental: 2, totalScore: 52 },
    { id: 6, name: "찬둥이", top: 8.5, middle: 7.5, bottom: 6, supports: 6, jungle: 9, fighting: 10, diceHigh: 10, diceLow: 7, mental: 7, totalScore: 71 },
    { id: 7, name: "붐야", top: 0, middle: 0, bottom: 0, supports: 5, jungle: 0, fighting: 4, diceHigh: 5, diceLow: 3, mental: 10, totalScore: 27 },
    { id: 8, name: "소", top: 3, middle: 0, bottom: 3, supports: 3, jungle: 3, fighting: 5, diceHigh: 7, diceLow: 3, mental: 8, totalScore: 35 },
    { id: 9, name: "은지", top: 0, middle: 3, bottom: 0, supports: 4.5, jungle: 0, fighting: 4, diceHigh: 5, diceLow: 3, mental: 8, totalScore: 27.5 },
    { id: 10, name: "광선", top: 9, middle: 8, bottom: 5.5, supports: 5, jungle: 8.5, fighting: 9, diceHigh: 10, diceLow: 6, mental: 7, totalScore: 68 },
    { id: 11, name: "승훈", top: 4, middle: 4, bottom: 5, supports: 4, jungle: 3, fighting: 5, diceHigh: 7, diceLow: 2, mental: 10, totalScore: 44 },
    { id: 12, name: "재흔", top: 7, middle: 8, bottom: 6, supports: 6, jungle: 4, fighting: 8, diceHigh: 10, diceLow: 6, mental: 8, totalScore: 63 },
    { id: 13, name: "재만", top: 3, middle: 2, bottom: 3, supports: 2, jungle: 3, fighting: 4, diceHigh: 5, diceLow: 2, mental: 8, totalScore: 32 },
    { id: 14, name: "민수", top: 4.5, middle: 4, bottom: 3, supports: 3, jungle: 4, fighting: 6, diceHigh: 7, diceLow: 3, mental: 10, totalScore: 44.5 },
    { id: 15, name: "민승", top: 6, middle: 5.5, bottom: 4, supports: 4, jungle: 4, fighting: 6, diceHigh: 7, diceLow: 3, mental: 3, totalScore: 42.5 },
    { id: 16, name: "민우", top: 4.5, middle: 4.5, bottom: 3, supports: 2, jungle: 2, fighting: 5, diceHigh: 7, diceLow: 2, mental: 10, totalScore: 40 },
    { id: 17, name: "성환", top: 1, middle: 1, bottom: 0, supports: 7, jungle: 5, fighting: 7, diceHigh: 7, diceLow: 4, mental: 7, totalScore: 39 },
    { id: 18, name: "준현", top: 5, middle: 5, bottom: 5, supports: 5, jungle: 5, fighting: 5, diceHigh: 7, diceLow: 5, mental: 7, totalScore: 49 },
    { id: 19, name: "명준", top: 5, middle: 8, bottom: 7.5, supports: 5, jungle: 7.5, fighting: 8, diceHigh: 10, diceLow: 5, mental: 5, totalScore: 61 },
    { id: 20, name: "선욱", top: 4, middle: 4, bottom: 4, supports: 4, jungle: 4, fighting: 4, diceHigh: 4, diceLow: 4, mental: 10, totalScore: 42 },
    { id: 21, name: "태양", top: 3, middle: 3, bottom: 1, supports: 1, jungle: 0, fighting: 3, diceHigh: 5, diceLow: 2, mental: 8, totalScore: 26 },
    { id: 22, name: "상훈", top: 6, middle: 7, bottom: 8, supports: 8, jungle: 6, fighting: 8, diceHigh: 10, diceLow: 6, mental: 7, totalScore: 66 }
];

let teamA = { top: null, jungle: null, middle: null, bottom: null, supports: null };
let teamB = { top: null, jungle: null, middle: null, bottom: null, supports: null };

// DOM 요소들
const rankingsDiv = document.getElementById('rankings');

// 팀 구성 관련 DOM 요소들
const teamASelectors = {
    top: document.getElementById('teamA-top'),
    jungle: document.getElementById('teamA-jungle'),
    middle: document.getElementById('teamA-middle'),
    bottom: document.getElementById('teamA-bottom'),
    supports: document.getElementById('teamA-supports')
};

const teamBSelectors = {
    top: document.getElementById('teamB-top'),
    jungle: document.getElementById('teamB-jungle'),
    middle: document.getElementById('teamB-middle'),
    bottom: document.getElementById('teamB-bottom'),
    supports: document.getElementById('teamB-supports')
};

const teamAStats = document.getElementById('teamA-stats');
const teamBStats = document.getElementById('teamB-stats');
const balanceIndicator = document.getElementById('balanceIndicator');
const balanceFill = document.getElementById('balanceFill');
const balanceText = document.getElementById('balanceText');

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateLeaderboard();
    initializeTeamBuilder();
    setupTeamEventListeners();
}


// 순위표 업데이트
function updateLeaderboard() {
    // 점수 순으로 정렬
    const sortedPlayers = [...playersData].sort((a, b) => b.totalScore - a.totalScore);
    
    rankingsDiv.innerHTML = '';
    
    sortedPlayers.forEach((player, index) => {
        const rankingItem = document.createElement('div');
        rankingItem.className = 'ranking-item';
        
        // 상위 3명에게 특별한 스타일 적용
        if (index < 3) {
            rankingItem.classList.add('top3');
        }
        
        const rank = index + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
        
        rankingItem.innerHTML = `
            <div class="rank">${medal} ${rank}위</div>
            <div class="player-name">${player.name}</div>
            <div class="total-score">${player.totalScore.toLocaleString()}점</div>
        `;
        
        rankingsDiv.appendChild(rankingItem);
    });
}

// CSV 파일 로드 함수 (향후 CSV 파일을 업로드할 때 사용)
function loadCSVData(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    playersData = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(',');
            const player = {};
            
            headers.forEach((header, index) => {
                const key = header.trim().toLowerCase();
                const value = values[index] ? values[index].trim() : '';
                
                // 숫자 데이터는 숫자로 변환
                if (['wins', 'losses', 'kills', 'deaths', 'assists', 'totalscore'].includes(key)) {
                    player[key === 'totalscore' ? 'totalScore' : key] = parseInt(value) || 0;
                } else {
                    player[key === 'name' ? 'name' : key] = value;
                }
            });
            
            playersData.push(player);
        }
    }
    
    // 데이터 로드 후 UI 업데이트
    initializeApp();
}

// 파일 업로드 기능 (선택사항)
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
        const reader = new FileReader();
        reader.onload = function(e) {
            loadCSVData(e.target.result);
        };
        reader.readAsText(file);
    } else {
        alert('CSV 파일을 선택해주세요.');
    }
}


// 반응형 디자인을 위한 화면 크기 조정
window.addEventListener('resize', function() {
    // 필요시 반응형 조정 로직 추가
});

// 팀 구성 초기화
function initializeTeamBuilder() {
    // 각 셀렉트 박스에 플레이어 옵션 추가
    Object.values(teamASelectors).forEach(selector => {
        populatePlayerSelect(selector);
    });
    
    Object.values(teamBSelectors).forEach(selector => {
        populatePlayerSelect(selector);
    });
}

// 플레이어 셀렉트 박스에 옵션 추가
function populatePlayerSelect(selectElement) {
    playersData.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = player.name;
        selectElement.appendChild(option);
    });
}

// 팀 이벤트 리스너 설정
function setupTeamEventListeners() {
    // 팀 A 셀렉터 이벤트
    Object.keys(teamASelectors).forEach(position => {
        teamASelectors[position].addEventListener('change', function() {
            handleTeamSelection('A', position, this.value);
        });
    });
    
    // 팀 B 셀렉터 이벤트
    Object.keys(teamBSelectors).forEach(position => {
        teamBSelectors[position].addEventListener('change', function() {
            handleTeamSelection('B', position, this.value);
        });
    });
    
    // 액션 버튼 이벤트
    document.getElementById('autoBalanceBtn').addEventListener('click', autoBalanceTeams);
    document.getElementById('randomTeamBtn').addEventListener('click', randomizeTeams);
    document.getElementById('clearTeamsBtn').addEventListener('click', clearTeams);
}

// 팀 선택 처리
function handleTeamSelection(team, position, playerId) {
    const player = playersData.find(p => p.id == playerId);
    
    if (team === 'A') {
        teamA[position] = player;
        // 다른 팀에서 같은 플레이어 제거
        removePlayerFromTeam('B', playerId);
        // 다른 팀의 옵션 업데이트
        updatePlayerOptions('B');
    } else {
        teamB[position] = player;
        // 다른 팀에서 같은 플레이어 제거
        removePlayerFromTeam('A', playerId);
        // 다른 팀의 옵션 업데이트
        updatePlayerOptions('A');
    }
    
    updateTeamStats();
    updateBalanceIndicator();
}

// 다른 팀에서 플레이어 제거
function removePlayerFromTeam(team, playerId) {
    const selectors = team === 'A' ? teamASelectors : teamBSelectors;
    const teamData = team === 'A' ? teamA : teamB;
    
    Object.keys(selectors).forEach(position => {
        if (selectors[position].value == playerId) {
            selectors[position].value = '';
            teamData[position] = null;
        }
    });
}

// 플레이어 옵션 업데이트 (선택된 플레이어 제외)
function updatePlayerOptions(targetTeam) {
    const selectors = targetTeam === 'A' ? teamASelectors : teamBSelectors;
    const otherTeam = targetTeam === 'A' ? teamB : teamA;
    
    // 다른 팀에 선택된 플레이어들의 ID 수집
    const selectedPlayerIds = Object.values(otherTeam)
        .filter(player => player !== null)
        .map(player => player.id);
    
    // 각 셀렉트 박스 업데이트
    Object.values(selectors).forEach(selector => {
        const currentValue = selector.value;
        
        // 기존 옵션들 제거 (첫 번째 "선택하세요" 옵션 제외)
        while (selector.children.length > 1) {
            selector.removeChild(selector.lastChild);
        }
        
        // 사용 가능한 플레이어들만 추가
        playersData.forEach(player => {
            if (!selectedPlayerIds.includes(player.id)) {
                const option = document.createElement('option');
                option.value = player.id;
                option.textContent = player.name;
                selector.appendChild(option);
            }
        });
        
        // 현재 선택된 값이 유효한지 확인하고 복원
        if (currentValue && !selectedPlayerIds.includes(parseInt(currentValue))) {
            selector.value = currentValue;
        } else if (selectedPlayerIds.includes(parseInt(currentValue))) {
            selector.value = '';
        }
    });
}

// 팀 통계 업데이트
function updateTeamStats() {
    const teamAScore = calculateTeamScore(teamA);
    const teamBScore = calculateTeamScore(teamB);
    
    document.getElementById('teamA-total').textContent = teamAScore;
    document.getElementById('teamB-total').textContent = teamBScore;
}

// 팀 점수 계산 (포지션별 점수 합계)
function calculateTeamScore(team) {
    let totalScore = 0;
    let playerCount = 0;
    
    Object.entries(team).forEach(([position, player]) => {
        if (player) {
            // 각 포지션별 점수를 더함
            totalScore += player[position];
            playerCount++;
        }
    });
    
    return playerCount > 0 ? Math.round(totalScore * 10) / 10 : 0; // 소수점 1자리까지
}

// 밸런스 지표 업데이트
function updateBalanceIndicator() {
    const teamAScore = calculateTeamScore(teamA);
    const teamBScore = calculateTeamScore(teamB);
    
    if (teamAScore === 0 && teamBScore === 0) {
        balanceText.textContent = '선택 필요';
        balanceFill.style.width = '0%';
        balanceFill.classList.remove('unbalanced');
        return;
    }
    
    const totalScore = teamAScore + teamBScore;
    const balanceRatio = teamAScore / totalScore;
    const balancePercentage = Math.round(balanceRatio * 100);
    
    balanceFill.style.width = `${balancePercentage}%`;
    
    const scoreDiff = Math.abs(teamAScore - teamBScore);
    const isBalanced = scoreDiff <= (totalScore * 0.1); // 10% 이내 차이면 밸런스
    
    if (isBalanced) {
        balanceText.textContent = `밸런스 (${scoreDiff}점 차이)`;
        balanceFill.classList.remove('unbalanced');
    } else {
        balanceText.textContent = `불균형 (${scoreDiff}점 차이)`;
        balanceFill.classList.add('unbalanced');
    }
}

// 자동 밸런싱
function autoBalanceTeams() {
    clearTeams();
    
    // 플레이어를 총점 순으로 정렬
    const sortedPlayers = [...playersData].sort((a, b) => b.totalScore - a.totalScore);
    
    // 팀 A와 팀 B에 번갈아가며 배정
    const positions = ['top', 'jungle', 'middle', 'bottom', 'supports'];
    
    for (let i = 0; i < positions.length; i++) {
        const position = positions[i];
        const playerA = sortedPlayers[i * 2];
        const playerB = sortedPlayers[i * 2 + 1];
        
        if (playerA) {
            teamASelectors[position].value = playerA.id;
            teamA[position] = playerA;
        }
        
        if (playerB) {
            teamBSelectors[position].value = playerB.id;
            teamB[position] = playerB;
        }
    }
    
    // 양쪽 팀의 옵션 업데이트
    updatePlayerOptions('A');
    updatePlayerOptions('B');
    
    updateTeamStats();
    updateBalanceIndicator();
}

// 랜덤 팀 구성
function randomizeTeams() {
    clearTeams();
    
    // 플레이어를 랜덤하게 섞기
    const shuffledPlayers = [...playersData].sort(() => Math.random() - 0.5);
    const positions = ['top', 'jungle', 'middle', 'bottom', 'supports'];
    
    for (let i = 0; i < positions.length; i++) {
        const position = positions[i];
        const playerA = shuffledPlayers[i * 2];
        const playerB = shuffledPlayers[i * 2 + 1];
        
        if (playerA) {
            teamASelectors[position].value = playerA.id;
            teamA[position] = playerA;
        }
        
        if (playerB) {
            teamBSelectors[position].value = playerB.id;
            teamB[position] = playerB;
        }
    }
    
    // 양쪽 팀의 옵션 업데이트
    updatePlayerOptions('A');
    updatePlayerOptions('B');
    
    updateTeamStats();
    updateBalanceIndicator();
}

// 팀 초기화
function clearTeams() {
    // 팀 A 초기화
    Object.keys(teamASelectors).forEach(position => {
        teamASelectors[position].value = '';
        teamA[position] = null;
    });
    
    // 팀 B 초기화
    Object.keys(teamBSelectors).forEach(position => {
        teamBSelectors[position].value = '';
        teamB[position] = null;
    });
    
    // 모든 플레이어 옵션 재설정
    initializeTeamBuilder();
    
    updateTeamStats();
    updateBalanceIndicator();
}
