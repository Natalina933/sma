-- SMA-FIX-02A-12: TEST-ONLY reference schema. NEVER run against an existing site database.
-- Requires an independently isolated, disposable MySQL instance and explicit approval.
-- Contains no DROP, ALTER of legacy tables, or imported historical data.

CREATE DATABASE IF NOT EXISTS sma_recette_fictive_only CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sma_recette_fictive_only;

CREATE TABLE IF NOT EXISTS usr_users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(191) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','member','moderator') NOT NULL DEFAULT 'member',
  status ENUM('active','inactive','banned') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS adh_members (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  mail VARCHAR(191) NOT NULL UNIQUE,
  -- A member created manually from the admin area does not receive a password.
  password VARCHAR(255) NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'member',
  phone VARCHAR(20) NULL,
  address VARCHAR(255) NULL,
  complement VARCHAR(255) NULL,
  city VARCHAR(100) NULL,
  cp VARCHAR(10) NULL,
  date_of_birth DATE NULL,
  gender ENUM('Monsieur','Madame') NULL,
  profile_picture VARCHAR(255) NULL,
  membership_type ENUM('single','duo','family') DEFAULT 'single',
  membership_start DATE NULL,
  membership_end DATE NULL,
  payment_status ENUM('paid','pending','overdue') NULL,
  payment_method ENUM('card','paypal','cash','transfer') NULL,
  preferred_contact ENUM('email','phone','sms','none') NULL,
  newsletter_subscription TINYINT(1) DEFAULT 1,
  last_login TIMESTAMP NULL,
  referred_by INT NULL,
  status ENUM('actif','inactif') NOT NULL DEFAULT 'actif',
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS member_email_verifications (
  member_id INT NOT NULL PRIMARY KEY,
  token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NULL UNIQUE,
  expires_at DATETIME NULL,
  verified_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_recette_verification_member FOREIGN KEY (member_id) REFERENCES adh_members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS auth_sessions (
  id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL PRIMARY KEY,
  account_id VARCHAR(64) NOT NULL,
  account_role ENUM('admin','member') NOT NULL,
  expires_at DATETIME NOT NULL,
  revoked_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_auth_sessions_account (account_id, account_role, revoked_at),
  INDEX idx_auth_sessions_expiry (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS member_activation_invitations (
  member_id INT NOT NULL PRIMARY KEY,
  token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_recette_activation_member FOREIGN KEY (member_id) REFERENCES adh_members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS member_activation_audit (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  admin_id INT NOT NULL,
  event_type ENUM('issued', 'rate_limited') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_activation_audit_rate (member_id, event_type, created_at),
  INDEX idx_activation_audit_admin (admin_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
