CREATE SCHEMA apollo;

CREATE TABLE initium.users(
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL, 
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    active BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE apollo.events (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(150) NOT NULL,
    description NVARCHAR(MAX),
    date_start DATETIME NOT NULL,
    date_end DATETIME NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES initium.users(id)
);

CREATE TABLE apollo.categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL
);

CREATE TABLE apollo.category_event (
    id INT IDENTITY(1,1) PRIMARY KEY,
    category_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES apollo.categories(id),
    FOREIGN KEY (event_id) REFERENCES apollo.events(id)
);

CREATE TABLE apollo.event_feedback (
    id INT IDENTITY(1,1) PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,   
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5), 
    comment NVARCHAR(MAX),  
    feedback_date DATETIME DEFAULT GETDATE(),  
    FOREIGN KEY (event_id) REFERENCES apollo.events(id),
    FOREIGN KEY (user_id) REFERENCES initium.users(id) 
);

