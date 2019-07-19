$(function(){
  function messageHTML(message){
    var image = message.image ? `<img src= ${message.image} >` : "";  //message.imageにtrueならHTML要素、faiseなら空の値を代入。
    var message_text = message.content ? `${message.content}` : "";  // 同上 三項演算子
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-info">
                    <div class="upper-info__user">
                      ${message.name}
                    </div>
                    <div class="upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${message_text}
                    </p>
                      ${image}
                    </div>
                  </div>`
    return html;
  }
  //ーーーーーーーーーーーーーーーーーーーーーーーーーーーー非同期通信の記述ーーーーーーーーーーーーーーーーーーーーーーーーー
  $('#new_message').on('submit',function(e){
    e.preventDefault();     //submitされた処理を止める。
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = messageHTML(message);  //messageHTMLを変数でappendに渡す。↓
      $('.message_list').append(html)     //変数を受け取る。↑
      $('#new_message')[0].reset();  //text送信後入力した値を消す。
      $('.message_list').animate({ scrollTop: $('.message_list')[0].scrollHeight});  //メッセージ入力後スクロールで一番下まで戻す。
      return false
    })
    .fail(function(){
      alert('メッサージを入力してください');
    })
    .always(function(){ //リロードせずにSENDボタンを推せる
      $('.submit').prop('disabled', false);
    })
    //ーーーーーーーーーーーーーーーーーーーーーーーーーーーー自動更新の記述ーーーーーーーーーーーーーーーーーーーーーーーーー
    var reloadMessages = function(){
      var last_message_id = $('.message:last').data('message-id');//カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        $.ajax({
          url: "api/messages",//ルーティングを記述rake route参照
          type: 'GET',  //ルーティングを記述      rake route参照
          dataType: 'json',
          data: {last_id: last_message_id}   //dataオプションでリクエストに値を含める
        })
        .done(function(messages){
          var insertHTML = '';//追加するHTMLの入れ物を作る
            messages.forEach(function(message){//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
            insertHTML = messageHTML(message);//メッセージが入ったHTMLを取得
            $('.message_list').append(insertHTML);//メッセージを追加
            $('.message_list').animate({ scrollTop: $('.message_list')[0].scrollHeight});
          })
        })
        .fail(function() {
          alert('自動更新失敗しました！');
        })
      }
    setInterval(reloadMessages, 3000);
  });
});


