USE mtg_league_prod;

CREATE TABLE players (
    player_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    user_id INT UNSIGNED NULL,

    display_name VARCHAR(100) NOT NULL,

    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(player_id),

    UNIQUE KEY uk_players_display_name(display_name),

    INDEX idx_players_user(user_id),

    CONSTRAINT fk_players_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

) ENGINE=InnoDB;