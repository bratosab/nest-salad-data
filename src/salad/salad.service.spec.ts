import { Test, TestingModule } from '@nestjs/testing';
import { SaladService } from './salad.service';

describe('SaladService', () => {
  let service: SaladService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaladService],
    }).compile();

    service = module.get<SaladService>(SaladService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
