ALTER TABLE match_players
ADD COLUMN secondary_commander_id INT UNSIGNED NULL
AFTER deck_id;