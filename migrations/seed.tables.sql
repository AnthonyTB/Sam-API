BEGIN;

    TRUNCATE
  "users",
  "state-reviews",
  "food-reviews";

    INSERT INTO "users"
        ("Username", "Name", "Password")
    VALUES
        (
            'sam',
            'sam',
            -- password = "pass"
            '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

    INSERT INTO "food-reviews"
        ("State","City", "Title", "Description", "Date_Created", "Rated", "Images", "LocationId", "Created_By")
    VALUES
        ( 'Washington', 'Sammamish', 'Pine Lake', 'really good food', now(), 4, ARRAY
    ['https://chroniccravings.files.wordpress.com/2015/02/pine-lake-ale-house-fish-and-chips.jpg?w=288&h=288&crop=1'], '4', 'sam'),
    ( 'Indiana', 'Anderson', 'Ninja', 'really good food', now
    (), 4,ARRAY ['https://chroniccravings.files.wordpress.com/2015/02/pine-lake-ale-house-fish-and-chips.jpg?w=288&h=288&crop=1'], '4', 'sam');

INSERT INTO "state-reviews"
    ("State", "City", "Description", "Date_Created", "Rated", "Images", "LocationId", "Created_By")
VALUES
    ( 'Washington', 'Sammamish', 'really nice place', now(), 5, ARRAY
['https://chroniccravings.files.wordpress.com/2015/02/pine-lake-ale-house-fish-and-chips.jpg?w=288&h=288&crop=1'], '4', 'sam'),
( 'Indiana', 'Anderson', 'really nice place', now
(), 5, ARRAY ['https://chroniccravings.files.wordpress.com/2015/02/pine-lake-ale-house-fish-and-chips.jpg?w=288&h=288&crop=1'], '4', 'sam');

COMMIT;