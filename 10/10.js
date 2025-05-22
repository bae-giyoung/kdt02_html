document.addEventListener('DOMContentLoaded', ()=>{
    const btns = document.querySelectorAll('.cbtn');
    const result = document.querySelector('#result');
    btns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            const color = btn.getAttribute('data-color');
            result.style.backgroundColor = color;
            //result.style.color = color;
            result.innerHTML = color;

            console.log(color);
            console.log(result.style);
            //result.style.backgroundColor = '';
            //console.log(result.style);
        });
    })
})