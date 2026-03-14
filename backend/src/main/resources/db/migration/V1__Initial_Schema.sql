-- Initial Database Schema for Movie App
-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role VARCHAR(50) DEFAULT 'USER',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Genres Table
CREATE TABLE IF NOT EXISTS genres (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Movies Table
CREATE TABLE IF NOT EXISTS movies (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    description TEXT,
    poster_path VARCHAR(500),
    year VARCHAR(4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Episodes Table
CREATE TABLE IF NOT EXISTS episodes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50),
    episode_number INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    movie_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    poster_path VARCHAR(500),
    created_at BIGINT DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::BIGINT * 1000,
    CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, movie_id)
);

-- Create Indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_movies_title ON movies(title);
CREATE INDEX idx_movies_genre ON movies(genre);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_genres_name ON genres(name);

-- Insert Sample Genres
INSERT INTO genres (name) VALUES 
    ('Action'),
    ('Adventure'),
    ('Animation'),
    ('Comedy'),
    ('Crime'),
    ('Documentary'),
    ('Drama'),
    ('Family'),
    ('Fantasy'),
    ('Horror'),
    ('Music'),
    ('Mystery'),
    ('Romance'),
    ('Science Fiction'),
    ('Thriller'),
    ('War'),
    ('Western')
ON CONFLICT (name) DO NOTHING;
