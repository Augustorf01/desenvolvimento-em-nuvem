import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

import { ItemEntity } from "./item.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "reviews" })
@Unique("uq_reviews_user_item", ["userId", "itemId"])
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int" })
  rating!: number;

  @Column({ type: "text" })
  comment!: string;

  @Index()
  @Column({ name: "item_id" })
  itemId!: string;

  @Index()
  @Column({ name: "user_id" })
  userId!: string;

  @ManyToOne(() => ItemEntity, (item) => item.reviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "item_id" })
  item!: ItemEntity;

  @ManyToOne(() => UserEntity, (user) => user.reviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
