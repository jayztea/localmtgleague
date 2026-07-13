USE mtg_league;

CREATE TABLE match_players (

    match_player_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    match_id INT UNSIGNED NOT NULL,

    player_id INT UNSIGNED NOT NULL,

    commander_id INT UNSIGNED NOT NULL,

    is_winner BOOLEAN NOT NULL DEFAULT FALSE,

    starting_life INT NOT NULL DEFAULT 40,

    ending_life INT NULL,

    PRIMARY KEY(match_player_id),

    UNIQUE KEY uk_match_player(match_id, player_id),

    INDEX idx_match_players_match(match_id),

    INDEX idx_match_players_player(player_id),

    INDEX idx_match_players_commander(commander_id),

    CONSTRAINT fk_match_players_match
        FOREIGN KEY(match_id)
        REFERENCES matches(match_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_match_players_player
        FOREIGN KEY(player_id)
        REFERENCES players(player_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_match_players_commander
        FOREIGN KEY(commander_id)
        REFERENCES commanders(commander_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB;