CREATE TABLE password_reset_tokens (

    token_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL,

    token_hash VARCHAR(255) NOT NULL,

    expires_date DATETIME NOT NULL,

    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    used_date DATETIME NULL,


    CONSTRAINT fk_password_reset_user

        FOREIGN KEY (user_id)

        REFERENCES users(user_id)

        ON DELETE CASCADE,


    INDEX idx_password_reset_token_hash(token_hash),

    INDEX idx_password_reset_user(user_id)

);