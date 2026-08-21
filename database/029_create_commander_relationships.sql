CREATE TABLE IF NOT EXISTS commander_relationships (
    relationship_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    commander_id INT UNSIGNED NOT NULL,
    relationship_type VARCHAR(50) NOT NULL,
    related_commander_id INT UNSIGNED NULL,

    PRIMARY KEY (relationship_id),

    UNIQUE KEY uq_commander_relationship (
        commander_id,
        relationship_type,
        related_commander_id
    ),

    KEY idx_relationship_commander (
        commander_id
    ),

    KEY idx_relationship_type (
        relationship_type
    ),

    KEY idx_relationship_related_commander (
        related_commander_id
    ),

    CONSTRAINT fk_relationship_commander
        FOREIGN KEY (commander_id)
        REFERENCES commanders(commander_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_relationship_related_commander
        FOREIGN KEY (related_commander_id)
        REFERENCES commanders(commander_id)
        ON DELETE CASCADE
);