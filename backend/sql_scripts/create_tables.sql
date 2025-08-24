-- Create Users table
CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    display_name TEXT,
    profile_picture TEXT,
    email TEXT UNIQUE NOT NULL
);

-- Create Polls table
CREATE TABLE polls (
    poll_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    correct_id INT
    -- foreign key to poll_options intentionally left out to avoid circular dependency
);

-- Create Poll_Options table
CREATE TABLE poll_options (
    option_id SERIAL PRIMARY KEY,
    poll_id INT NOT NULL,
    str TEXT NOT NULL,
    CONSTRAINT fk_poll FOREIGN KEY (poll_id)
        REFERENCES polls(poll_id)
        ON DELETE CASCADE
);

-- Create User_Choices table
CREATE TABLE user_choices (
    user_id TEXT NOT NULL,
    poll_id INT NOT NULL,
    option_id INT NOT NULL,
    PRIMARY KEY (user_id, poll_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_poll_choice FOREIGN KEY (poll_id)
        REFERENCES polls(poll_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_option_choice FOREIGN KEY (option_id)
        REFERENCES poll_options(option_id)
        ON DELETE CASCADE
);

-- Indexes for faster queries
CREATE INDEX idx_user_choices_poll_id ON user_choices(poll_id);
CREATE INDEX idx_user_choices_option_id ON user_choices(option_id);
CREATE INDEX idx_user_choices_user_id ON user_choices(user_id);

-- Index for faster option lookups by poll
CREATE INDEX idx_poll_options_poll_id ON poll_options(poll_id);
