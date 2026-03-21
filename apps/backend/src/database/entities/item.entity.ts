import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ReviewEntity } from "./review.entity";

export enum ItemType {
  BOOK = "book",
  MOVIE = "movie",
}

@Entity({ name: "items" })
export class ItemEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: ItemType })
  type!: ItemType;

  @Column({ length: 180 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ name: "author_or_director", length: 180 })
  authorOrDirector!: string;

  @Column({ name: "release_year", type: "int" })
  releaseYear!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  genre!: string | null;

  @Column({ name: "cover_url", type: "text", nullable: true })
  coverUrl!: string | null;

  @OneToMany(() => ReviewEntity, (review) => review.item)
  reviews!: ReviewEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
