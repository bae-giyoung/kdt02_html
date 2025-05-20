const check1 = () => {
    let txt1 = document.getElementById("txt1").value;
    const txt2 = document.getElementById("txt2");

    // 공백 제거
    txt1 = txt1.replaceAll(" ", "");

    // 공백문자라면
    if (txt1 == "") txt2.value = "입력하세요.";

    // 방법1
    /* let str = "";
    for(let i = txt1.length - 1; i >= 0; i--) {
        str += txt1[i];
    }

    if (txt1 == str) txt2.value = "회문입니다.";
    else txt2.value = "회문이 아닙니다.";

    */

    // 방법2 : split 사용
    // split 새로운 배열 반환
    const rvsTxt1 = txt1.split('').reverse();console.log(txt1.split('').reverse());
    if (rvsTxt1.join('') == txt1) txt2.value = "회문입니다.";
    else  txt2.value = "회문이 아닙니다.";
    
}

const check2 = () => {
    // 각각의 숫자 합계
    const txt1 = document.getElementById("txt1").value;
    const txt2 = document.getElementById("txt2");

    // 방법1 for로 풀기
    let sum = 0;
    for(let c of txt1) {
        if(!isNaN(c)) sum += parseInt(c);
    }
    txt2.value = sum;

    // 2: 연결된 숫자만 숫자로 인식해서 더하기
    // input: pnu20n25
    // output: 45 (20 + 25)
    let hap = 0;
    for (let c of txt1) {
        
    }

}

// reset 버튼 대신
const check3 = () => {
    const txt1 = document.getElementById("txt1");
    const txt2 = document.getElementById("txt2");

    txt1.value = "";
    txt2.value = "";
}