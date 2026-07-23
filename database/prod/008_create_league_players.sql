USE mtg_league_prod;

CREATE TABLE league_players (

    league_player_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    league_id INT UNSIGNED NOT NULL,

    player_id INT UNSIGNED NOT NULL,

    league_role VARCHAR(50) NOT NULL DEFAULT 'PLAYER',

    membership_status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',

    joined_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(league_player_id),

    UNIQUE KEY uk_league_player(league_id, player_id),

    INDEX idx_league_players_league(league_id),

    INDEX idx_league_players_player(player_id),

    CONSTRAINT fk_league_players_league
        FOREIGN KEY(league_id)
        REFERENCES leagues(league_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_league_players_player
        FOREIGN KEY(player_id)
        REFERENCES players(player_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;