CREATE TABLE "users"
(
    "Id" SERIAL PRIMARY KEY,
    "Username" TEXT NOT NULL UNIQUE,
    "Password" TEXT NOT NULL,
    "Name" TEXT NOT NULL
);