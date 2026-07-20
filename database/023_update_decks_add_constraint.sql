ALTER TABLE decks
ADD CONSTRAINT unique_player_commander
UNIQUE(player_id, commander_id);