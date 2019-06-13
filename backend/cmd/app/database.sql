CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT, nome TEXT, receivealert INTEGER);
CREATE TABLE IF NOT EXISTS servant (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cargo TEXT, orgao TEXT, salario INTEGER);

INSERT INTO user VALUES(1, 'admin', 'd42f0e5b5ae41ad2d552008ba647fbff63f66b18', 'admin@admin.com', "Admin", 1);