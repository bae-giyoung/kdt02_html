document.addEventListener('DOMContentLoaded', ()=>{
    const hDiv = document.querySelector('.hDiv');
    const gDiv = document.querySelector('.gridDiv');
    const grids = document.querySelectorAll('.gridDiv>div');
    const bt = document.querySelector('.btnDiv>button');
    const msg = document.querySelector('#msg');
    let flag = false;
    let count = 0;

    // 1. 시작 버튼 누르면 랜덤한 위치에 폭탄 이미지 생성 + 이미지 교체 + 클래스 붙이기
    // grids[Math.floor(Math.random()*9)].innerHTML = '<img src="../img/boom.png" alt="폭탄">';
    bt.addEventListener('click',()=>{
        hDiv.classList.remove('fail');
        hDiv.style.display = 'none';
        gDiv.style.display = 'flex';

        // 게임 초기화
        if (!flag) {
            flag = true;
            msg.innerHTML = '게임중';
            bt.innerHTML = '폭탄섞기';
            
            grids.forEach((g)=>{
                g.className = 'heart';
            });
    
            grids[Math.floor(Math.random()*9)].classList.add('boom');
        }
    });

    // 2. div 클릭 이벤트
    // 클릭한 div의 이미지 보이게
    // -> 클릭한 div가 boom클래스를 가지고 있으면 실패
    // -> 하트를 8개까지 클릭 했을때 나머지 전부 보이게
    // 나머지 다 보이게 하고 초기 설정으로
    for (let grid of grids) {
        grid.addEventListener('click', ()=>{
            // 게임 초기화 안됐을 때
            if (!flag) {
                msg.innerHTML = '폭탄을 섞어주세요';
                return;
            }

            // 게임 중
            if (grid.classList.contains('boom')) {
                msg.innerHTML = '실패';
                //grids.forEach((g)=>g.classList.add('show'));
                hDiv.classList.add('fail');
                hDiv.style.display = 'flex';
                gDiv.style.display = 'none';
            } else if (count>=7) {
                msg.innerHTML = '성공';
                /* grids.forEach((g)=>{
                    g.classList.remove('boom');
                    g.classList.add('show');
                }); */
                hDiv.style.display = 'flex';
                gDiv.style.display = 'none';
            } else {
                grid.classList.add('show');
                count++;
                return;
            }
            
            bt.innerHTML = '다시 하기';
            flag = false;
            count = 0;
        });
    }

})





// 교수님 풀이 : [배열 문제]로 풀어보기!
/* const init = (cols) =>{
      msg.innerHTML = "" ;
      msg.innerHTML = "" ;
      for (let col of cols) {
        col.innerHTML = "" ;
      }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const cols = document.querySelectorAll(".col") ;
  const bt = document.querySelector(".row > button") ;
  const msg = document.querySelector("#msg") ;
  let arr = [0,0,0,0,0,0,0,0,1] ;
  let flag = false ; 
  let cnt = 0;

  for(let [idx, col] of cols.entries()) {
    col.addEventListener("click" , ()=>{
      if ( !flag ) {
        msg.innerHTML = "폭탄을 섞어주세요" ;
        return ;
      }
      if (msg.innerHTML == "실패!")  return ;
      
      if ( arr[idx] == 0) {
        //하트
        col.innerHTML = '<img src="../img/hart.png">' ;
        cnt++ ;

        console.log(cnt, arr.indexOf(1))
        if ( cnt == 8 ) {
          cols[arr.indexOf(1)].innerHTML = '<img src="../img/hart.png">' ;
          msg.innerHTML = "성공!" ;
          flag = false ;
          bt.innerHTML = "폭탄섞기" ;
        }
      }
      else  {
        //폭탄
        col.innerHTML = '<img src="../img/boom.png">' ;
        msg.innerHTML = "실패!" ;
        flag = false ;
        bt.innerHTML = "폭탄섞기" ;
      }
    }) ;
  }

  bt.addEventListener("click", ()=>{
    if ( !flag ) {
      arr.sort(() => Math.random() - 0.5);
      bt.innerHTML = "게임중 ...." ;
      flag = true ;
      
      cnt = 0 ;
      console.log(arr);
      init(cols) ;
    }
  })
}); */