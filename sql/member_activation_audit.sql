-- Preparatory DDL only. Do not execute on any shared/remote database.
CREATE TABLE IF NOT EXISTS member_activation_audit (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  admin_id INT NOT NULL,
  event_type ENUM('issued', 'rate_limited') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_activation_audit_rate (member_id, event_type, created_at),
  INDEX idx_activation_audit_admin (admin_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
