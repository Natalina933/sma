-- SMA-FIX-02A-15. Preparation ONLY: do not apply to a real database without approval.
-- Compatible types/engine and restoration plan must be verified first.
CREATE TABLE IF NOT EXISTS member_activation_invitations (
  member_id INT NOT NULL PRIMARY KEY,
  token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
