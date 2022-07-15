import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../model/user";
import { Story } from "../model/story";
import { Tag } from "../model/tags";
dotenv.config({ path: ".env" });

export const postgres = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  password: process.env.PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  port: 5432,
  entities: [User, Story, Tag],
  synchronize: true,
  logging: false,
});
