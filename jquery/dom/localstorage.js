//読み込み完了時に実行する関数を指定
$(loaded);

function loaded(){
  //ボタンタグをクリックしたときの動作を指定
  $("button").click(change_text);
}

function change_text(){

    // messageというキーに「こんにちはlocalStorage」という値を保存
    localStorage.setItem("message", "こんにちはlocalStorage");

    // messageというキーに保存した値を取得して表示
    localStorage.getItem("message");

    // $("#message").remove();
    
}

