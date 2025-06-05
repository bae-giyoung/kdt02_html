// [목표] 검색 기능 만들기
// 1. 검색 텍스트 입력
// 2. 검색 (fetch API)
// 3. 리셋 버튼을 누르면 초기화
// 4. 검색을 하고 응답받은 데이터로 resultBox에 이미지 뿌리기

// 받은 데이터로 이미지 요소 만들기
const makeLists = (data)=>{
  //const resultBox = document.getElementById('resultBox'); // 상위 컨텍스트에 반드시 resultBox가 있다고 가정하면 없애는 것이 좋을까? => 교수님 풀이를 보니 인수로 받는 것이 좋겠다!
  let resultLists = data.map((item)=>{
    return `
    <div class="itemBox">
      <div class="imgBox">
        <img src=${item.galWebImageUrl} alt="${item.galTitle}"/>
      </div>
      <p class="info">
        <span class="tit">${item.galTitle}</span>
        <span class="loca">${item.galPhotographyLocation}</span>
      </p>
    </div>
    `
  });

  resultBox.innerHTML = resultLists.join('');
}


// 검색
const searchImgs = (txt)=>{
  if(txt == '') {
    alert('검색어를 입력하세요');
    return;
  }

  // const encodedTxt = encodeURIComponent(txt);
  const encodedTxt = txt;
  const url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&keyword=${encodedTxt}&_type=json`;
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    console.log(data.response.body.items.item);
    makeLists(data.response.body.items.item);
  });
}


document.addEventListener('DOMContentLoaded', ()=>{
  const schInp = document.getElementById('schTxt');
  const schBt = document.getElementById('schBt');
  const resBt = document.getElementById('resetBt');
  const resultBox = document.getElementById('resultBox');

  schBt.addEventListener('click',()=> searchImgs(schInp.value));

  resBt.addEventListener('click',()=> resultBox.innerHTML = '<div class="noData">검색 결과가 없습니다.</div>');
})


// [교수님 풀이] + 공부
const getData = (txtKw, content)=>{
  const apikey = '';
  const baseUrl = 'https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1';
  let url = `${baseUrl}?serviceKey=${apikey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A`;
  url =`${url}&keyword=${txtKw.value}&_type=json`; // 쿼리의 키밸류 쌍의 순서는 바꿔줘도 된다!
  
  //console.log(url);

  // fetch API
  fetch(url)
  //.then(resp => { console.log(resp); return resp.json() }) // .json()하기 전 데이터도 확인해보자!
  .then(resp => resp.json())
  .then(data => {
    //console.log(data); // 위의 데이터와 비교해보자!
    const items = data.response.body.items.item;
    //console.log(items);
    let tags = items.map(item =>
      `
      <div class="card">
        <div class="cardImg">
            <img src="${item.galWebImageUrl}" />
        </div>
        <div class="cardDiv">
            <span class="sp1">${item.galTitle}</span>
            <span class="sp2">${item.galPhotographyLocation}</span></span>
        </div>
      </div>
      `
    );
    content.innerHTML = tags.join('');
  })
  .catch(err => console.log(err))

  console.log('fetch.....');

}

document.addEventListener('DOMContentLoaded', ()=>{
  const txtKw = document.querySelector('#txt1');
  const bt1 = document.querySelector('.formDiv > button');
  const bt2 = document.querySelector('.formDiv > button[type=reset]');
  const content = document.querySelector('.content');

  bt1.addEventListener('click', (e)=>{
    e.preventDefault();

    if(txtKw.value == '') { // value는 null이나 undefined가 아니라 
      alert('키워드를 입력하세요');
      txtKw.focus();
      return;
    }

    getData(txtKw, content);
  });

  bt2.addEventListener('click', ()=>{
    content.innerHTML = '';
  });
})