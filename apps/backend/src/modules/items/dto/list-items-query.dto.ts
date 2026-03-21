import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

import { ItemType } from "../../../database/entities/item.entity";

export class ListItemsQueryDto {
  @ApiPropertyOptional({ enum: ItemType })
  @IsOptional()
  @IsEnum(ItemType)
  type?: ItemType;

  @ApiPropertyOptional({ example: "pragmatic" })
  @IsOptional()
  @IsString()
  search?: string;
}
