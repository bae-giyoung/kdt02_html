// ================== [fetch 사용 연습] ===================

// 포스터 보여주는 함수
const showPoster = (movieNm) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=&query=${movieNm}`; // 인증키 삭제함
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    //console.log(data);
    document.querySelector('.poster .imgBox').innerHTML = `<img src="https://image.tmdb.org/t/p/w500${data.results[0].poster_path}"></img>`;
  })
  .catch(err => console.log(err));
}

// 자세한 영화 정보 보여주는 함수
const bindHandler = (dataList) => {
  const lis = document.querySelectorAll('.mvlist li');
  const infoBox = document.querySelector('.resultBox2');
  lis.forEach((li, idx)=>{
    li.addEventListener('click', ()=>{
      const data = dataList[idx];
      infoBox.classList.remove('hide');
      showPoster(encodeURIComponent(data.movieNm));
      document.querySelector('.info .openDt').innerHTML = `개봉일: ${data.openDt}`;
      document.querySelector('.info .salesAmt').innerHTML = `일 매출액: ${data.salesAmt}`;
      document.querySelector('.info .salesAcc').innerHTML = `누적 매출액: ${data.salesAcc}`;
      document.querySelector('.info .audiCnt').innerHTML = `일 관객수: ${data.audiCnt}`;
      document.querySelector('.info .audiAcc').innerHTML = `누적 관객수: ${data.audiAcc}`;
    });
  });
}

// 순위 리스트 출력 함수
const printList = (data, day) => {
  const list = data;
  const ul = document.querySelector(".mvlist");
  
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
  
  // 데이터가 없는 경우의 리스트, 데이터가 존재할 경우 첫번째 목록의 포스터 출력
  if (data.length == 0) {
    ul.innerHTML = `<li class="no-data">데이터가 존재하지 않습니다.</li>`;
  } else {
    showPoster(encodeURIComponent(data[0].movieNm) + "");
  }

  // 타이틀 갱신
  document.querySelector('.mvTit .date').innerHTML = day;
}

const getAllData = (day, gubun)=>{
  gubun = gubun || "";
  // fetch API 사용해서 어제 날짜의 박스오피스 순위 정보 받기
  const apiKey = '';
  const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${day}&multiMovieYn=${gubun}`;
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    //console.log(data.boxOfficeResult);
    printList(data.boxOfficeResult.dailyBoxOfficeList, day);
    bindHandler(data.boxOfficeResult.dailyBoxOfficeList);
  })
  .catch(err => console.log(err));
}

const yesterday = ()=>{
  // 어제 날짜 구하기 yyyymmdd로 구해야 함!
  const date = new Date();
  return date.getFullYear() + ("00" + (date.getMonth()+1)).slice(-2) + ("00" + (date.getDate() - 1  == 0 ? 31 : date.getDate() - 1)).slice(-2);
}

const init = (yesterday)=>{
  // 데이터 뿌리기
  getAllData(yesterday);

  // 날짜 선택 박스 디폴트값 어제 날짜로 지정!
  const seld = document.getElementById('seld');
  seld.value = yesterday.slice(0,4) + "-" + yesterday.slice(4,6) + "-" + yesterday.slice(6,8);
}



document.addEventListener('DOMContentLoaded', ()=>{
  init(yesterday());

  // 일자와 영화 유형으로 박스오피스 순위 검색하기
  const btn = document.getElementById('search');
  const seld = document.getElementById('seld');
  const posterDiv = document.querySelector('.poster .imgBox');
  const infoBox = document.querySelector('.resultBox2');

  btn.addEventListener('click',(e)=>{
    e.preventDefault();
    posterDiv.innerHTML = '';
    infoBox.classList.add('hide'); // 안보이게 처리하면 리셋 할 필요가 있을까?
    const day = seld.value.replaceAll('-','');
    const gubun = document.querySelector('[name=gubun]:checked').value;
    getAllData(day, gubun);
  });
})




// [교수님 풀이: 250529] : 이렇게 단계별로 챠근 차근 생각을 정리해보자!
/*
const yesterday = () => {
  let yday = new Date() ;
  yday.setDate(yday.getDate() - 1) ; //어제 날짜

  return yday.toISOString().slice(0, 10);

  // let y = yday.getFullYear() ; //연도4자리
  // let m = yday.getMonth() + 1 ; //월 
  // m = m < 10 ? '0' + m : m ;

  // let d = yday.getDate() ; //일
  // d = d < 10 ? '0' + d : d ;
  
  // return y+String(m).padStart(2, '0')+String(d).padStart(2,'0') ;
}


const getMvList = (dt, ul) => {
  console.log("dt=", dt) 
  const url = "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=&targetDt=" + dt;
  
  // console.log(url)
  fetch(url) 
  .then(resp => resp.json())
  .then(data => {
    const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList ;
    console.log(dailyBoxOfficeList)
    const mvList = dailyBoxOfficeList.map((item) => 
           `<li>
                <span class="spRank">${item.rank}</span> 
                <span class="spMv">${item.movieNm}</span>
                ${parseInt(item.rankInten) > 0 
                  ? '<span class="spR"><i class="fa-solid fa-arrow-up"></i>' + Math.abs(item.rankInten) + "</span>"
                  : parseInt(item.rankInten) < 0 
                    ?'<span class="spB"><i class="fa-solid fa-arrow-down"></i>' + Math.abs(item.rankInten) + "</span>"
                    :'<i class="fa-solid fa-minus sp"></i>'
                }
            </li>` 
                                  ) ;
    let tags = mvList.join('') ;
     
    ul.innerHTML = tags ;                              
     
  })
  .catch(err => console.log(err)) 
  ;
}

document.addEventListener("DOMContentLoaded", ()=>{
  const ul = document.querySelector("main > ul") ;
  const dtIn = document.querySelector("#dt") ;
  dtIn.setAttribute("max", yesterday()) ;

  dtIn.value = yesterday() ; 
  getMvList(dtIn.value.replaceAll('-',''), ul) ;
  console.log(yesterday())

  dtIn.addEventListener("change" , () => {
    getMvList(dtIn.value.replaceAll('-',''), ul) ;
  });
  
});
*/


// [교수님 풀이 250602]
/*
const yesterday = () => {
  let yday = new Date() ;
  yday.setDate(yday.getDate() - 1) ; //어제 날짜

  return yday.toISOString().slice(0, 10);

  // let y = yday.getFullYear() ; //연도4자리
  // let m = yday.getMonth() + 1 ; //월 
  // m = m < 10 ? '0' + m : m ;

  // let d = yday.getDate() ; //일
  // d = d < 10 ? '0' + d : d ;
  
  // return y+String(m).padStart(2, '0')+String(d).padStart(2,'0') ;
}

const getPoster = (mvNm) => {
  console.log("getPoster" , mvNm);

}
const getMvList = (dt, ul, gubun) => {
  console.log("dt=", dt) 
  const apikey = "" 

  let url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apikey}&targetDt=${dt}`;
  
  if (gubun == "r2") {
    url = `${url}&multiMovieYn=N`
  } else if (gubun == "r3") {
    url = `${url}&multiMovieYn=Y`
  } 
  
  // console.log(url)
  fetch(url) 
  .then(resp => resp.json())
  .then(data => {
    const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList ;
    console.log(dailyBoxOfficeList)
    const mvList = dailyBoxOfficeList.map((item) => {
           const mv = encodeURIComponent(item.movieNm);
           return `<li onClick=getPoster("${mv}")>
                <span class="spRank">${item.rank}</span> 
                <span class="spMv">${item.movieNm}</span>
                ${parseInt(item.rankInten) > 0 
                  ? '<span class="spR"><i class="fa-solid fa-arrow-up"></i>' + Math.abs(item.rankInten) + "</span>"
                  : parseInt(item.rankInten) < 0 
                    ?'<span class="spB"><i class="fa-solid fa-arrow-down"></i>' + Math.abs(item.rankInten) + "</span>"
                    :'<i class="fa-solid fa-minus sp"></i>'
                }
            </li>` }
    ) ;
    let tags = mvList.join('') ;
     
    ul.innerHTML = tags ;                              
     
  })
  .catch(err => console.log(err)) 
  ;
}

document.addEventListener("DOMContentLoaded", ()=>{
  const ul = document.querySelector("main ul") ;
  const dtIn = document.querySelector("#dt") ;
  const bt = document.querySelector(".divRadio > button")
  dtIn.setAttribute("max", yesterday()) ;

  dtIn.value = yesterday() ; 
  getMvList(dtIn.value.replaceAll('-',''), ul) ;
  console.log(yesterday())

  dtIn.addEventListener("change" , () => { 
    getMvList(dtIn.value.replaceAll('-',''), ul, "") ;
  });
  
  bt.addEventListener("click" , (e)=>{
    e.preventDefault();
    const gubun = document.querySelector("[type=radio]:checked").value ; 
    getMvList(dtIn.value.replaceAll('-',''), ul, gubun) ;
  });
});
*/