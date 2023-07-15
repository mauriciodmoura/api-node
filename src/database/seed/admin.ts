import { DataSource } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

async function create() {
  const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mauriciodemoura",
    password: "ignite",
    database: "postgres",
  });

  await dataSource.connect();

  const id = uuidV4();
  const password = await hash("admin", 8);
  await dataSource.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
     VALUES ('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXX')
    `
  );
  await dataSource.destroy();
}

create().then(() => console.log("User admin created!"));