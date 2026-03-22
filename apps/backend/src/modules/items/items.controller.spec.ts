import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let itemsController: ItemsController;
  let itemsService: ItemsService;

  const mockItemsService = {
    list: jest.fn().mockResolvedValue([
      { id: '1', name: 'Item Teste 1' },
      { id: '2', name: 'Item Teste 2' },
    ]),
    getById: jest.fn().mockResolvedValue({ id: '1', name: 'Item Teste 1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: mockItemsService,
        },
      ],
    }).compile();

    itemsController = module.get<ItemsController>(ItemsController);
    itemsService = module.get<ItemsService>(ItemsService);
  });

  describe('list', () => {
    it('deve retornar uma lista de itens (sucesso)', async () => {
      const queryDto = {} as any;
      const result = await itemsController.list(queryDto);

      expect(result).toHaveLength(2);
      expect(itemsService.list).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('deve retornar um item específico pelo ID', async () => {
      const result = await itemsController.getById('1') as any;

      expect(result.id).toEqual('1');
      expect(itemsService.getById).toHaveBeenCalledWith('1');
    });
  });
});