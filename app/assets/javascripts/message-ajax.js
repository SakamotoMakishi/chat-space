$(function(){

  function messageHTML(message){
    var image = message.image ? `<img src= ${message.image} >` : "";
    var message_text = message.content ? `${message.content}` : "";
    var html = `<div class="message">
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

  $('#new_message').on('submit',function(e){
    e.preventDefault();
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
      var html = messageHTML(message);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      return false
    })
    .fail(function(){
      alert('メッサージを入力してください');
    })
    .always(function(){
      $('.submit').prop('disabled', false);
    })
  })
});
