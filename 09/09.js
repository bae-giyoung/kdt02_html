/* 
 * [업다운 게임]
*/

// 실행시에 랜덤 수 생성 1 ~ 100
// 사용자 입력, 버튼 클릭 -> 입력값>값: down이미지, 입력값<값: up이미자, 입력값==값: goodjob이미지+다시하기버튼생성

// [단계]
// = 버튼1 클릭 (게임 화면)
// 1. flag가 false이면 랜덤수 n 생성하고 flag true로 변경
// 2. 정답을 맞추면 regameDiv가 보여지고 flag false로 변경, inputDiv가 숨김
// 2-1. 사용자 입력값 > n : down이미지
// 2-2. 사용자 입력값 < n : up이미지
// 2-3. 사용자 입력값 == n : good 이미지
// = 버튼2 클릭 (다시 처음 화면으로)
// 1. regameDiv 숨김, inputDiv 보임

// document.addEventListener('DOMContentLoaded', ()=>{
//     const img = document.querySelector('.resultImg');
//     const inp = document.querySelector('#txt1');
//     const cbtn = document.querySelector('#cfrm');
//     const rbtn = document.querySelector('#regame');
//     const iDiv = document.querySelector('.inputDiv');
//     const rDiv = document.querySelector('.regameDiv');

//     let num = 0;
//     let flag = false; // 플래그 변수

//     cbtn.addEventListener('click', ()=>{
//         let inum = inp.value;

//         // 값을 입력안하고 클릭했을 때
//         if (!inum) {
//             alert('숫자를 입력하세요.');
//             inp.focus();
//             return;
//         }

//         // flag가 false일 때만 랜덤 수 생성
//         if (!flag) {
//             num = Math.floor(Math.random() * 100) + 1;
//             flag = true;
//         }
//         console.log(num); // 디버깅용 나중에 지우자!
        
//         // 값 비교!
//         if (inum > num) {
//             img.setAttribute('src', '../img/down.png');
//         } else if (inum < num) {
//             img.setAttribute('src', '../img/up.png');
//         } else {
//             img.setAttribute('src', '../img/good.png');
//             iDiv.classList.add('hide');
//             rDiv.classList.remove('hide');
//         }
//     });
    
//     rbtn.addEventListener('click', ()=>{
//         flag = false;
//         img.setAttribute('src', '../img/what.png');
//         rDiv.classList.add('hide');
//         iDiv.classList.remove('hide');
//         inp.value = '';
//     });

// });


// 교수님 풀이++


// [다시 풀기]
document.addEventListener('DOMContentLoaded', ()=>{
    const img = document.querySelector('.resultImg');
    const txt1 = document.querySelector('#txt1');
    const cbtn = document.querySelector('#cfrm');
    const rbtn = document.querySelector('#regame');
    const div = document.querySelector('.inputDiv');
    const rdiv = document.querySelector('.regameDiv');

    let num = 0;
    let flag = false; // 초기 상태
    let count = 0; // 몇 번만에 맞췄는지 카운트

    // 버튼1에 이벤트 바인딩
    cbtn.addEventListener('click', ()=>{
        // 이 버튼의 클릭 이벤트
        // 1. flag가 false이면 랜덤 수 생성, false = true 재할당
        // 2. 값 비교 크면, 작으면, 같으면
        // 3. 정답을 맞췄을 때 기존 div 숨기고, regamediv 보이게 

        if (!txt1.value) {
            alert('숫자를 입력해주세요.');
            txt1.focus();
            return;
        }

        if (!flag) {
            flag = true;
            num = Math.floor(Math.random() * 100) + 1;
            console.log(num); // 디버깅용
        }

        if (txt1.value > num) {
            img.setAttribute('src', '../img/down.png');
            count++;
        } else if (txt1.value < num) {
            img.setAttribute('src', '../img/up.png');
            count++;
        } else {
            img.setAttribute('src', '../img/good.png');
            div.classList.add('hide');
            rdiv.classList.remove('hide');
            alert(`축하합니다! ${count}번 만에 맞추셨습니다.`);
        }

    })

    // 버튼2에 이벤트 바인딩
    // flag = false 재할당, 기존 div 보이게, regameDiv 안 보이게
    rbtn.addEventListener('click', ()=>{
        // 초기화
        flag = false; // 초기값으로 돌려줌
        count = 0; // 횟수 초기화
        txt1.value = undefined; // 인풋 초기화
        img.setAttribute('src', '../img/what.png'); // 이미지 초기화

        // 보이고 안보이고
        rdiv.classList.add('hide');
        div.classList.remove('hide');
    })
})