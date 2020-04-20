'use strict';

{
  /* 変数定義 */
  const name = document.getElementById('name');
  const rslt = document.getElementById('rslt');
  const dropdownMenu1 = document.getElementById('dropdownMenu1');
  const dropdownMenu2 = document.getElementById('dropdownMenu2');
  const dropdownMenu3 = document.getElementById('dropdownMenu3');
  const year = new Date().getFullYear();
  // ボタン
  const startBtn = document.getElementById('startBtn');
  const returnBtn = document.getElementById('returnBtn');
  const twitter = document.getElementById('twitter');

  // ドロップダウンの項目を変更
  $(function () {
    $('.dropdown-menu .dropdown-item').click(function () {
      var visibleItem = $('.dropdown-toggle', $(this).closest('.dropdown'));
      visibleItem.text($(this).attr('value'));
    });
  });

  // スタートボタン押下時処理
  startBtn.addEventListener('click', () => {
    let rsltText;

    // page切り替え
    document.getElementById('page1').classList.add("displayNone");
    document.getElementById('page2').classList.remove("displayNone");

    // 脳力計算
    rsltText = string_to_utf8_hex_string($('#name').val());
    // 結果テキスト書き換え
    rslt.textContent = rsltText;

    // ツイートボタン
    $('#twitter').prepend('<a id="twieetUrl" href="https://twitter.com/intent/tweet?url=/Users/junpei/Desktop/programing/05_LatentBrainPower/index.html&text=あなたの潜在脳力は' + rsltText + '！！" target="blank_">twieetする</a>');
  });

  // リターンボタン押下時処理
  returnBtn.addEventListener('click', () => {
    // page切り替え
    document.getElementById('page1').classList.remove("displayNone");
    document.getElementById('page2').classList.add("displayNone");

    // 脳力テキストの初期化
    rslt.textContent = '';
  });

  // チェック処理
  function inputCheck() {

  }

  // 年設定
  for (let i = year - 80; i <= year; i++) {
    $('#dropMenu').prepend('<a class="dropdown-item" value="' + i + '">' + i + '</a>');
  }

  /* ----- 脳力変換処理 ----- */
  function string_to_utf8_hex_string(text) {
    // 文字列→16進数→10進数変換
    var bytes1 = string_to_utf8_bytes(text);
    var hex_str1 = parseInt(bytes_to_hex_string(bytes1), 16);

    var hexSplit = hex_str1.toString().split('');
    var returnStr = 1;
    var birthday = 0;

    // 名前計算
    for (let i = 0; i < hexSplit.length; i++) {
      if (hexSplit[i].toString().match(/[1-9]/)) {
        returnStr = returnStr * parseInt(hexSplit[i], 10);
      }
    }

    // 年月日
    birthday = (parseInt(dropdownMenu1.textContent)
               + parseInt(dropdownMenu2.textContent)
               + parseInt(dropdownMenu3.textContent)).toString().slice(-1);

    return returnStr / birthday;
  }
  // 文字列をUTF8のバイト配列に変換
  function string_to_utf8_bytes(text) {
    var result = [];
    if (text == null)
      return result;
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      if (c <= 0x7f) {
        result.push(c);
      } else if (c <= 0x07ff) {
        result.push(((c >> 6) & 0x1F) | 0xC0);
        result.push((c & 0x3F) | 0x80);
      } else {
        result.push(((c >> 12) & 0x0F) | 0xE0);
        result.push(((c >> 6) & 0x3F) | 0x80);
        result.push((c & 0x3F) | 0x80);
      }
    }
    return result;
  }
  // バイト配列を16進文字列に変換
  function bytes_to_hex_string(bytes) {
    var result = "";

    for (var i = 0; i < bytes.length; i++) {
      result += byte_to_hex(bytes[i]);
    }
    return result;
  }
  // バイト値を16進文字列に変換
  function byte_to_hex(byte_num) {
    var digits = (byte_num).toString(16);
    if (byte_num < 16) return '0' + digits;
    return digits;
  }
  /* ------------------------ */

  // /* 変数定義 */
  // const startBtn = document.getElementById('startBtn');
  // const stopBtn = document.getElementById('stopBtn');
  // const cancelBtn = document.getElementById('cancelBtn');
  // const dropDown1 = document.getElementById('dropdownMenu1');
  // const dropDown2 = document.getElementById('dropdownMenu2');
  // const workText = document.getElementById('work');
  // const timer = document.getElementById('timer');

  // let startTime;
  // let timeoutId;
  // let elapsedTime = 0;
  // let count;
  // let workFlg = true; // true = WORK  ,  false = INTERVAL
  // let count1 = true;
  // let count2 = true;
  // let count3 = true;


  // // ドロップダウンの項目を変更
  // $(function () {
  //   $('.dropdown-menu .dropdown-item').click(function () {
  //     var visibleItem = $('.dropdown-toggle', $(this).closest('.dropdown'));
  //     visibleItem.text($(this).attr('value'));
  //   });
  // });

  // // スタートボタン押下時処理
  // startBtn.addEventListener('click', () => {
  //   // page切り替え
  //   document.getElementById('page1').classList.add("displayNone");
  //   document.getElementById('page2').classList.remove("displayNone");

  //   startTime = Date.now();
  //   countDown();
  // });

  // // 一時停止ボタン押下時処理
  // stopBtn.addEventListener('click', () => {
  //   if (stopBtn.textContent == '一時停止') {
  //     clearTimeout(timeoutId);
  //     elapsedTime += startTime - Date.now();
  //     stopBtn.textContent = 'スタート'
  //   } else {
  //     stopBtn.textContent = '一時停止'
  //     startTime = Date.now();
  //     countDown();
  //   }

  // });

  // // キャンセルボタン押下時処理
  // cancelBtn.addEventListener('click', () => {
  //   // page切り替え
  //   document.getElementById('page1').classList.remove("displayNone");
  //   document.getElementById('page2').classList.add("displayNone");

  //   // 初期化
  //   count1 = true;
  //   count2 = true;
  //   count3 = true;
  //   elapsedTime = 0;
  //   workText.textContent = 'WORK';
  //   stopBtn.textContent = '一時停止'

  //   clearTimeout(timeoutId);
  //   workFlg = true;
  // });

  // // カウントダウン用関数
  // function countDown() {
  //   if (workFlg == true) {
  //     count = 60000 * parseInt(dropDown1.textContent);
  //   } else {
  //     count = 60000 * parseInt(dropDown2.textContent);
  //   }

  //   const d = new Date(startTime - Date.now()  + elapsedTime + count);
  //   const m = String(d.getMinutes()).padStart(2, '0');
  //   const s = String(d.getSeconds()).padStart(2, '0');
  //   timer.textContent = `${m}:${s}`;

  //   // 残り3秒でカウントダウン音開始
  //   if (`${m}` == '00' && `${s}` == '03') {
  //     if (count3 == true) {
  //       document.getElementById( 'sound-file-decision1' ).play();
  //       count3 = false;
  //     }
  //   }
  //   if (`${m}` == '00' && `${s}` == '02') {
  //     if (count2 == true) {
  //       document.getElementById( 'sound-file-decision1' ).play();
  //       count2 = false;
  //     }
  //   }
  //   if (`${m}` == '00' && `${s}` == '01') {
  //     if (count1 == true) {
  //       document.getElementById( 'sound-file-decision1' ).play();
  //       count1 = false;
  //     }
  //   }

  //   // カウントが０になった時の処理
  //   if (`${m}` == '00' && `${s}` == '00') {
  //     // 初期化処理
  //     startTime = Date.now();
  //     elapsedTime = 0;
  //     // soundFlg = true;
  //     count1 = true;
  //     count2 = true;
  //     count3 = true;

  //     // 終了サウンド
  //     document.getElementById( 'sound-file-decision4' ).play();
  //     if (workFlg == true) {
  //       workFlg = false;
  //       workText.textContent = 'INTERVAL';
  //     } else {
  //       workFlg = true;
  //       workText.textContent = 'WORK';
  //     }
  //   }

  //   timeoutId = setTimeout(() => {
  //     countDown();
  //   }, 10);
  // }
}