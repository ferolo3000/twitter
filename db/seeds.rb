# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  { username: 'tommy', email: 'tommy@test.com', password: 'password' },
  { username: 'bobby', email: 'bobby@test.com', password: 'password' },
  { username: 'sarah', email: 'sarah@test.com', password: 'password' },
])

tweets = Tweet.create([
  {
    message: "Life is good",
    user: users.first
  },
  {
    message: "Life is life",
    user: users.second
  },
  {
    message: "Hello there",
    user: users.third
  },
  ])
