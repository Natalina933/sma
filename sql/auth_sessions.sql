-- SMA-FIX-02A-06: prepare ONLY. Do not execute on a real database without approval.
-- No foreign keys until legacy usr_users/adh_members identifiers and engines are reviewed.
CREATE TABLE IF NOT EXISTS auth_sessions (
  id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL PRIMARY KEY,
  account_id VARCHAR(64) NOT NULL,
  account_role ENUM('admin', 'member') NOT NULL,
  expires_at DATETIME NOT NULL,
  revoked_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_auth_sessions_account (account_id, account_role, revoked_at),
  INDEX idx_auth_sessions_expiry (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
