// [fetch 사용 연습]
const printList = (data, day) => {
  const list = data;
  const ul = document.querySelector("main .mvlist");

  let nmlist = list.map((item)=> {
    const inten = item.rankInten;
    let intenIco;
    if (inten > 0) intenIco = `<small class="up">↑${Math.abs(inten)}</small>`;
    else if (inten < 0) intenIco = `<small class="down">↓${Math.abs(inten)}</small>`;
    else intenIco = `<small class="same">=</small>`;

    return `<li>
    <span class="spRank">${item.rank}</span>
    <span class="spNm">${item.movieNm}</span>
    <span class="inten">${intenIco}</span>
    </li>`
  });
  ul.innerHTML = nmlist.join("");

  if (data.length == 0) ul.innerHTML = `<li class="no-data">데이터가 존재하지 않습니다.</li>`;

  // 타이틀 갱신
  document.querySelector('.mvTit .date').innerHTML = day;
}

const printDataAll = (day)=>{
  // fetch API 사용해서 어제 날짜의 박스오피스 순위 정보 받기
  const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=ea8f1c3fc3b960969ad4467d5f3e617f&targetDt=${day}`;
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    console.log(data.boxOfficeResult.dailyBoxOfficeList);
    printList(data.boxOfficeResult.dailyBoxOfficeList, day);
  })
  .catch(err => console.log(err));
}

const init = ()=>{
  // 어제 날짜 구하기 yyyymmdd로 구해야 함!
  const date = new Date();
  const yesterday = date.getFullYear() + ("00" + (date.getMonth()+1)).slice(-2) + (date.getDate() - 1  == 0 ? 31 : date.getDate() - 1);
  //console.log(yesterday);
  
  // 데이터 뿌리기
  printDataAll(yesterday);
}

document.addEventListener('DOMContentLoaded', ()=>{
  init();

  // 날짜 입력받으면, 데이터 갱신
  const inp = document.getElementById('seld');
  inp.addEventListener('change', () => printDataAll(inp.value.replaceAll('-','')))

})