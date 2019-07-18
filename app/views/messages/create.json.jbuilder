#非同期通信のjbuilder
json.name    @message.user.name
json.content @message.content
json.date    @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image   @message.image.url
json.id      @message.id