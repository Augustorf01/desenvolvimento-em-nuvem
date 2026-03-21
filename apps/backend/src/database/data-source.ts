import "reflect-metadata";
import { DataSource } from "typeorm";

import { getBackendEnv } from "../config/env";
import { ItemEntity } from "./entities/item.entity";
import { ReviewEntity } from "./entities/review.entity";
import { UserEntity } from "./entities/user.entity";
import { InitialSchema1711000000000 } from "./migrations/1711000000000-initial-schema";

const env = getBackendEnv();

export default new DataSource({
  type: "postgres",
  url: env.databaseUrl,
  entities: [UserEntity, ItemEntity, ReviewEntity],
  migrations: [InitialSchema1711000000000],
  synchronize: false,
});
