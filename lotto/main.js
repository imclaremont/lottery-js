// 50% 당첨 확률의 추첨 함수 (async/await 사용)
async function drawLottery() {
    // 50% 확률을 비동기로 처리
    const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            const isWin = Math.random() < 0.5; // 50% 확률
            if (isWin) {
                resolve('당첨 되었습니다.');
            } else {
                reject('꽝! 다음 기회에...');
            }
        }, 1000); // 1초 후 결과 발표
    });

    return result;
}

// DOM 요소 가져오기
const drawButton = document.getElementById('drawButton');
const messageBox = document.getElementById('message');
const resultBox = document.getElementById('result');

// 추첨 결과를 처리하는 함수 (async/await 사용)
async function handleDraw() {
    // 버튼 비활성화 (추첨 대기 중 클릭 방지)
    drawButton.disabled = true;
    drawButton.textContent = '추첨 중...';
    drawButton.classList.add('disabled'); // Bootstrap 스타일 적용

    // 메시지 초기화
    messageBox.textContent = '1초 후에 당첨 결과가 발표됩니다.';
    resultBox.textContent = '';

    try {
        // 추첨 결과 대기 (await 사용)
        const successMessage = await drawLottery();
        resultBox.textContent = successMessage;
        resultBox.classList.add('success'); // 파란색 출력
        resultBox.classList.remove('fail');
    } catch (errorMessage) {
        resultBox.textContent = errorMessage;
        resultBox.classList.add('fail');    // 빨간색 출력
        resultBox.classList.remove('success');
    }

    // 버튼 다시 활성화
    drawButton.disabled = false;
    drawButton.textContent = '추첨';
    drawButton.classList.remove('disabled');
}

// 추첨 버튼 클릭 이벤트
drawButton.addEventListener('click', handleDraw);
