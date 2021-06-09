
window.onload = function(){
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded')
}



const img_src=["image/ikeda_cora1.png","image/ikeda_cora2.png"];
let num = 1;

function slide_time(){
    if(num===1) {
        num=0;
    } else {
        num=1;
    }
    document.getElementById("slide_img").src= img_src[num]
}

setInterval(slide_time,3900);

const ikeda = document.querySelector('.b_l');

//ikedaの変数がクリックされた場合
ikeda.addEventListener("click",()=>{
    //lookという変数を定義これはgoogleとかの上に出る確認の部分
    const look = confirm('池田陽介の連絡先を知る覚悟はありますか？');
    //確認に対して「はい」と回答した場合
    if(look == true) {
        //「next.html」へ移動
        window.location.href="next.html";
        //「いいえ」と選択した場合
    } else { 
        //アラートで「ナイス判断」と出力させる
        alert('ナイス判断')
    }
})

const btn = document.querySelector('.btn');
const nav = document.querySelector('.nav');
btn.addEventListener('click', () => {
    nav.classList.toggle('open-menu');
    if (btn.innerHTML === '押してみろ') {
        btn.innerHTML = 'アッー！';
    } else {
        btn.innerHTML = '押してみろ';
    }
});
