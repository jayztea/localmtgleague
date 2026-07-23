USE mtg_league_prod;

CREATE TABLE league_settings (

    league_setting_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    league_id INT UNSIGNED NOT NULL,

    max_players INT UNSIGNED DEFAULT 10,

    max_tournaments_per_year INT UNSIGNED DEFAULT 5,

    subscription_tier VARCHAR(50) NOT NULL DEFAULT 'FREE',

    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(league_setting_id),

    UNIQUE KEY uk_league_settings_league(league_id),

    CONSTRAINT fk_league_settings_league
        FOREIGN KEY(league_id)
        REFERENCES leagues(league_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;