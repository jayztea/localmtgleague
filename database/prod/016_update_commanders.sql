ALTER TABLE commanders
DROP COLUMN scryfall_id;

ALTER TABLE commanders
ADD COLUMN scryfall_id VARCHAR(100) NOT NULL AFTER commander_id,
ADD COLUMN mana_cost VARCHAR(50) NULL,
ADD COLUMN mana_value DECIMAL(4,1) NULL,
ADD COLUMN type_line VARCHAR(255) NULL,
ADD COLUMN oracle_text TEXT NULL,
ADD COLUMN power VARCHAR(10) NULL,
ADD COLUMN toughness VARCHAR(10) NULL,
ADD COLUMN image_url VARCHAR(500) NULL,
ADD COLUMN scryfall_uri VARCHAR(500) NULL,
ADD COLUMN released_at DATE NULL,

ADD UNIQUE KEY uk_commanders_scryfall (scryfall_id);