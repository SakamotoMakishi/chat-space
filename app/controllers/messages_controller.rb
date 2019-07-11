class MessagesController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
  end

  def edit
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [] )
  end


  
end
