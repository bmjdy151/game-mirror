// もろもろの準備
const video = document.querySelector("video");　　　　　　// video 要素を取得
const canvas = document.getElementById("canvas");       // canvas 要素の取得
const context = canvas.getContext("2d");                // canvas の context の取得
//デフォルト設定
let startcheck = false;
let eye_selection = "blue";
let hat_selection = "none";
let acc_selection = "none";
let cheek_selection = "none";
const start = document.getElementById("start"); //スタートボタン用に要素を取得
//メガネのオプション画像
const blue = document.getElementById('blue');
const sun = document.getElementById('sun');
const red = document.getElementById('red');
//メガネのオプションボタン
const eoption0 = document.getElementById("eyeoption0");
const eoption1 = document.getElementById("eyeoption1");
const eoption2 = document.getElementById("eyeoption2");
const eoption3 = document.getElementById("eyeoption3");
const eoption4 = document.getElementById("eyeoption4");
//帽子のオプション画像
const bunny = document.getElementById('bunny');
const bheadphone = document.getElementById('b-headphone');
const hat = document.getElementById('hat');
const crown = document.getElementById('crown');
//帽子のオプションボタン
const haption0 = document.getElementById("hatoption0");
const haption1 = document.getElementById("hatoption1");
const haption2 = document.getElementById("hatoption2");
const haption3 = document.getElementById("hatoption3");
const haption4 = document.getElementById("hatoption4");
//小物のオプション画像
const nose = document.getElementById('nose');
const cigar = document.getElementById('cigar');
const jewel = document.getElementById('jewel');
//小物のオプションボタン
const aoption0 = document.getElementById("aoption0");
const aoption1 = document.getElementById("aoption1");
const aoption2 = document.getElementById("aoption2");
const aoption3 = document.getElementById("aoption3");
const aoption4 = document.getElementById("aoption4");

//チークのオプション画像
const corangeL = document.getElementById('c-o-l');
const corangeR = document.getElementById('c-o-r');
const cbrownL = document.getElementById('c-b-l');
const cbrownR = document.getElementById('c-b-r');
const credL = document.getElementById('c-r-l');
const credR = document.getElementById('c-r-r');
//チークのオプションボタン
const coption0 = document.getElementById("cheekoption0");
const coption1 = document.getElementById("cheekoption1");
const coption2 = document.getElementById("cheekoption2");
const coption3 = document.getElementById("cheekoption3");
const coption4 = document.getElementById("cheekoption4");

//getUserMedia によるカメラ映像の取得
const constraints = {
  audio: false,               // マイクの音声は使わない
  video: {facingMode: "user"} //カメラの映像を使う（スマホならインカメラ）
};
navigator.mediaDevices.getUserMedia(constraints).then(stream => {// メディアデバイスが取得できたら 
  video.srcObject = stream;//ストリームをvideo要素に代入
  const height = "400";
  video.height = height; // ビデオの高さを500に
});
 
// clmtrackr の開始
var tracker = new clm.tracker();  // tracker オブジェクトを作成
tracker.init(pModel);             // tracker を所定のフェイスモデル（※）で初期化
tracker.start(video);             // video 要素内でフェイストラッキング開始
 
// 描画ループ
function drawLoop() {
  requestAnimationFrame(drawLoop);                      // drawLoop 関数を繰り返し実行
  var positions = tracker.getCurrentPosition();         // 顔部品の現在位置の取得
  // showData(positions);                                  // データの表示
  context.clearRect(0, 0, canvas.width, canvas.height); // canvas をクリア
  //tracker.draw(canvas);                                 // canvas にトラッキング結果を描画

  // console.log(positions);

  if(startcheck){
    console.log(eye_selection );
    //以下メガネロジック
    if(eye_selection == "none"){
      blue.style.display = "none";
      sun.style.display = "none";
      red.style.display = "none";
    }else if(eye_selection == "blue"){
      drawStamp(positions, blue, 33, 2, 0.0, 0.3);   // ★青メガネのスタンプを描画
      sun.style.display = "none";
      red.style.display = "none";
    }else if(eye_selection == "sun"){
      drawStamp(positions, sun, 33, 2, 0.0, 0.3);   // ★サングラスのスタンプを描画
      blue.style.display = "none";
      red.style.display = "none";
    }else if(eye_selection == "red"){
      drawStamp(positions, red, 33, 2, 0.0, 0.3);   // ★赤メガネのスタンプを描画
      blue.style.display = "none";
      sun.style.display = "none";
    }

    //以下帽子ロジック
    if(hat_selection == "none"){
      bunny.style.display ="none";
      bheadphone.style.display ="none";
    }
    else if(hat_selection == "bunny"){
      drawStamp(positions, bunny, 33, 3, 0.0, -2.9);   // ★ウサギの耳のスタンプを描画
    }else if (hat_selection == "bheadphone"){
      drawStamp(positions, bheadphone, 33, 3.4, 0.0, -0.8);   // ★青いヘッドフォンを描画
    }else if (hat_selection == "hat"){
      drawStamp(positions, hat, 33, 3.6, 0.0, -1.7);   // ★ハットを描画
    }else if (hat_selection == "crown"){
      drawStamp(positions, crown, 33, 1.2, 0.0, -2.5);   // ★王冠を描画
    }

    //以下小物ロジック
    if(acc_selection == "none"){
      nose.style.display ="none";
      cigar.style.display ="none";
      jewel.style.display ="none";
    }
    else if(acc_selection == "orange"){
      // drawStamp(positions, corangeR, 35, 0.8, 1.0, 0);   // ★オレンジチーク左のスタンプを描画
      // drawStamp(positions, corangeL, 39, 0.8, -1.0, 0);   // ★オレンジチーク右のスタンプを描画
      // cbrownL.style.display ="none";
      // cbrownR.style.display ="none";
      // credL.style.display ="none";
      // credR.style.display ="none";
    }else if (acc_selection == "nose"){
      drawStamp(positions, nose, 62, 2.5, 0.0, -0.1);   // ★ウサギの鼻のスタンプを描画
      cigar.style.display ="none";
      jewel.style.display ="none";
    }else if (acc_selection == "cigar"){
      drawStamp(positions, cigar, 44, 1, -0.4, -0.1);   // ★タバコのスタンプを描画
      jewel.style.display ="none";
      nose.style.display ="none";
    }
    else if (acc_selection == "jewel"){
      drawStamp(positions, jewel, 1, 0.3, 0, 0.5);   // ★左のジュエルスタンプを描画
      drawStamp(positions, jewel, 13, 0.3, 0, 0.5);   // ★右のジュエルスタンプを描画
    }
    //以下チークロジック
    if(cheek_selection == "none"){
      corangeL.style.display ="none";
      corangeR.style.display ="none";
      cbrownL.style.display ="none";
      cbrownR.style.display ="none";
      credL.style.display ="none";
      credR.style.display ="none";
    }
    else if(cheek_selection == "orange"){
      drawStamp(positions, corangeR, 35, 0.8, 1.0, 0);   // ★オレンジチーク左のスタンプを描画
      drawStamp(positions, corangeL, 39, 0.8, -1.0, 0);   // ★オレンジチーク右のスタンプを描画
      cbrownL.style.display ="none";
      cbrownR.style.display ="none";
      credL.style.display ="none";
      credR.style.display ="none";
    }else if (cheek_selection == "brown"){
      drawStamp(positions, cbrownL, 35, 0.7, 1.0, 0);   // ★ブラウンチーク左のスタンプを描画
      drawStamp(positions, cbrownR, 39, 0.7, -1.0, 0);   // ★ブラウンチーク右のスタンプを描画
      corangeL.style.display ="none";
      corangeR.style.display ="none";
      credL.style.display ="none";
      credR.style.display ="none";
    }else if (cheek_selection == "red"){
      drawStamp(positions, credR, 35, 0.7, 1.0, 0);   // ★レッドチーク左のスタンプを描画
      drawStamp(positions, credL, 39, 0.7, -1.0, 0);   // ★レッドチーク右のスタンプを描画
      corangeL.style.display ="none";
      corangeR.style.display ="none";
      cbrownL.style.display ="none";
      cbrownR.style.display ="none";
    }
    else if (cheek_selection == "pink"){
      // drawStamp(positions, credR, 35, 0.7, 1.0, 0);   // ★ピンクチーク左のスタンプを描画
      // drawStamp(positions, credL, 39, 0.7, -1.0, 0);   // ★ピンクチーク右のスタンプを描画
      // corangeL.style.display ="none";
      // corangeR.style.display ="none";
      // cbrownL.style.display ="none";
      // cbrownR.style.display ="none";
    }
  }
}
drawLoop();                                             // drawLoop 関数をトリガー

//スタートボタン
start.addEventListener("click", function() {
  startcheck = true;
});

//クリックイベントリスナー : メガネ
eoption0.addEventListener("click", function() {
  eye_selection = "none";
});
eoption1.addEventListener("click", function() {
  eye_selection = "sun";
});
eoption2.addEventListener("click", function() {
  eye_selection = "blue";
});
eoption3.addEventListener("click", function() {
  eye_selection = "red";
});
//クリックイベントリスナー : 帽子
haption0.addEventListener("click", function() {
  hat_selection = "none";
});
haption1.addEventListener("click", function() {
  hat_selection = "bunny";
});
haption2.addEventListener("click", function() {
  hat_selection = "bheadphone";
});
haption3.addEventListener("click", function() {
  hat_selection = "hat";
});
haption4.addEventListener("click", function() {
  hat_selection = "crown";
});
//クリックイベントリスナー : 小物
aoption0.addEventListener("click", function() {
  acc_selection = "none";
});
aoption1.addEventListener("click", function() {
  acc_selection = "orange";
});
aoption2.addEventListener("click", function() {
  acc_selection = "nose";
});
aoption3.addEventListener("click", function() {
  acc_selection = "cigar";
});
aoption4.addEventListener("click", function() {
  acc_selection = "jewel";
});
//クリックイベントリスナー : チーク
coption0.addEventListener("click", function() {
  cheek_selection = "none";
});
coption1.addEventListener("click", function() {
  cheek_selection = "orange";
});
coption2.addEventListener("click", function() {
  cheek_selection = "brown";
});
coption3.addEventListener("click", function() {
  cheek_selection = "red";
});
coption4.addEventListener("click", function() {
  cheek_selection = "pink";
});


// ★スタンプを描く drawStamp 関数 (顔部品の位置データ, 画像, 基準位置, 大きさ, 横シフト, 縦シフト)
function drawStamp(pos, img, bNo, scale, hShift, vShift) {
  var eyes = pos[32][0] - pos[27][0];                   // 幅の基準として両眼の間隔を求める
  var nose = pos[62][1] - pos[33][1];                   // 高さの基準として眉間と鼻先の間隔を求める
  var wScale = eyes / img.width;                        // 両眼の間隔をもとに画像のスケールを決める
  var imgW = img.width * scale * wScale;                // 画像の幅をスケーリング
  var imgH = img.height * scale * wScale;               // 画像の高さをスケーリング
  var imgL = pos[bNo][0] - imgW / 2 + eyes * hShift;    // 画像のLeftを決める
  var imgT = pos[bNo][1] - imgH / 2 + nose * vShift;    // 画像のTopを決める
  context.drawImage(img, imgL, imgT, imgW, imgH);       // 画像を描く
}

// // 顔部品（特徴点）の位置データを表示する showData 関数
// function showData(pos) {
//   var str = "";                                         // データの文字列を入れる変数
//   for(var i = 0; i < pos.length; i++) {                 // 全ての特徴点（71個）について
//     str += "Coordinate Positions" + i + ": ("
//          + Math.round(pos[i][0]) + ", "                 // X座標（四捨五入して整数に）
//          + Math.round(pos[i][1]) + ")<br>";             // Y座標（四捨五入して整数に）
//   }
//   var dat = document.getElementById("dat");             // データ表示用div要素の取得
//   dat.innerHTML = str;                                  // データ文字列の表示
// }