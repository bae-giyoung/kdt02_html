// 배열의 선언
const arr1 = [];
const arr2 = [1,2,3];
const arr3 = Array(); // 빈 배열
const arr33 = new Array(); // 빈 배열
let arr4 = Array(1,2,3);

console.log(arr1);
console.log(arr2);
console.log(arr3);
console.log(arr4);

// 배열 지우기
arr4.length = 0; // 굳이?
console.log(arr4);
arr4 = [];
console.log(arr4);

// 랜덤 수 만들기
// Math.random(); => 0 < num < 1 사이의 난수
let n = Math.floor(Math.random() * 5 + 1) // 1 ~ 5 (+1해서 버림한 결과)
arr3.push(n);
console.log(arr1, n);

// 배열의 순회
for(let i in arr2) {
    // for in의 i는 인덱스
    console.log(arr2[i]);
}

for(let c of arr2) {
    // for of 의 c는 요소
    console.log(c);
}

for(let item of arr2.entries()) {
    // entries()는 키와 값의 쌍을 => 다시 보기
    console.log(item);
}

for(let [index, value] of arr2.entries()) {
    // entries()는 키와 값의 쌍을
    console.log(`인덱스: ${index}, 값: ${value}`);
}

// forEach(function(v, i){})
arr2.forEach((v, i) => {
    console.log(`인덱스: ${i}, 값: ${v}`);
});

// map() 새로운 배열 반환 .map(function(value, index, array){})
//const arr5 = arr2.map((item) => {return item*2});  // return만 있을 때는 return과 중괄호 생략 가능
const arr5 = arr2.map(value => value*2);
console.log("기존 arr2: " + arr2);
console.log(`[map] arr5: ${arr5}`);

// map() 사용하지 않고 구현해보기
const arr51 = [];
for (let n of arr2) {
    arr51.push(n * 2);
}
console.log(`[map] arr51: ${arr51}`);

// filter() 새로운 배열 반환 .filter(function(value, index, array){})
//const arr6 = arr2.filter((item) => {return item%2 == 0}); // 조건에 맞는 것만 반환해서 새로운 배열을 만듬
const arr6 = arr2.filter(item => item%2 == 0);
console.log("기존 arr2: " + arr2);
console.log(`[filter] arr6: ${arr6}`);

// filter() 사용하지 않고 구현해보기
const arr61 = [];
for(let n of arr2) {
    if (n%2 == 0)
        arr61.push(n);
}
console.log(`[filter] arr61: ${arr61}`);

// 전개연산자 => 다시 보기
const arr7 = [...arr5, ...arr6]; // 풀어서 배열로 만듬
console.log(arr7);

// 구조 분해 => 다시 보기



///////////////////////////// 로또 생성 //////////////////////////////////
// 1~45
// 번호의 색 다르게
// %10 = 0 ~ 4
// 7개
// 중복되는 숫자는 안됨
const getColor = (num) => {
    console.log("입력" + num);
    const n  = Math.floor(num/10); console.log("출력" + n);
    if (n == 0)
        return "sp0";
    else if (n == 1)
        return "sp1";
    else if (n == 2)
        return "sp2";
    else if (n == 3)
        return "sp3";
    else
        return "sp4";
}

const makeLotto = () => {
    const nlist = document.getElementById("nlist");
    nlist.innerHTML = "";

    let lottoArr = [];
    let colorArr = [];
    while (lottoArr.length < 6) {
        let num = Math.floor(Math.random()*45) + 1;
        
        // 랜덤 수가 이미 있는 경우
        if (lottoArr.includes(num)) continue; // 다시 돌아가서 반복문 시작
        
        // 랜덤 수가 없으면 배열에 추가
        lottoArr.push(num);
        colorArr.push(getColor(num)); console.log("컬러 받기:" + getColor(num));
    }

    // 배열 정렬: 보너스 넘버 더하기 전에 정렬하기!
    console.log(lottoArr);
    lottoArr.sort((a,b) => a - b);
    console.log(lottoArr);

    // 보너스 번호
    let bonusArr = [];
    let bonusColor = [];

    while (bonusArr.length < 1) {
        let num = Math.floor(Math.random()*45) + 1;
        
        // 랜덤 수가 이미 있는 경우
        if (lottoArr.includes(num)) continue; // 다시 돌아가서 반복문 시작
        
        // 랜덤 수가 없으면 배열에 추가
        bonusArr.push(num);
        bonusColor.push(getColor(num));
    }

    // 전체 배열
    lottoArr = [...lottoArr, ...bonusArr];
    colorArr = [...colorArr, ...bonusColor];

    // 태그 배열 : 배열의 개수만큼 만들때는 거의 map을 사용하면 된다!
    let tags = lottoArr.map( item => `<span class="sp${Math.floor(item/10)}">${item}</span>`);

    tags.splice(6, 0, `<span id="spPlus">+</span>`); // 스플랴이스는 기존 배열 자체를 수정

    let inHtml = tags.join("");
    console.log(inHtml);

    nlist.innerHTML = inHtml;

}