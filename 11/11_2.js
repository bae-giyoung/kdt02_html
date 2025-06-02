// ================== [fetch 사용 연습] ===================

// 포스터 보여주는 함수
const showPoster = (movieNm) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=b42483d9af611184a5e87b9980e11075&query=${movieNm}`;
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    //console.log(data);
    document.querySelector('.poster .imgBox').innerHTML = `<img src="https://image.tmdb.org/t/p/w500${data.results[0].poster_path}"></img>`;
    document.querySelector('.poster .opd').innerHTML = `개봉일: ${data.results[0].release_date}`;
  })
  .catch(err => console.log(err));
}

// 자세한 영화 정보 보여주는 함수
//const showInfo = (movieNm) => {
//  showPoster(movieNm);
//}

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
    const movieNm = encodeURIComponent(item.movieNm);

    return `<li onclick="showPoster('${movieNm}');">
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

const printDataAll = (day, gubun)=>{
  gubun = gubun || "";
  // fetch API 사용해서 어제 날짜의 박스오피스 순위 정보 받기
  const apiKey = 'ea8f1c3fc3b960969ad4467d5f3e617f';
  const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${day}&multiMovieYn=${gubun}`;
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    console.log(data.boxOfficeResult);
    printList(data.boxOfficeResult.dailyBoxOfficeList, day);
    showPoster(encodeURIComponent(data.boxOfficeResult.dailyBoxOfficeList[0].movieNm) + "");
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
  printDataAll(yesterday);

  // 날짜 선택 박스 디폴트값 어제 날짜로 지정!
  const seld = document.getElementById('seld');
  seld.value = yesterday.slice(0,4) + "-" + yesterday.slice(4,6) + "-" + yesterday.slice(6,8);
}

document.addEventListener('DOMContentLoaded', ()=>{
  init(yesterday());

  // 날짜 입력받으면, 데이터 갱신
  const btn = document.getElementById('search');
  const seld = document.getElementById('seld');
  const posterDiv = document.querySelector('.poster .imgBox');
  btn.addEventListener('click',(e)=>{
    e.preventDefault();
    posterDiv.innerHTML = '';
    const day = seld.value.replaceAll('-','');
    const gubun = document.querySelector('[name=gubun]:checked').value;
    printDataAll(day, gubun);
  });
  //seld.addEventListener('change', () => printDataAll(seld.value.replaceAll('-','')));
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
  const url = "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=2a350cfbca6c428eb04c71e21cc681e7&targetDt=" + dt;
  
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