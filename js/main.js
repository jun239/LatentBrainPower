'use strict';

{
  /* 変数定義 */
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

    try {
      if ($('#name').val() == '') {
        throw new Error('終了します');
      }

      // page切り替え
      document.getElementById('page1').classList.add("displayNone");
      document.getElementById('page2').classList.remove("displayNone");

      // 脳力計算
      rsltText = string_to_utf8_hex_string($('#name').val());
      // 結果テキスト書き換え
      if (rsltText.toString().match(/[a-zA-Z]/)) {
        rslt.textContent = '測定不能。。。';
      } else {
        rslt.textContent = rsltText;
      }

      // ツイートボタン
      $('#twitter').prepend('<a id="twieetUrl" href="https://twitter.com/intent/tweet?url=https://jun239.github.io/LatentBrainPower&text=あなたの潜在脳力はいくつ？？' + rsltText + '！！" target="blank_">twieetする</a>');

    } catch (e) {
      alert('名前を入力してね。');
    }
  });

  // リターンボタン押下時処理
  returnBtn.addEventListener('click', () => {
    // page切り替え
    document.getElementById('page1').classList.remove("displayNone");
    document.getElementById('page2').classList.add("displayNone");

    // 脳力テキストの初期化
    rslt.textContent = '';
    $('#name').val('');

    $("#twieetUrl").remove();
  });

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

}