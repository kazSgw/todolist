$(loaded);

function loaded() {
    showText();
    // ボタンをクリックしたときに実行するイベントを設定する
    $("#formButton").click(
	// コールバックとしてメソッドを引数にわたす
	function() {
	    saveText();
	    showText();
	});
    
    $("#deleteButton").click(
	function() {
	    localStorage.clear();
	    showText();
	});



    ////////////////ugokanaiyo
    $("p").click(
	// [TODO]と[DONE]をトグルする
	function() {
	    var key, value, jsonVal;
	    for(var i=0, len=localStorage.length; i<len; i++) {
		key = localStorage.key(i);
		value = JSON.parse( localStorage.getItem(key) );
		if($(this).text.substr(7) === value[1]){
		    value[0] = !value[0];
		    // JSON化してアップデート
		    jsonVal = JSON.stringify(value);
		    localStorage.setItem(key, jsonVal);
		    break;
		}
	    }
	    showText();
	});
}////////////////ugokanaiyo





// 入力された内容をローカルストレージに保存する
function saveText() {
    // 時刻をキーにして入力されたテキストを保存する
    var text = $("#formText");
    var time = new Date();
    var val = [true, text.val()]; /* TODO:true, DONE:false */
    var jsonVal;
    // 入力チェックをしてからローカルストレージに保存する
    if(checkText(val[1])) {
	jsonVal = JSON.stringify(val);
	localStorage.setItem(time, jsonVal);
	// テキストボックスを空にする
	text.val("");
    }
}

// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $("#list");
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value, html = [];
  var concat;
  for(var i=0, len=localStorage.length; i<len; i++) {
    /*--------------------------------------------------------------
      value[0]    value[1]             //=> What you see
      e.g)
      ture        "Wash the dishes"    //=> [TODO] Wash the dishes
      false       "Take a shower"      //=> [DONE] Take a shower
     --------------------------------------------------------------*/
    key = localStorage.key(i);
    value = JSON.parse( localStorage.getItem(key) );
    // 表示する前にエスケープ
    concat = (value[0] ? '[TODO] ':'[DONE] ') + value[1];
    console.log(concat);
    html.push( $("<p>").html(escapeText(concat)));
    // html.push($("<p>").text(value));
  }
  list.append(html.reverse());
}



////////////////ugokanaiyo
// [TODO]と[DONE]をトグルする
function toggleStatus(func) {
    var key, value, jsonVal;
    for(var i=0, len=localStorage.length; i<len; i++) {
	key = localStorage.key(i);
	value = JSON.parse( localStorage.getItem(key) );
	if($(this).text.substr(7) === value[1]){
	    value[0] = !value[0];
	    // JSON化してアップデート
	    jsonVal = JSON.stringify(value);
	    localStorage.setItem(key, jsonVal);
	    break;
	}
    }
    showText();
}////////////////ugokanaiyo

// 文字をエスケープする
function escapeText(text) {
  var TABLE_FOR_ESCAPE_HTML = {
    "&": "&amp;",
    "\"": "&quot;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return text.replace(/[&"<>]/g, function(match) {
    return TABLE_FOR_ESCAPE_HTML[match];
  });
}

// 入力チェックを行う
function checkText(text) {
  // 文字数が0または20以上は不可
  if (0 === text.length || 20 < text.length) {
    alert("文字数は1〜20字にしてください");
    return false;
  }

  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  // すべてのチェックを通過できれば可
  return true;
}
