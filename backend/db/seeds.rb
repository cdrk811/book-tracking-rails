# frozen_string_literal: true

# generate_users
users_data = [
  { email: 'cedrick@friendly.com', password: BCrypt::Password.create('qwer4321'), username: 'cdrk' },
  { email: 'elai@friendly.com', password: BCrypt::Password.create('qwer4321'), username: 'elai' },
  { email: 'marco@friendly.com', password: BCrypt::Password.create('qwer4321'), username: 'marco' },
  { email: 'nard@friendly.com', password: BCrypt::Password.create('qwer4321'), username: 'nard' },
]

users_data.each do |user|
  object = User.find_or_initialize_by(email: user[:email])
  object.encrypted_password = user[:password]
  object.username = user[:username]
  object.save(validate: false)
  puts "find or create user id: #{object.id},
                            email: #{object.email},
                            username: #{object[:username]}"
end

# generate_categories
categories_data = [
  { name: 'Fantasy', description: 'Magic, mythical creatures, and supernatural elements' },
  { name: 'Science Fiction', description: 'Futuristic, space, time travel, or advanced technology' },
  { name: 'Mystery', description: 'Crime, detective stories, and whodunit narratives' },
  { name: 'Thriller', description: 'Fast-paced, suspenseful, and action-driven' },
  { name: 'Horror', description: 'Supernatural, psychological fear, and eerie elements' },
  { name: 'Romance', description: 'Love stories, relationships, and emotional journeys' },
  { name: 'Historical Fiction', description: 'Stories set in past historical periods' },
  { name: 'Drama', description: 'Emotional and character-driven stories' },
  { name: 'Adventure', description: 'Explorations, journeys, and daring escapades' },
  { name: 'Dystopian', description: 'Oppressive societies, post-apocalyptic themes' },
  { name: 'Crime', description: 'Stories revolving around criminal activities' },
  { name: 'Magical Realism', description: 'A mix of reality and magical elements' },
  { name: 'Biography', description: 'Life stories of real people' },
  { name: 'Autobiography', description: 'A person\'s own life story' },
  { name: 'Memoir', description: 'Personal reflections and experiences' },
  { name: 'Self-Help', description: 'Books focused on personal growth' },
  { name: 'Philosophy', description: 'Deep thoughts on life, ethics, and existence' },
  { name: 'Psychology', description: 'Human behavior and the mind' },
  { name: 'Science & Technology', description: 'Scientific concepts and discoveries' },
  { name: 'Health & Wellness', description: 'Nutrition, mental health, and fitness' },
  { name: 'Business & Finance', description: 'Entrepreneurship, leadership, and money management' },
  { name: 'History', description: 'Events, civilizations, and historical figures' },
  { name: 'True Crime', description: 'Real-life criminal cases' },
  { name: 'Travel', description: 'Exploring cultures, places, and experiences' },
  { name: 'Children’s Fiction', description: 'Simple stories for kids' },
  { name: 'Young Adult (YA)', description: 'Coming-of-age stories for teens' },
  { name: 'Middle-Grade Fiction', description: 'Books for preteens' },
  { name: 'Fairy Tales & Folklore', description: 'Classic myths and legends' }
]

categories_data.each do |category_genre|
  object = Category.where(name: category_genre[:name]).first_or_initialize
  object.save
  puts "find or create category genre id: #{object.id},
                              name: #{object.name}"
end

# generate books data
books_data = [
  { title: 'Book 1', description: 'This is book 1', book_image: 'book1.jpg', author_avatar: 'author1.jpg', author_name: 'Author 1', pages: '200', categories: ['Science Fiction', 'Adventure'], username: 'cdrk' },
  { title: 'Book 2', description: 'This is book 2', book_image: 'book2.jpg', author_avatar: 'author2.jpg', author_name: 'Author 2', pages: '230', categories: ['History', 'Travel'], username: 'elai' }
]

books_data.each do |book_data|
  book = Book.where(title: book_data[:title]).first_or_initialize
  book.description = book_data[:description]
  book.book_image = book_data[:book_image]
  book.author_avatar = book_data[:author_avatar]
  book.author_name = book_data[:author_name]
  book.pages = book_data[:pages]
  book.user = User.find_by(username: book_data[:username])
  book.save

  # Associate categories (Many-to-Many)
  book_data[:categories].each do |category_name|
    category = Category.find_by(name: category_name)
    book.categories << category if category && !book.categories.include?(category)
  end

  puts "find or create book id: #{book.id},
                            title: #{book.title},
                            description: #{book.description},
                            author_name: #{book.author_name},
                            pages: #{book.pages}"

  puts "create or update Categories: #{book.categories.pluck(:name).join(', ')}"
end