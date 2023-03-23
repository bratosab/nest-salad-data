import { Test, TestingModule } from '@nestjs/testing';
import { SaladController } from './salad.controller';

describe('SaladController', () => {
  let controller: SaladController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaladController],
    }).compile();

    controller = module.get<SaladController>(SaladController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
