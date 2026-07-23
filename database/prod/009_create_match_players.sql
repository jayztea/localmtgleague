USE mtg_league_prod;

CREATE TABLE matches (

    match_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    league_id INT UNSIGNED NOT NULL,

    match_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    game_length_minutes INT UNSIGNED NULL,

    notes TEXT NULL,

    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(match_id),

    INDEX idx_matches_league(league_id),

    CONSTRAINT fk_matches_league
        FOREIGN KEY(league_id)
        REFERENCES leagues(league_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;