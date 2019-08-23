// もろもろの準備
const video = document.querySelector("video");　　　　　　// video 要素を取得
const canvas = document.getElementById("canvas");       // canvas 要素の取得
const canvas2 = document.getElementById("canvas2");       // canvas 要素の取得
const context = canvas.getContext("2d");                // canvas の context の取得
const context2 = canvas2.getContext("2d");                // canvas の context の取得
context2.font = "30px Arial";
let score = 0;
const gradient = context2.createLinearGradient(0, 0, canvas2.width, 0);
gradient.addColorStop("0","magenta");
gradient.addColorStop(".25","blue");
gradient.addColorStop(".50","green");
gradient.addColorStop(".75","yellow");
gradient.addColorStop("1.0","red");
//デフォルト設定
let startcheck = false;
let eye_selection = "blue";
let hat_selection = "none";
let acc_selection = "none";
let cheek_selection = "none";
const start = document.getElementById("start"); //スタートボタン用に要素を取得

//保存ボタン
const savebutton = document.getElementById("save");

//目のオプション画像
const blue = document.getElementById('blue');
const sun = document.getElementById('sun');
// const red = document.getElementById('red');
const eyelash1 = document.getElementById('eyelash1');
const eyelash2 = document.getElementById('eyelash2');
const reye = document.getElementById('reye');
const reye1 = document.getElementById('reye1');
const reye2 = document.getElementById('reye2');
//目のオプションボタン
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
const mustache = document.getElementById('mustache');
//小物のオプションボタン
const aoption0 = document.getElementById("aoption0");
const aoption1 = document.getElementById("aoption1");
const aoption2 = document.getElementById("aoption2");
const aoption3 = document.getElementById("aoption3");
const aoption4 = document.getElementById("aoption4");

//メイクのオプション画像
const corangeL = document.getElementById('c-o-l');
const corangeR = document.getElementById('c-o-r');
// const cbrownL = document.getElementById('c-b-l');
// const cbrownR = document.getElementById('c-b-r');
const credL = document.getElementById('c-r-l');
const credR = document.getElementById('c-r-r');
const lip_t = document.getElementById('lip_t');
const lip_b = document.getElementById('lip_b');
const lip_tr = document.getElementById('lip_tr');
const lip_br = document.getElementById('lip_br');
//メイクのオプションボタン
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
  context2.clearRect(0, 0, canvas2.width, canvas2.height); // canvas をクリア
  //tracker.draw(canvas);                                 // canvas にトラッキング結果を描画

  // console.log(positions);

  if(startcheck){
    console.log("score",score);
    //以下目ロジック
    if(eye_selection == "none"){
      blue.style.display = "none";
      sun.style.display = "none";
      red.style.display = "none";
      eyelash1.style.display = "none";
      eyelash2.style.display = "none";
    }else if(eye_selection == "blue"){
      drawStamp(positions, blue, 33, 2, 0.0, 0.3);   // ★青メガネのスタンプを描画
      context2.fillText("You Look OK", 10, 50);
    }else if(eye_selection == "sun"){
      drawStamp(positions, sun, 33, 2, 0.0, 0.3);   // ★サングラスのスタンプを描画
      if(hat_selection == "bheadphone"){
      }else{
        score = 0;
      }
    }else if(eye_selection == "red"){
      // drawStamp(positions, red, 33, 2, 0.0, 0.3);   // ★赤メガネのスタンプを描画
      drawStamp(positions, reye, 32, 0.25, 0, 0);   // ★レッドチーク左のスタンプを描画
      drawStamp(positions, reye, 27, 0.25, 0, 0);   // ★レッドチーク右のスタンプを描画
    }else if(eye_selection == "eyelash"){
      drawStamp(positions, eyelash1, 28, 0.5, 0.05, -0.1);   // ★まつ毛のスタンプを描画
      drawStamp(positions, eyelash2, 23, 0.5, -0.05, -0.1);   // ★まつ毛のスタンプを描画
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
    }else if (acc_selection == "mustache"){
      drawStamp(positions, mustache, 37, 1.2, 0.0, 0.2);   // ★口髭のスタンプを描画
    }else if (acc_selection == "nose"){
      drawStamp(positions, nose, 62, 2.5, 0.0, -0.1);   // ★ウサギの鼻のスタンプを描画
    }else if (acc_selection == "cigar"){
      drawStamp(positions, cigar, 44, 1, -0.4, -0.1);   // ★タバコのスタンプを描画
    }
    else if (acc_selection == "jewel"){
      drawStamp(positions, jewel, 1, 0.3, 0, 0.5);   // ★左のジュエルスタンプを描画
      drawStamp(positions, jewel, 13, 0.3, 0, 0.5);   // ★右のジュエルスタンプを描画
    }
    //以下チークロジック
    if(cheek_selection == "none"){
      corangeL.style.display ="none";
      corangeR.style.display ="none";
      lip_tr.style.display ="none";
      lip_br.style.display ="none";
      credL.style.display ="none";
      credR.style.display ="none";
    }
    else if(cheek_selection == "orange"){
      drawStamp(positions, corangeR, 35, 0.8, 1.0, 0);   // ★オレンジチーク左のスタンプを描画
      drawStamp(positions, corangeL, 39, 0.8, -1.0, 0);   // ★オレンジチーク右のスタンプを描画
    }else if (cheek_selection == "brown"){
      // drawStamp(positions, cbrownL, 35, 0.7, 1.0, 0);   // ★ブラウンチーク左のスタンプを描画
      // drawStamp(positions, cbrownR, 39, 0.7, -1.0, 0);   // ★ブラウンチーク右のスタンプを描画
      drawStamp(positions, lip_tr, 47, 0.9, 0, 0);   // ★赤リップのスタンプを描画
      drawStamp(positions, lip_br, 57, 0.9, 0, 0);   // ★赤リップのスタンプを描画
    }else if (cheek_selection == "red"){
      drawStamp(positions, credR, 35, 0.7, 1.0, 0);   // ★レッドチーク左のスタンプを描画
      drawStamp(positions, credL, 39, 0.7, -1.0, 0);   // ★レッドチーク右のスタンプを描画
    }
    else if (cheek_selection == "lip"){
      drawStamp(positions, lip_t, 47, 0.9, 0, 0);   // ★ピンクリップのスタンプを描画
      drawStamp(positions, lip_b, 57, 0.9, 0, 0);   // ★ピンクリップのスタンプを描画
    }
    switch (score){
      case 150:
        context2.fillStyle = gradient;
        context2.fillText("Amazing Bunny!", 10, 50);
        break;
      case 100:
        context2.fillStyle = gradient;
        context2.fillText("You Look Awesome", 10, 50);
        break;
      case 50:
        context2.fillStyle = 'pink';
        context2.fillText("You Look Better", 10, 50);
        break;
      case 0:
        context2.fillStyle = 'white';
        context2.textAlign = "start"; 
        context2.fillText("You Look OK", 10, 50);
        break;
      case -50:
        context2.fillStyle = 'black';
        context2.fillText("You Look Weird..", 10, 50);
        break;
    }
  }
}
drawLoop();                                             // drawLoop 関数をトリガー

//スタートボタン
start.addEventListener("click", function() {
  startcheck = true;
});

//クリックイベントリスナー : 目
eoption0.addEventListener("click", function() {
  eye_selection = "none";
});
//1.HAT - サングラス
eoption1.addEventListener("click", function() {
  eye_selection = "sun";
  if(hat_selection == "bheadphone" && acc_selection == "cigar"){
    score = 100;
   }
   else if(hat_selection == "bheadphone" || acc_selection == "cigar"){
    score = 50;
   }else if(cheek_selection !== "none"){
    score = -50;
   }else{
    score =0;
   }
});
//1.HAT - 青眼鏡
eoption2.addEventListener("click", function() {
  eye_selection = "blue";
});
//1.HAT - 赤いカラコン
eoption3.addEventListener("click", function() {
  eye_selection = "red";
  if(hat_selection == "bunny" && acc_selection == "nose" && cheek_selection !== "none"){
    score = 150;
  }else if(hat_selection == "bunny" && acc_selection == "nose"){
    score = 100;
   }
   else if(hat_selection == "bunny" || acc_selection == "nose"){
    score = 50;
   }else{
    score =0;
   }
});
//1.HAT - まつ毛
eoption4.addEventListener("click", function() {
  eye_selection = "eyelash";
  if(hat_selection == "crown" && acc_selection == "jewel"){
    score = 100;
   }
   else if(hat_selection == "crown" || acc_selection == "jewel"){
    score = 50;
   }else if(acc_selection == "mustache"){
    score = -50;
   }else{
    score =0;
   }
});
//クリックイベントリスナー : 帽子
haption0.addEventListener("click", function() {
  hat_selection = "none";
});
haption1.addEventListener("click", function() {
  hat_selection = "bunny";
  if(eye_selection == "red" && acc_selection == "nose" && cheek_selection !== "none"){
    score = 150;
  }else if(eye_selection == "red" && acc_selection == "nose"){
    score = 100;
   }
   else if(eye_selection == "red" || acc_selection == "nose"){
    score = 50;
   }else{
    score =0;
   }
});
haption2.addEventListener("click", function() {
  hat_selection = "bheadphone";
  if(eye_selection == "sun" && acc_selection == "cigar"){
    score = 100;
   }
   else if(eye_selection == "sun" || acc_selection == "cigar"){
    score = 50;
   }else if(cheek_selection !== "none"){
    score = -50;
   }else{
    score =0;
   }
});
haption3.addEventListener("click", function() {
  hat_selection = "hat";
});
haption4.addEventListener("click", function() {
  hat_selection = "crown";
  if(eye_selection == "eyelash" && acc_selection == "jewel"){
    score = 100;
   }else if(eye_selection == "eyelash" || acc_selection == "jewel"){
    score = 50;
   }else if(acc_selection !== "none" && acc_selection !== "jewel"){
    score = -50;
   }else{
    score =0;
   }
});
//クリックイベントリスナー : 小物
aoption0.addEventListener("click", function() {
  acc_selection = "none";
});
aoption1.addEventListener("click", function() {
  acc_selection = "mustache";
});
aoption2.addEventListener("click", function() {
  acc_selection = "nose";
  if(eye_selection == "red" && hat_selection == "bunny" && cheek_selection !== "none"){
    score = 150;
  }else if(eye_selection == "red" && hat_selection == "bunny"){
    score = 100;
  }else if(eye_selection == "red" || hat_selection == "bunny"){
    score = 50;
  }else{
    score =0;
  }
});
aoption3.addEventListener("click", function() {
  acc_selection = "cigar";
  if(hat_selection == "bheadphone" && eye_selection == "sun"){
    score = 100;
   }
   else if(hat_selection == "bheadphone" || eye_selection == "sun"){
    score = 50;
   }else if(cheek_selection !== "none"){
    score = -50;
   }else{
    score =0;
   }
});
aoption4.addEventListener("click", function() {
  acc_selection = "jewel";
  if(eye_selection == "eyelash" && hat_selection == "crown"){
    score = 100;
   }else if(eye_selection == "eyelash" || hat_selection == "crown"){
    score = 50;
   }else{
    score =0;
   }
});
//クリックイベントリスナー : チーク
coption0.addEventListener("click", function() {
  cheek_selection = "none";
});
coption1.addEventListener("click", function() {
  cheek_selection = "orange";
  if(eye_selection == "sun" && hat_selection == "bheadphone" && acc_selection=="cigar"){
    score = -50;
   }

  if(eye_selection == "red" && hat_selection == "bunny" && acc_selection == "nose"){
    score = 150;
  }else if(eye_selection == "red" && hat_selection == "bunny" || eye_selection == "red" && acc_selection == "nose" || hat_selection == "bunny" && acc_selection == "nose" ){
    score = 100;
  }else if(eye_selection == "red" || hat_selection == "bunny" || acc_selection == "nose"){
    score = 50;
  }else{
    score =0;
  }
});
coption2.addEventListener("click", function() {
  cheek_selection = "brown";
  if(eye_selection == "sun" && hat_selection == "bheadphone" && acc_selection=="cigar"){
    score = -50;
   }
  
  if(eye_selection == "red" && hat_selection == "bunny" && acc_selection == "nose"){
    score = 150;
  }else if(eye_selection == "red" && hat_selection == "bunny" || eye_selection == "red" && acc_selection == "nose" || hat_selection == "bunny" && acc_selection == "nose" ){
    score = 100;
  }else if(eye_selection == "red" || hat_selection == "bunny" || acc_selection == "nose"){
    score = 50;
  }else{
    score =0;
  }
});
coption3.addEventListener("click", function() {
  cheek_selection = "red";
  if(eye_selection == "sun" && hat_selection == "bheadphone" && acc_selection=="cigar"){
    score = -50;
   }
  if(eye_selection == "red" && hat_selection == "bunny" && acc_selection == "nose"){
    score = 150;
  }else if(eye_selection == "red" && hat_selection == "bunny" || eye_selection == "red" && acc_selection == "nose" || hat_selection == "bunny" && acc_selection == "nose" ){
    score = 100;
  }else if(eye_selection == "red" || hat_selection == "bunny" || acc_selection == "nose"){
    score = 50;
  }else{
    score =0;
  }
});
coption4.addEventListener("click", function() {
  cheek_selection = "lip";
});

savebutton.addEventListener("click", function() {
  console.log("working");
  window.open('', document.getElementById('canvas').toDataURL());
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