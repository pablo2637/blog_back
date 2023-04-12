--Crea tabla de users
CREATE TABLE users (
userID serial NOT NULL PRIMARY KEY,
name varchar(45) NOT NULL,
email varchar(100) NOT NULL UNIQUE,
password varchar(200) NOT NULL
);

--Crea tabla de rols
CREATE TABLE rols (
rolID serial NOT NULL PRIMARY KEY,
rol varchar(45) NOT NULL,
userID int,
FOREIGN KEY (userID) REFERENCES users(userID)
);

--Crea tabla de logs
CREATE TABLE logs (
logID serial NOT NULL PRIMARY KEY,
event varchar(45) NOT NULL,
userID int,
date date DEFAULT CURRENT_DATE,
time timetz DEFAULT CURRENT_TIME,
FOREIGN KEY (userID) REFERENCES users(userID)
);

--Crea tabla de entries
CREATE TABLE entries (
entryID serial NOT NULL PRIMARY KEY,
title varchar(100) NOT NULL,
content text NOT NULL,
extract varchar(250) NOT NULL,
userID int,
image varchar(200) NOT NULL,
date date DEFAULT CURRENT_DATE,
time timetz DEFAULT CURRENT_TIME,
FOREIGN KEY (userID) REFERENCES users(userID)
);

--Crea admin (password: admin, se guarda encriptado)
INSERT INTO users(name, email, password)
VALUES
('Pepe','pepe@correo.es','$2a$10$a.x4kbAfyVBRwcJX.TW4S.GniM1hWeeNuOVWgRg3jKtd4UebOx5FC');

--Le asigna al usuario admin el rol admin
INSERT INTO rols(rol,userID)
VALUES
('admin',1);

--Crea resto usuarios (password: 123456, se guarda encriptado)
INSERT INTO users(name,email,password)
VALUES
('Ana','ana@correo.es','$2a$10$a23Xb31R5vIdedwkz/wl4epHZt6GerLQVU/y2PFZm28vBT4qrAm2i'),
('Pedro','pedro@correo.es','$2a$10$a23Xb31R5vIdedwkz/wl4epHZt6GerLQVU/y2PFZm28vBT4qrAm2i'),
('Luis','luis@correo.es','$2a$10$a23Xb31R5vIdedwkz/wl4epHZt6GerLQVU/y2PFZm28vBT4qrAm2i');

--Asinga resto de roles a users
INSERT INTO rols(rol,userID)
VALUES
('user',2),
('user',3),
('user',4);