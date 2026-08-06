-- ============================================================================
-- Local Magic League
-- Migration: 025_match_editing_phase1.sql
--
-- Description:
-- Adds metadata required to support:
--   • Match editing
--   • Soft deletion
--   • Future audit history
--
-- Author: James Marchant
-- ============================================================================

START TRANSACTION;

-- ============================================================================
-- Add match metadata columns
-- ============================================================================

ALTER TABLE matches
    ADD COLUMN updated_date DATETIME NULL AFTER created_date,

    ADD COLUMN updated_by_player_id INT UNSIGNED NULL
        AFTER updated_date,

    ADD COLUMN deleted_date DATETIME NULL
        AFTER updated_by_player_id,

    ADD COLUMN deleted_by_player_id INT UNSIGNED NULL
        AFTER deleted_date;

-- ============================================================================
-- Foreign Keys
-- ============================================================================

ALTER TABLE matches
    ADD CONSTRAINT fk_matches_updated_by_player
        FOREIGN KEY (updated_by_player_id)
        REFERENCES players(player_id),

    ADD CONSTRAINT fk_matches_deleted_by_player
        FOREIGN KEY (deleted_by_player_id)
        REFERENCES players(player_id);

-- ============================================================================
-- Helpful indexes
-- ============================================================================

CREATE INDEX idx_matches_deleted_date
ON matches(deleted_date);

CREATE INDEX idx_matches_updated_date
ON matches(updated_date);

COMMIT;