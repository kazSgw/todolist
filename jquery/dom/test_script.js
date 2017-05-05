//読み込み完了時に実行する関数を指定
$(loaded);

function loaded(){
  //ボタンタグをクリックしたときの動作を指定
  $("button").click(change_text);
}

function change_text(){
    //IDがmessageの要素のテキストを書き換え
    // $("#message").text("こんばんは");

    var messages = ["おはよう", "こんにちは", "こんばんは", "おやすみ"];
    $.each(messages, function(index, value) {
	$("body").append($("<p>").text(value));
    });

    $("p").each(function(index, value) {
	console.log( $(value).text() );

    });


    // $("body").append($("<p>").text("おはよう"));
    // $("body").append($("<p>").text("こんにちは"));
    // $("body").append($("<p>").text("おやすみ"));

    $("#message").remove();
    
}

