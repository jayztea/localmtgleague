USE mtg_league;

CREATE TABLE users (
    user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    email_address VARCHAR(255) NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    account_type_id INT UNSIGNED NOT NULL,

    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(user_id),

    UNIQUE KEY uk_users_email(email_address),

    INDEX idx_users_account_type(account_type_id),

    CONSTRAINT fk_users_account_type
        FOREIGN KEY(account_type_id)
        REFERENCES account_types(account_type_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB;