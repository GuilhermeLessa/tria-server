CREATE SEQUENCE clients_id_seq;
CREATE TABLE clients (
	id INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('clients_id_seq'),
	company VARCHAR(80) NOT NULL,
	name VARCHAR(80) NOT NULL,
	phone VARCHAR(80) NOT NULL,
	email VARCHAR(80) NOT NULL
);
ALTER SEQUENCE clients_id_seq OWNED BY clients.id;

CREATE SEQUENCE expenses_id_seq;
CREATE TABLE expenses (
	id INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('expenses_id_seq'),
	value NUMERIC NOT NULL,
	date TIMESTAMPTZ NOT NULL,
	client_id INTEGER NOT NULL,
	CONSTRAINT clients FOREIGN KEY(client_id) REFERENCES clients(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);
ALTER SEQUENCE expenses_id_seq OWNED BY expenses.id;


INSERT INTO clients (company, name, phone, email)
VALUES (
	'Hering SA', 
	'William Felix', 
	'+55 (47) 99763 2233', 
	'will.felix@hering.com.br'
),
(
	'CISCO', 
	'Elisa Machado', 
	'+55 (11) 988227733', 
	'machado.e@cisco.com.br'
);

INSERT INTO expenses (value, date, client_id)
VALUES (
	2500.50,
	'2021-07-09 14:54:51',
	1
),
(
	1800,
	'2021-07-08 14:55:30',
	1
),
(
	2200.80,
	'2021-08-07 14:55:48',
	1
);