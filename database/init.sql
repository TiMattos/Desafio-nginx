CREATE DATABASE dbpeople;
USE dbpeople;

CREATE TABLE people(
    codigo int(4) AUTO_INCREMENT,
    nome varchar(30) NOT NULL,
    PRIMARY KEY (codigo)
);
