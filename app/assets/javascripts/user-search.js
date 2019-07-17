$(function() {

  var search_name = $("#user-search-result");  // 検索結果のビュー表示(インクリメンタルサーチ機能)
  function appendUser(user) {
      var html = `<div id="user-search-result">
                    <div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.name}</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">仲間に加える!</a>
                    </div>
                  </div>`
      search_name.append(html);
  }
  function appendNo_User_HTML(no_user_message){  // ユーザーが見つからない時のビュー表示
    var html = `  <div class="chat-group-user clearfix">
                    <p class="cha
                    t-group-user__name">${no_user_message}</p>
                  </div>`
    search_name.append(html);
  }
  var group_member = $('#chat-group-users');
  function appendGroup_user_HTML(user_id,user_name){  // ユーザー追加した後のビュー表示(削除機能)
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>追い出す！</div>
                </div>`
    group_member.append(html);
  }
    $(".chat-group-form__input").on("keyup", function() {  //ユーザーがボタンを押して離した瞬間の処理
      //非同期機能
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
            if(input.length !== 0) {
                  users.forEach(function(user){
                  appendUser(user);
                });
            };
        }
        else {
          appendNo_User_HTML("そんな人はおらん！！");
        }
      })
      .fail(function() {
        alert('んーエラーでーす！！！');
      })
    });
  $(document).on('click', '.user-search-add', function () {
  $('#chat-group-users').val(
  );
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    appendGroup_user_HTML(id,name);
    $(this).parent().remove();
  });

  $(document).on("click", ".user-search-remove", function () {
    $(this).parent().remove();
  });
});