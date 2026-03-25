import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController], 
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });

 
  it('deve retornar o status ok e o nome do serviço', () => {
    const resultado = healthController.getHealth();

    expect(resultado).toEqual({
      status: 'ok',
      service: 'backend',
    });
  });
});