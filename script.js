// 롤내전 플레이어 데이터
// preferredPosition: 배열로 여러 선호 라인 지정 가능 (예: ["top", "middle"])
let playersData = [
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
    { id: 22, name: "상훈", top: 6, middle: 7, bottom: 8, supports: 8, jungle: 6, fighting: 8, diceHigh: 10, diceLow: 6, mental: 7, totalScore: 66, preferredPosition: ["supports", "bottom","middle"] }
];

let teamA = { top: null, jungle: null, middle: null, bottom: null, supports: null };
let teamB = { top: null, jungle: null, middle: null, bottom: null, supports: null };

// 참여자 선택 상태
let selectedParticipants = new Set();

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
    createParticipantButtons();
    initializeTeamBuilder();
    setupTeamEventListeners();
    setupParticipantEventListeners();
}

// 참여자 선택 버튼 생성
function createParticipantButtons() {
    const participantGrid = document.getElementById('participantGrid');
    participantGrid.innerHTML = '';
    
    playersData.forEach(player => {
        const button = document.createElement('button');
        button.className = 'participant-btn';
        button.textContent = player.name;
        button.dataset.playerId = player.id;
        button.addEventListener('click', () => toggleParticipant(player.id, button));
        participantGrid.appendChild(button);
    });
}

// 참여자 토글
function toggleParticipant(playerId, button) {
    if (selectedParticipants.has(playerId)) {
        selectedParticipants.delete(playerId);
        button.classList.remove('selected');
    } else {
        if (selectedParticipants.size >= 10) {
            alert('최대 10명까지만 선택할 수 있습니다.');
            return;
        }
        selectedParticipants.add(playerId);
        button.classList.add('selected');
    }
    
    updateSelectedCount();
    updateTeamSelectors();
}

// 선택된 인원 수 업데이트
function updateSelectedCount() {
    document.getElementById('selectedCount').textContent = selectedParticipants.size;
}

// 팀 셀렉터 업데이트 (선택된 참여자만 표시)
function updateTeamSelectors() {
    const positions = ['top', 'jungle', 'middle', 'bottom', 'supports'];
    
    // 팀 A와 팀 B의 모든 셀렉터 업데이트
    [teamASelectors, teamBSelectors].forEach(selectors => {
        Object.values(selectors).forEach(selector => {
            const currentValue = selector.value;
            
            // 기존 옵션들 제거 (첫 번째 "선택하세요" 옵션 제외)
            while (selector.children.length > 1) {
                selector.removeChild(selector.lastChild);
            }
            
            // 선택된 참여자만 옵션에 추가
            playersData.forEach(player => {
                if (selectedParticipants.has(player.id)) {
                    const option = document.createElement('option');
                    option.value = player.id;
                    option.textContent = player.name;
                    selector.appendChild(option);
                }
            });
            
            // 이전 선택값 복원 (가능한 경우)
            if (currentValue && selectedParticipants.has(parseInt(currentValue))) {
                selector.value = currentValue;
            } else {
                selector.value = '';
            }
        });
    });
}

// 참여자 선택 이벤트 리스너
function setupParticipantEventListeners() {
    document.getElementById('selectAllBtn').addEventListener('click', selectAllParticipants);
    document.getElementById('clearSelectionBtn').addEventListener('click', clearAllParticipants);
}

// 전체 선택
function selectAllParticipants() {
    selectedParticipants.clear();
    
    // 처음 10명 선택
    playersData.slice(0, 10).forEach(player => {
        selectedParticipants.add(player.id);
    });
    
    // 버튼 상태 업데이트
    document.querySelectorAll('.participant-btn').forEach((btn, index) => {
        if (index < 10) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    updateSelectedCount();
    updateTeamSelectors();
}

// 선택 초기화
function clearAllParticipants() {
    selectedParticipants.clear();
    
    document.querySelectorAll('.participant-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    updateSelectedCount();
    updateTeamSelectors();
    clearTeams();
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
    // 초기에는 빈 셀렉트 박스 (참여자 선택 후 채워짐)
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
    if (!playerId) {
        // 선택 해제
        if (team === 'A') {
            teamA[position] = null;
        } else {
            teamB[position] = null;
        }
        updatePlayerOptions('A');
        updatePlayerOptions('B');
        updateTeamStats();
        updateBalanceIndicator();
        return;
    }
    
    const player = playersData.find(p => p.id == playerId);
    
    if (team === 'A') {
        teamA[position] = player;
        // 다른 팀에서 같은 플레이어 제거
        removePlayerFromTeam('B', playerId);
        // 양쪽 팀의 옵션 업데이트
        updatePlayerOptions('A');
        updatePlayerOptions('B');
    } else {
        teamB[position] = player;
        // 다른 팀에서 같은 플레이어 제거
        removePlayerFromTeam('A', playerId);
        // 양쪽 팀의 옵션 업데이트
        updatePlayerOptions('A');
        updatePlayerOptions('B');
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
        
        // 참여자로 선택된 플레이어 중 사용 가능한 플레이어들만 추가
        playersData.forEach(player => {
            if (selectedParticipants.has(player.id) && !selectedPlayerIds.includes(player.id)) {
                const option = document.createElement('option');
                option.value = player.id;
                option.textContent = player.name;
                selector.appendChild(option);
            }
        });
        
        // 현재 선택된 값이 유효한지 확인하고 복원
        if (currentValue && selectedParticipants.has(parseInt(currentValue)) && !selectedPlayerIds.includes(parseInt(currentValue))) {
            selector.value = currentValue;
        } else {
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

// 자동 밸런싱 (선호 라인 기반, 랜덤 시도)
function autoBalanceTeams() {
    // 참여자가 10명인지 확인
    if (selectedParticipants.size !== 10) {
        alert('내전 참여자를 정확히 10명 선택해주세요! (현재: ' + selectedParticipants.size + '명)');
        return;
    }
    
    clearTeams();
    
    const targetDiff = parseFloat(document.getElementById('scoreDiffInput').value) || 2;
    const positions = ['top', 'jungle', 'middle', 'bottom', 'supports'];
    
    // 선택된 참여자만 필터링
    const availablePlayers = playersData.filter(p => selectedParticipants.has(p.id));
    
    let bestTeamA = null;
    let bestTeamB = null;
    let bestDiff = Infinity;
    let attempts = 0;
    const maxAttempts = 10000; // 최대 시도 횟수
    
    // 랜덤하게 팀을 구성하는 함수
    function tryRandomTeamComposition() {
        const usedPlayers = new Set();
        const tempTeamA = {};
        const tempTeamB = {};
        
        for (const position of positions) {
            // 해당 포지션을 선호하는 플레이어들 찾기 (선택된 참여자 중에서)
            const preferredPlayers = availablePlayers.filter(
                p => p.preferredPosition.includes(position) && !usedPlayers.has(p.id)
            );
            
            if (preferredPlayers.length < 2) {
                return null; // 충분한 플레이어가 없으면 실패
            }
            
            // 랜덤하게 2명 선택
            const shuffled = [...preferredPlayers].sort(() => Math.random() - 0.5);
            const playerA = shuffled[0];
            const playerB = shuffled[1];
            
            usedPlayers.add(playerA.id);
            usedPlayers.add(playerB.id);
            
            tempTeamA[position] = playerA;
            tempTeamB[position] = playerB;
        }
        
        return { teamA: tempTeamA, teamB: tempTeamB };
    }
    
    // 목표 점수 차이를 만족할 때까지 랜덤 시도
    while (attempts < maxAttempts) {
        const result = tryRandomTeamComposition();
        
        if (result) {
            const scoreA = calculateTeamScoreFromPositions(result.teamA);
            const scoreB = calculateTeamScoreFromPositions(result.teamB);
            const diff = Math.abs(scoreA - scoreB);
            
            // 더 좋은 조합을 찾았을 때
            if (diff < bestDiff) {
                bestDiff = diff;
                bestTeamA = result.teamA;
                bestTeamB = result.teamB;
                
                // 목표 점수 차이를 만족하면 즉시 종료
                if (diff <= targetDiff) {
                    console.log(`목표 달성! ${attempts + 1}번째 시도에서 ${diff.toFixed(1)}점 차이 발견`);
                    break;
                }
            }
        }
        
        attempts++;
    }
    
    // 최선의 조합 적용
    if (bestTeamA && bestTeamB) {
        // 먼저 팀 데이터 설정
        positions.forEach(position => {
            const playerA = bestTeamA[position];
            const playerB = bestTeamB[position];
            
            if (playerA && playerB) {
                teamA[position] = playerA;
                teamB[position] = playerB;
            }
        });
        
        // 양쪽 팀의 옵션 먼저 업데이트
        updatePlayerOptions('A');
        updatePlayerOptions('B');
        
        // 그 다음 셀렉터 값 설정
        positions.forEach(position => {
            const playerA = bestTeamA[position];
            const playerB = bestTeamB[position];
            
            if (playerA && playerB) {
                teamASelectors[position].value = playerA.id;
                teamBSelectors[position].value = playerB.id;
            }
        });
        
        console.log(`총 ${attempts}번 시도, 최종 점수 차이: ${bestDiff.toFixed(1)}점`);
    } else {
        alert('밸런싱에 실패했습니다. 선호 라인을 조정해주세요.');
    }
    
    updateTeamStats();
    updateBalanceIndicator();
}

// 포지션별 점수 계산 헬퍼 함수
function calculateTeamScoreFromPositions(team) {
    let totalScore = 0;
    Object.entries(team).forEach(([position, player]) => {
        if (player) {
            totalScore += player[position];
        }
    });
    return totalScore;
}

// 랜덤 팀 구성
function randomizeTeams() {
    clearTeams();
    
    // 선택된 참여자만 사용
    const availablePlayers = playersData.filter(p => selectedParticipants.has(p.id));
    
    if (availablePlayers.length < 10) {
        alert('내전 참여자를 10명 선택해주세요!');
        return;
    }
    
    // 플레이어를 랜덤하게 섞기
    const shuffledPlayers = [...availablePlayers].sort(() => Math.random() - 0.5);
    const positions = ['top', 'jungle', 'middle', 'bottom', 'supports'];
    
    // 먼저 팀 데이터 설정
    for (let i = 0; i < positions.length; i++) {
        const position = positions[i];
        const playerA = shuffledPlayers[i * 2];
        const playerB = shuffledPlayers[i * 2 + 1];
        
        if (playerA) {
            teamA[position] = playerA;
        }
        
        if (playerB) {
            teamB[position] = playerB;
        }
    }
    
    // 양쪽 팀의 옵션 먼저 업데이트
    updatePlayerOptions('A');
    updatePlayerOptions('B');
    
    // 그 다음 셀렉터 값 설정
    for (let i = 0; i < positions.length; i++) {
        const position = positions[i];
        const playerA = shuffledPlayers[i * 2];
        const playerB = shuffledPlayers[i * 2 + 1];
        
        if (playerA) {
            teamASelectors[position].value = playerA.id;
        }
        
        if (playerB) {
            teamBSelectors[position].value = playerB.id;
        }
    }
    
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
