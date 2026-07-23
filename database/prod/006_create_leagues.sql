USE mtg_league_prod;

CREATE TABLE leagues (
    league_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    league_name VARCHAR(100) NOT NULL,

    created_by_user_id INT UNSIGNED NOT NULL,

    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(league_id),

    UNIQUE KEY uk_leagues_name(league_name),

    INDEX idx_leagues_created_by(created_by_user_id),

    CONSTRAINT fk_leagues_created_by_user
        FOREIGN KEY(created_by_user_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB;