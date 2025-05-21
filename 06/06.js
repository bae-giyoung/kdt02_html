// 오브젝트 생성
let obj1 = [];
let obj2 = new Object();

// 오브젝트 초기화
obj1 = {'a':1, 'b':2, 'c':3}

console.log(`a = ${obj1['a']}`); // 반드시 문자열 데이터로 접근 ['a']가 아닌 [a]는 변수 a로 접근하는것, 키값으로 인식하게 하려면 '문자열'데이터로 접근
console.log(`a = ${obj1.a}`); // .연산자로 접근할 때는 이렇게!

// 수정
obj1['a'] = 10;
console.log(obj1);

// 동적으로 추가
obj1['d'] = 30;
console.log(obj1);

// 삭제
delete obj1['c'];
console.log(obj1);

// 데이터 순회
console.log("오브젝트 키 목록: ", Object.keys(obj1)); // Array
console.log("오브젝트 값 목록: ", Object.values(obj1)); // Array
console.log("오브젝트 값 목록: ", Object.entries(obj1)); // Array, Object.entries(객체) [키, 값]의 배열요소로 이루어진 배열을 반환

for (let k of Object.keys(obj1)){ // 배열을 개수만큼 순회할때는 for of 사용!
    console.log(k);
}

for (let v of Object.values(obj1)){
    console.log(v);
}

for (let item of Object.entries(obj1)){
    console.log(item);
}

for (let [k, v] of Object.entries(obj1)){ // 위 구문을 이렇게 구조분해 해서 사용할 수 있다!
    console.log(`키: ${k}, 값: ${v}`);
}

// 오브젝트 복사
obj2 = {'apple': '🍎', 'banana': '🍌'};
obj1 = {...obj2, 'orange': '🍊'}; // 전개연산자도 사용

console.log(obj1);
console.log(obj2);