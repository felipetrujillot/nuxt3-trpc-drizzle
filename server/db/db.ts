import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
//const config = useRuntimeConfig();

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

export const db = drizzle(connection);
