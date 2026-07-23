ALTER TABLE matches
ADD COLUMN created_by_player_id INT UNSIGNED NOT NULL
AFTER league_id;

ALTER TABLE matches
ADD CONSTRAINT fk_matches_created_by_player
FOREIGN KEY (created_by_player_id)
REFERENCES players(player_id);