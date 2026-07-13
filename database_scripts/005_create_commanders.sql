USE mtg_league;

CREATE TABLE commanders (
    commander_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    commander_name VARCHAR(150) NOT NULL,

    color_identity VARCHAR(20) NULL,

    scryfall_id VARCHAR(50) NULL,

    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(commander_id),

    UNIQUE KEY uk_commanders_name(commander_name),

    UNIQUE KEY uk_commanders_scryfall(scryfall_id)

) ENGINE=InnoDB;