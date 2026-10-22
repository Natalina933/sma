-- SMA-FIX-02A-03: prepare only; DO NOT apply to any remote database without approval.
-- Preflight: compare the actual adh_members schema with the application's expected
-- password/role columns before enabling member registration.
CREATE TABLE IF NOT EXISTS member_email_verifications (
  member_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
  token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NULL,
  expires_at DATETIME NULL,
  verified_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_member_verification_token_hash (token_hash)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- No foreign key is added: the historical adh_members dump uses MyISAM.
-- Cleanup and data reconciliation require a separate, approved migration.
