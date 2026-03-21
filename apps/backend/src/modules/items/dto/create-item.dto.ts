import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";

import { ItemType } from "../../../database/entities/item.entity";

export class CreateItemDto {
  @ApiProperty({ enum: ItemType, example: ItemType.BOOK })
  @IsEnum(ItemType)
  type!: ItemType;

  @ApiProperty({ example: "The Pragmatic Programmer" })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: "Classic book about pragmatic software development." })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: "Andrew Hunt" })
  @IsString()
  @IsNotEmpty()
  authorOrDirector!: string;

  @ApiProperty({ example: 1999 })
  @IsInt()
  @Min(1800)
  @Max(2100)
  releaseYear!: number;

  @ApiPropertyOptional({ example: "Technology" })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional({ example: "https://example.com/cover.jpg" })
  @IsOptional()
  @IsUrl()
  coverUrl?: string;
}
