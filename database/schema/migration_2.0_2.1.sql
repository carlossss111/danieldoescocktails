BEGIN;


-- Change ingredients string list to an actual list
ALTER TABLE cocktails ALTER COLUMN ingredients TYPE TEXT[] USING string_to_array(ingredients, '/');


COMMIT;

