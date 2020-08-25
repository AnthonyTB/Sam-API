CREATE TABLE "food-reviews"
(
    "Id" SERIAL PRIMARY KEY,
    "State" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Date_Created" TEXT NOT NULL,
    "Rated" TEXT NOT NULL,
    "Images" TEXT
    [],
    "LocationId" TEXT,
    "Created_By" TEXT NOT NULL
);