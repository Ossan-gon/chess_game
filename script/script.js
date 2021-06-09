//ローディング時のイベントが起きた場合実行する関数を定義
window.onload = function(){
    //本文内のID"loading"を読み取る変数
    const spinner = document.getElementById('loading');
    //loadingを確認後CSSにクラスloadedを加える
    spinner.classList.add('loaded');
};

//画像を配列で宣言
const slideImg=["./../image/ChessPlay_1.jpg","./../image/ChessPlay_2.jpg","./../image/ChessPlay_3.jpg"];
//0を指定
let num = 0;
//.a_ra--sを読み取る
const ra = document.querySelector('.a_ra--s');
//.a_la--sを読み取る
const la = document.querySelector('.a_la--s');
//クリックしたときに
ra.addEventListener('click',function(){
    //numの数を増やす
    num++;
    //num=3になったときnum=3の画像はないため
    if(num===3){
        //num=0に戻す
        num=0;
    }
    //写真を切り替える
    document.getElementById('photo1').src=slideImg[num];
    
});
//クリックしたときに
la.addEventListener('click',function(){
    //数を減らす
    num--;
    //num=-1の時num=-1の画像はないため
    if(num===-1){
        //num=2にする
        num=2;
    }
    //写真を切り替える
     document.getElementById('photo1').src=slideImg[num];
   
});

//カウントダウンの関数設定
function countDown() {
    
    //現在の日時を設定
    const now = new Date();
    //予約終了日を指定
    const lastDay = new Date('2021/7/31 23:59:59');
    //予約日から現在まで何ミリ秒か
    const differ = lastDay.getTime() - now.getTime();
    
    //日、時間、分、秒を指定
    const day =Math.floor(differ/(24*60*60*1000));
    const sec =Math.floor(differ/1000)%60;
    const min =Math.floor(differ/1000/60)%60;
    const hour = Math.floor(differ/1000/60/60)%60;
    
    //期限が過ぎた際の表示
    const tet = document.getElementById("tet");
    
    
    document.getElementById("day").textContent=String(day).padStart(2,"0");
    document.getElementById("hour").textContent=String(hour).padStart(2,"0");
    document.getElementById("min").textContent=String(min).padStart(2,"0");
    document.getElementById("sec").textContent=String(sec).padStart(2,"0");
    
    if(differ >= 0){
     setTimeout(countDown,1000); 
     
    } else {
     tet.innerHTML='受け付けは終了しました';
    }
    
}

countDown();

//カレンダーのヤツ
//曜日を指定
const week = ["Sun","Mon","Tus","Wed","Thr","Fri","Stu"];
//今日の日にちを所得
const today =new Date(); 
// 月末だとずれる可能性があるため、1日固定で取得
const showDate= new Date(today.getFullYear(), today.getMonth(), 1);

//カレンダーの関数
function createCalender(year,month){ 
    //カレンダーを表で表す
    let calender = "<table class='t_h'><tr class='dayOfWeek'>";
    //配列の曜日を順位並べる
    for (let i=0 ; i<week.length; i++) {
        calender += "<th>" + week[i] + "</th>";
    }
    calender += "</tr>";
    
    //カレンダーの前月と後月を表示するためのヤツ
    //最終週が土曜に終わらなかったときに使用
    let count = 0;
    //月の初めの曜日の変数
    let startDayOfWeek = new Date(year, month, 1).getDay();
    //次の月の最終日
    let endDate = new Date(year, month+1, 0).getDate();
    //先月の最終日
    let lastMonthEndDate = new Date(year, month, 0).getDate();
    let row = Math.ceil((startDayOfWeek + endDate)/week.length);
    
    
    for(let i=0;i<row;i++){
        calender += "<tr>";
        //先月の部分を表示するためのヤツ
        for (let j=0;j<week.length;j++){
            //月の初めが日曜じゃないとき(1行目、かつ、1日の曜日未満の時)
            if (i==0 && j<startDayOfWeek){
                //カレンダーに前月の部分を所得する　例　5月は31日絞め、　6月は火曜(2) なので　31-2+0+1 =30　
                calender += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j +1) +"</td>";
                //最終週の場合
            } else if (count >= endDate) {
                //カウントを足していき
                count++;
                //例えば当月が31日までだった場合、32-31=1を追加する
                calender += "<td class='disabled'>" + (count - endDate) + "</td>";
                //今日の日付を所得する
            } else {
                //カウントしていく
                count++;
                //年と月と日にちが今日と同じであれば
                if(year == today.getFullYear()
                && month == today.getMonth()
                && count == today.getDate()){
                    //クラスを適用した形で表示
                    calender += "<td class='today'>" + count + "</td>";
                } else {
                    //それ以外は普通に表示
                    calender += "<td>" + count + "</td>"
                }
            }
        }
        calender += "</tr>"
    }
    return calender;
}

//カレンダーの表示
function showCalender(date) {
    //年と月を所得
    let year = date.getFullYear();
    let month = date.getMonth();
    //カレンダーの表題に所得した年月を表示する
    document.getElementById('calendartitle').innerHTML = year + "/" + (month+1)  ;
    //カレンダー関数を変数に設定
    let calendar = createCalender(year, month);
    //HTMLにカレンダー関数を表示する
    document.querySelector('#calendar').innerHTML = calendar;
    
}

showCalender(today);

//ボタンを押して先月以前のカレンダーを所得する
function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showCalender(showDate);
}
//ボタンを押して来月以前のカレンダーを所得する
function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showCalender(showDate);
}

prev();
next();

(function(){

    //要素の取得
    let elements = document.getElementsByClassName("drag-and-drop");
    let elements2 = document.getElementsByClassName("drag-and-drop2");
    let elements3 = document.getElementsByClassName("drag-and-drop3");

    //要素内のクリックされた位置を取得するグローバル（のような）変数
    let x;
    let y;

    //マウスが要素内で押されたとき、又はタッチされたとき発火
    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mousedown", mdown, false);
        elements[i].addEventListener("touchstart", mdown, false);
        elements2[i].addEventListener("mousedown", mdown, false);
        elements2[i].addEventListener("touchstart", mdown, false);
        elements3[i].addEventListener("mousedown", mdown, false);
        elements3[i].addEventListener("touchstart", mdown, false);
    }

    //マウスが押された際の関数
    function mdown(e) {

        //クラス名に .drag を追加
        this.classList.add("drag");

        //タッチデイベントとマウスのイベントの差異を吸収
        if(e.type === "mousedown") {
            let event = e;
        } else {
            let event = e.changedTouches[0];
        }

        //要素内の相対座標を取得
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        //ムーブイベントにコールバック
        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);
    }

    //マウスカーソルが動いたときに発火
    function mmove(e) {

        //ドラッグしている要素を取得
        let drag = document.getElementsByClassName("drag")[0];

        //同様にマウスとタッチの差異を吸収
        if(e.type === "mousemove") {
            let event = e;
        } else {
            let event = e.changedTouches[0];
        }

        //フリック(「素早く動かす、弾く」という意味であり、この場合、指のスライド（弾き）のことを表しており、タッチスクリーン操作全般に用いられる表現)したときに画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();

        //マウスが動いた場所に要素を動かす
        drag.style.top = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";

        //マウスボタンが離されたとき、またはカーソルが外れたとき発動
        drag.addEventListener("mouseup", mup, false);
        document.body.addEventListener("mouseleave", mup, false);
        drag.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchleave", mup, false);

    }

    //マウスボタンが上がったら発火
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];

        //ムーブベントハンドラ(何らかの処理要求が発生したときに起動されるものを指すこと)の消去
        document.body.removeEventListener("mousemove", mmove, false);
        drag.removeEventListener("mouseup", mup, false);
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);

        //クラス名 .drag も消す
        drag.classList.remove("drag");
    }

})()

