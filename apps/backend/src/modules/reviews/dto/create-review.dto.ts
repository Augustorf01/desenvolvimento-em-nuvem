import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";

export class CreateReviewDto {
  @ApiProperty({ example: "item-uuid" })
  @IsUUID()
  itemId!: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiProperty({ example: "Excellent pacing and memorable characters." })
  @IsString()
  @IsNotEmpty()
  comment!: string;
}
