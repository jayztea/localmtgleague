CREATE INDEX idx_match_audit_log_match
ON match_audit_log(match_id);


CREATE INDEX idx_match_audit_log_player
ON match_audit_log(changed_by_player_id);


CREATE INDEX idx_match_audit_log_date
ON match_audit_log(created_date);