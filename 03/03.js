
// 함수 선언
function hello() {
    alert("안녕하세요. 자바스크립트입니다.");
}

// rvalue: 함수 표현식
const hello12 = function(){ // 익명함수
    console.log("this: " + this);
}

// rvalue: 표현식 + 화살표 함수
const hello13 = () => {
    var name;
    console.log(name + "님 안녕하세요");
    name = "PNU";
    console.log(name + "님 안녕하세요");
    console.log("this: " + this);
}

const hello2 = () => {
    //console.log(name + "님 안녕하세요"); // 여기서 referrence error
    let name = "PNU";
    console.log(`${name}님 안녕하세요`);
    console.log("this: " + this);
}

const check = () => {
    let s = '123';
    // s = '123ff';
    let x = '10';
    console.log(s);
    console.log(typeof s);
    console.log(typeof(s));
    console.log(isNaN(s)); // 숫자, 숫자로만 구성된 문자열 모두 false임 not a number가 아니라는 뜻.

    if (!isNaN(s) && !isNaN(x)) {
        s = parseInt(s);
        x = parseInt(x);
    }
    console.log(s + x);
}

const checkFor = () => {
    let s = "토마토,바나나";
    
    console.log(s[0]);
    console.log(s.charAt(0));

    console.log(s.split(',')); // 문자열을 구분 인자로 구분해서 새로운 배열을 반환
    console.log(s.indexOf(',')); // 문자열에서 몇번째 위치인지 인덱스 반환. 제일 첫번째만?
    console.log(s.includes(',')); // boolean 반환

    console.log("for문")
    for (let i = 0; i < s.length; i++) {
        console.log(s[i]);
    }

    console.log("for...of문");
    for (let c of s) {
        console.log(c);
    }
}