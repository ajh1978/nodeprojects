CREATE DATABASE IF NOT EXISTS sessionDb;
USE sessionDb;

CREATE TABLE IF NOT EXISTS sessions (
  session_id VARCHAR(128) COLLATE utf8mb4_bin NOT NULL,
  expires INT(11) UNSIGNED NOT NULL,
  data TEXT COLLATE utf8mb4_bin,
  PRIMARY KEY (session_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS User (
  username VARCHAR(45) NOT NULL PRIMARY KEY,
  userpassword VARCHAR(20) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'user'
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS UserSession (
  sessionId VARCHAR(128) COLLATE utf8mb4_bin PRIMARY KEY,
  username VARCHAR(45) NOT NULL,
  FOREIGN KEY (sessionId) REFERENCES sessions (session_id)
    ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE user IF NOT EXISTS 'server'@'localhost' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON sessionDb.* TO 'server'@'localhost';
