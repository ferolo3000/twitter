class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def user
    @data = { username_id: params[:username] }.to_json
    puts "----------------------------------"
    puts @data
    render 'user'
  end
  
end
