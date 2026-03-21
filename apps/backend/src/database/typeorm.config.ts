import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { getBackendEnv } from "../config/env";
import { ItemEntity } from "./entities/item.entity";
import { ReviewEntity } from "./entities/review.entity";
import { UserEntity } from "./entities/user.entity";

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  const env = getBackendEnv();

  return {
    type: "postgres",
    url: env.databaseUrl,
    entities: [UserEntity, ItemEntity, ReviewEntity],
    autoLoadEntities: false,
    synchronize: env.dbSynchronize,
  };
};
