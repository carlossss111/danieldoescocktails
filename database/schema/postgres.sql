
-- DanielDoesCocktails DB Version 2.0

-- SCHEMA 

CREATE TABLE db_version (
    version VARCHAR(16),
    create_time TIMESTAMP,
    last_update_time TIMESTAMP
);

CREATE TABLE cocktails (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    image_path VARCHAR(256) NOT NULL,
    ingredients VARCHAR(1024) NOT NULL,
    description VARCHAR(1024) NOT NULL,
    date TIMESTAMP NOT NULL
);

CREATE TABLE travel_cocktails (
    id SERIAL PRIMARY KEY,
    name varchar(256) NOT NULL,
    image_path varchar(255) NOT NULL,
    location varchar(256) NOT NULL,
    description varchar(1024) NOT NULL,
    date TIMESTAMP NOT NULL
);

-- PERFORMANCE INDICES

CREATE INDEX idx_cocktails_date ON cocktails (date DESC);
CREATE INDEX idx_travel_cocktails_date ON travel_cocktails (date DESC);

-- DEFAULT VALUES

INSERT INTO db_version (version, create_time, last_update_time) VALUES ('2.0', now()::timestamp, now()::timestamp);

