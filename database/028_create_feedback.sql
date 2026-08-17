CREATE TABLE feedback (
    feedback_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    feedback_type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    admin_notes TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_feedback_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    INDEX idx_feedback_user_id (user_id),
    INDEX idx_feedback_status (status),
    INDEX idx_feedback_priority (priority)
);