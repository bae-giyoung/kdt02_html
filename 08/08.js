document.addEventListener('DOMContentLoaded', ()=>{
    const sel1 = document.getElementById('sel1');
    const sel2 = document.getElementById('sel2');
    const lb1 = document.querySelector('[for="txt1"]');
    const lb2 = document.querySelector('[for="txt2"]');
    const ip1 = document.getElementById('txt1');
    const ip2 = document.getElementById('txt2');

    // 셀렉트 값이 변경이 되면 호출하는 핸들러 함수(콜백 함수)
    const selHandler = (s1, s2, l1, l2, t1, t2)=>{
        // s1의 값 변경
        if (s1.value == '℃') s2.value = '℉';
        else s2.value = '℃';
        
        // label의 값 초기화
        l1.innerHTML = s1.value;
        l2.innerHTML = s2.value;

        // input 값 초기화
        t1.value = '';
        t2.value = '';
        t1.focus();
    }

    // select에 이벤트 바인딩
    sel1.addEventListener('change', () => selHandler(sel1, sel2, lb1, lb2, ip1, ip2));
    sel2.addEventListener('change', () => selHandler(sel2, sel1, lb1, lb2, ip1, ip2));

    // input 요소에 값이 입력될 때, 단위 환산
    ip1.addEventListener('input', () => {
        let val = ip1.value;
        if (sel1.value == '℃') ip2.value = parseFloat((val * (9 / 5)) + 32).toFixed(4);
        else ip2.value = parseFloat((val - 32) * (5 / 9)).toFixed(4);
    });

})