USE mtg_league_prod;

CREATE TABLE account_types (
    account_type_id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    account_type_name VARCHAR(50) NOT NULL,

    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (account_type_id),

    UNIQUE KEY uk_account_types_name (account_type_name)

) ENGINE=InnoDB;