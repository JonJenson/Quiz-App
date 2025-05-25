CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100)
);
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
);
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    options TEXT[] NOT NULL,
    correct_answer INTEGER NOT NULL 
);
CREATE TABLE attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER REFERENCES attempts(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    selected_option INTEGER NOT NULL
);
