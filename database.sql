CREATE TABLE "employee" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "tel" text NOT NULL,
  "bith" timestamp,
  "cpf"  text,
  "address" text,
  "sector_id" int,
  "position_id" int,
  "created_at" timestamp DEFAULT (now())
  );
  
CREATE TABLE "sector" (
	"id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
	);

CREATE TABLE "position" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
  );
  
ALTER TABLE "employee" ADD FOREIGN KEY ("sector_id") REFERENCES "sector" ("id");
ALTER TABLE "employee" ADD FOREIGN KEY ("position_id") REFERENCES "position" ("id");

CREATE TABLE "photos" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "path" text NOT NULL,
  "employee_id" int
  );
  
ALTER TABLE "photos" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("id") ON DELETE CASCADE ;
