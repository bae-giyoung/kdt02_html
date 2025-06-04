// [목표] 검색 기능 만들기
// 1. 검색 텍스트 입력
// 2. 검색 (fetch API)
// 3. 리셋 버튼을 누르면 초기화
// 4. 검색을 하고 응답받은 데이터로 resultBox에 이미지 뿌리기

// 받은 데이터로 이미지 요소 만들기
const makeLists = (data)=>{
  const resultBox = document.getElementById('resultBox');
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
  const url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=qnUaHBbRpxj8Q30t70gU7vn2g%2BOwovLtXQ54vycc6E6jsnE6T8zHH%2FxehRq%2BwX7QFHOiTlmtq2R%2BKbgknVycTw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&keyword=${encodedTxt}&_type=json`;
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    console.log(data.response.body.items.item);
    makeLists(data.response.body.items.item);
  });
}



document.addEventListener('DOMContentLoaded',()=>{
  const schInp = document.getElementById('schTxt');
  const schBt = document.getElementById('schBt');
  const resBt = document.getElementById('resetBt');
  const resBox = document.getElementById('resultBox');

  schBt.addEventListener('click',()=>{
    searchImgs(schInp.value);
  });

  resBt.addEventListener('click',()=> resBox.innerHTML = '검색 결과가 없습니다.');
})