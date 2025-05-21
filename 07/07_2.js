document.addEventListener('DOMContentLoaded', ()=>{
    const cimg = document.querySelector('.comp > img'); // Node 반환, All은 NodeList 반환
    const uimg = document.querySelector('.user > img'); // Node 반환, All은 NodeList 반환
    const bt = document.querySelectorAll('.mdiv > button');
    const result = document.querySelector('.mdiv.result');

    // [방법1] : 각각의 버튼에 이벤트 바인딩
    // bt.forEach(item => {
    //     item.addEventListener('click', (e)=>{
    //         e.preventDefault(); // form 안에 버튼이 있고, form에 action이 없으면 자기 자신으로 되돌아오는 데, 그것을 방지
    //         // 1. 1 ~ 6 까지 랜덤 수 생성
    //         let n = Math.floor(Math.random() * 6) + 1;

    //         // 2. 버튼의 값 받기
    //         let btNum = item.getAttribute('data-num');
            
    //         // 3. 랜덤수에 해당하는 이미지 변경
    //         cimg.setAttribute('src', `../img/${n}.png`);
    //         cimg.setAttribute('alt', `컴퓨터 ${n}번 주사위`);

    //         uimg.setAttribute('src', `../img/${btNum}.png`);
    //         uimg.setAttribute('alt', `사용자 ${btNum}번 주사위`);

    //         // 4. 값 비교 후 결과 출력
    //         const rst = n == btNum ? '같음' : '다름';
    //         result.innerText = rst;

    //     })
    // });

    // [방법2] : 부모요소에 이벤트 바인딩
    // const btWr = document.querySelector('.mdiv.is2');
    // btWr.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     const t = e.target;
    //     // 1. 1 ~ 6 까지 랜덤 수 생성
    //     let n = Math.floor(Math.random() * 6) + 1;

    //     // 2. 버튼의 값 받기
    //     let btNum = t.getAttribute('data-num');
    //     //console.log(t, n, btNum);

    //     // 3. 랜덤수에 해당하는 이미지 변경
    //     cimg.setAttribute('src', `../img/${n}.png`);
    //     cimg.setAttribute('alt', `컴퓨터 ${n}번 주사위`);

    //     uimg.setAttribute('src', `../img/${btNum}.png`);
    //     uimg.setAttribute('alt', `사용자 ${btNum}번 주사위`);

    //     // 4. 값 비교 후 결과 출력
    //     const rst = n == btNum ? '같음' : '다름';
    //     result.innerText = rst;
    // });

    // [방법3] : 교수님 풀이++
    const imgs = document.querySelectorAll(".mdiv img");
    const btns = document.querySelectorAll(".mdiv button");

    for(let [idx, btn] of btns.entries()) {
        btn.addEventListener('click', (e)=>{
            e.preventDefault();
            // 1. 랜덤 수 생성 후 컴퓨터 주사위 변경
            const n = Math.floor(Math.random() * 6) + 1;
            imgs[0].setAttribute('src', `../img/${n}.png`);
            imgs[0].setAttribute('alt', `컴퓨터 ${n}번 주사위`);
            
            // 2. 사용자 입력 번호 받고 사용자 주사위 변경
            const usern = idx + 1;
            imgs[1].setAttribute('src', `../img/${usern}.png`);
            imgs[1].setAttribute('alt', `사용자 ${usern} 주사위`);

            // 3. 값 비교 후 결과 출력
            const rst = n == usern ? '같음' : '다름';
            result.innerHTML = rst;
        });
    }
});