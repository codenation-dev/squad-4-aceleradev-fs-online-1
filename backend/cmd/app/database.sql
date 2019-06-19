CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT, nome TEXT, receivealert INTEGER);
CREATE TABLE IF NOT EXISTS servant (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cargo TEXT, orgao TEXT, salario REAL, sentalert INTEGER, UNIQUE(nome, cargo, orgao) ON CONFLICT REPLACE);

INSERT INTO user VALUES(1, 'admin', 'd42f0e5b5ae41ad2d552008ba647fbff63f66b18', 'rkorpalski@gmail.com', "Admin", 1);