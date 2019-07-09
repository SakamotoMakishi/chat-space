class MessagesController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
    #@group = Group.find(params[:group_id])
  end

  def edit

  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  def set_group
    @group = Group.find(params[:id])
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [] )
  end

end
