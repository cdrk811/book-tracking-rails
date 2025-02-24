# frozen_string_literal: true

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