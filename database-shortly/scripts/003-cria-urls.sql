CREATE TABLE urls(
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "urlVisits" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER REFERENCES "users"("id"),
    "createdAt" DATE NOT NULL
);