class PostsController < ApplicationController
  def index
    @posts=Post.all.order(id: "DESC")
  end

  def create
    # メモcreate時、未読の情報を保存
    post = Post.create(content: params[:content], checked: false)
    # レスポンスをJSONに変更
    render json:{ post: post }
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
