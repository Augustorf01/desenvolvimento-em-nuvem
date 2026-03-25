import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Repository} from "typeorm";

import {ItemEntity} from "../../database/entities/item.entity";
import {CreateItemDto} from "./dto/create-item.dto";
import {ListItemsQueryDto} from "./dto/list-items-query.dto";
import {UpdateItemDto} from "./dto/update-item.dto";

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity>,
    ) {
    }

    list(query: ListItemsQueryDto) {
        const where = {
            ...(query.type ? {type: query.type} : {}),
            ...(query.search ? {title: ILike(`%${query.search}%`)} : {}),
        };

        return this.itemRepository.find({
            where,
            order: {createdAt: "DESC"},
        });
    }

    async getById(id: string) {
        const item = await this.itemRepository.findOne({where: {id}});

        if (!item) {
            throw new NotFoundException("Item not found.");
        }

        return item;
    }

    async create(dto: CreateItemDto) {
        this.validateFieldsDto(dto);

        const item = this.itemRepository.create({
            ...dto,
            genre: dto.genre ?? null,
            coverUrl: dto.coverUrl ?? null,
        });

        return await this.itemRepository.save(item);

    }

    async update(id: string, dto: UpdateItemDto) {
        this.validateFieldsDto(dto);

        const item = await this.getById(id);

        Object.assign(item, {
            ...dto,
            genre: dto.genre ?? item.genre,
            coverUrl: dto.coverUrl ?? item.coverUrl,
        });

        return await this.itemRepository.save(item);
    }

    async remove(id: string) {
        const item = await this.getById(id);

        await this.itemRepository.remove(item);

        return {
            success: true,
        };
    }

    private validateFieldsDto(dto: UpdateItemDto) {
        this.validateLength(dto.title, "title", 180);
        this.validateLength(dto.authorOrDirector, "authorOrDirector", 180);
        this.validateLength(dto.genre, "genre", 100);
    }

    private validateLength(value: string | undefined, field: string, maxLenght: number): void {

        if (value && value.length > maxLenght) {
            throw new BadRequestException(
                `The '${field}' field exceeds the maximum allowed length.`,
            );
        }
    }
}
