ALTER TABLE decks

ADD COLUMN bracket_level INT UNSIGNED NULL

AFTER power_level;

ALTER TABLE decks

ADD CONSTRAINT chk_deck_bracket_level

CHECK (
    bracket_level IS NULL
    OR
    (
        bracket_level >= 1
        AND bracket_level <= 5
    )
);