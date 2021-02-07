class PostsController < ApplicationController
  def index
    @posts=Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    # ルーティングでposts/:idとしたためidで受け取る
    post = Post.find(params[:id])
    if post.checked
      # checkedカラムをfalseへ
      post.update(checked: false)
    else
      # checkedカラムをtrueへ
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    # JSON形式にしてcheck.jsに返す
    render json: { post: item }
  end
end
