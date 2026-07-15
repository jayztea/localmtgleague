CREATE TABLE decks (

    deck_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    player_id INT UNSIGNED NOT NULL,

    commander_id INT UNSIGNED NOT NULL,

    deck_name VARCHAR(100) NOT NULL,

    color_identity VARCHAR(10) NULL,

    power_level DECIMAL(3,1) NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_date DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    modified_date DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (deck_id),

    CONSTRAINT fk_decks_player
        FOREIGN KEY (player_id)
        REFERENCES players(player_id),

    CONSTRAINT fk_decks_commander
        FOREIGN KEY (commander_id)
        REFERENCES commanders(commander_id)

);

CREATE INDEX idx_decks_player
ON decks(player_id);

CREATE INDEX idx_decks_commander
ON decks(commander_id);