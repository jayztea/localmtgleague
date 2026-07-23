ALTER TABLE match_players
DROP FOREIGN KEY fk_match_players_commander;

ALTER TABLE match_players
DROP COLUMN commander_id,
DROP COLUMN is_winner;

ALTER TABLE match_players
ADD COLUMN deck_id INT UNSIGNED NOT NULL AFTER player_id,
ADD COLUMN finish_position INT NULL AFTER deck_id;

ALTER TABLE match_players
ADD CONSTRAINT fk_match_players_deck
FOREIGN KEY (deck_id)
REFERENCES decks(deck_id);