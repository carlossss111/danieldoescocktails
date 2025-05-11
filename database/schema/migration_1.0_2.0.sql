BEGIN;


-- Create version table 
CREATE TABLE db_version (
    version VARCHAR(16),
    create_time TIMESTAMP,
    last_update_time TIMESTAMP
);
INSERT INTO db_version (version, create_time, last_update_time) VALUES ('2.0', now()::timestamp, now()::timestamp);

-- Removing cabinet page since I never updated it
DROP TABLE IF EXISTS cabinet;

-- Renaming
ALTER TABLE cocktail RENAME TO cocktails;
ALTER TABLE cocktails RENAME COLUMN image TO image_path;

-- Convert VARCHAR 'DD/MM/YY' to PostgreSQL timestamp
ALTER TABLE cocktails ALTER COLUMN date TYPE DATE using to_date(date, 'DD/MM/YY');


COMMIT;

