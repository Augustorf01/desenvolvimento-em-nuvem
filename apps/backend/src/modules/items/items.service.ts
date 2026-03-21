import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";

import { ItemEntity } from "../../database/entities/item.entity";
import { CreateItemDto } from "./dto/create-item.dto";
import { ListItemsQueryDto } from "./dto/list-items-query.dto";
import { UpdateItemDto } from "./dto/update-item.dto";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  list(query: ListItemsQueryDto) {
    const where = {
      ...(query.type ? { type: query.type } : {}),
      ...(query.search ? { title: ILike(`%${query.search}%`) } : {}),
    };

    return this.itemRepository.find({
      where,
      order: { createdAt: "DESC" },
    });
  }

  async getById(id: string) {
    const item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException("Item not found.");
    }

    return item;
  }

  create(dto: CreateItemDto) {
    const item = this.itemRepository.create({
      ...dto,
      genre: dto.genre ?? null,
      coverUrl: dto.coverUrl ?? null,
    });

    return this.itemRepository.save(item);
  }

  async update(id: string, dto: UpdateItemDto) {
    const item = await this.getById(id);

    Object.assign(item, {
      ...dto,
      genre: dto.genre ?? item.genre,
      coverUrl: dto.coverUrl ?? item.coverUrl,
    });

    return this.itemRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.getById(id);

    await this.itemRepository.remove(item);

    return {
      success: true,
    };
  }
}
