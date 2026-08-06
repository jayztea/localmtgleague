DROP TABLE IF EXISTS match_audit_log;


CREATE TABLE match_audit_log (

    audit_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,


    match_id INT UNSIGNED NOT NULL,


    action VARCHAR(50) NOT NULL,


    changed_by_player_id INT UNSIGNED NOT NULL,


    old_values JSON NULL,


    new_values JSON NULL,


    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_match_audit_log_match

        FOREIGN KEY (match_id)

        REFERENCES matches(match_id),


    CONSTRAINT fk_match_audit_log_player

        FOREIGN KEY (changed_by_player_id)

        REFERENCES players(player_id)

);