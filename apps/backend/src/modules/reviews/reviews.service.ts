import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ItemEntity } from "../../database/entities/item.entity";
import { ReviewEntity } from "../../database/entities/review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  async create(userId: string, dto: CreateReviewDto) {
    const item = await this.itemRepository.findOne({ where: { id: dto.itemId } });

    if (!item) {
      throw new NotFoundException("Item not found.");
    }

    const existingReview = await this.reviewRepository.findOne({
      where: {
        itemId: dto.itemId,
        userId,
      },
    });

    if (existingReview) {
      throw new BadRequestException("You have already reviewed this item.");
    }

    const review = this.reviewRepository.create({
      itemId: dto.itemId,
      userId,
      rating: dto.rating,
      comment: dto.comment,
    });

    return this.reviewRepository.save(review);
  }

  listByItem(itemId: string) {
    return this.reviewRepository.find({
      where: { itemId },
      relations: { user: true },
      order: { createdAt: "DESC" },
    });
  }

  listByUser(userId: string) {
    return this.reviewRepository.find({
      where: { userId },
      relations: { item: true },
      order: { createdAt: "DESC" },
    });
  }
}
