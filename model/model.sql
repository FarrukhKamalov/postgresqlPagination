CREATE TABLE books(
    book_id serial PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    book_price DECIMAL(10, 2) NOT NULL
);