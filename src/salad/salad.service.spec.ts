import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dressing } from '../entities/dressing.entity';
import { Salad } from '../entities/salad.entity';
import { Topping } from '../entities/topping.entity';
import { SaladService } from './salad.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn((entity) => entity),
  findOneBy: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
}));
const saladsMock: Salad[] = [
  {
    id: '10b41390-a33e-4828-8384-5b1c65879400',
    username: 'tom',
    date: new Date('2023-03-22T20:40:19.000Z'),
    toppings: [],
    dressing: null,
  },
  {
    id: '19d38d5a-a2fd-4098-9046-3c42c1f4cd46',
    username: 'tom',
    date: new Date('2023-03-23T08:26:42.000Z'),
    toppings: [],
    dressing: null,
  },
];

describe('SaladService', () => {
  let service: SaladService;
  let saladRepo: MockType<Repository<Salad>>;
  let toppingRepo: MockType<Repository<Topping>>;
  let dressingRepo: MockType<Repository<Dressing>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaladService,
        {
          provide: getRepositoryToken(Salad),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Topping),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Dressing),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<SaladService>(SaladService);

    saladRepo = module.get(getRepositoryToken(Salad));
    toppingRepo = module.get(getRepositoryToken(Topping));
    dressingRepo = module.get(getRepositoryToken(Dressing));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return all Salads when findAll() called', () => {
    saladRepo.find.mockReturnValue(saladsMock);
    expect(service.findAll()).toEqual(saladsMock);
    expect(saladRepo.find).toHaveBeenCalledTimes(1);
  });

  it('Should find one salad when findOne() called', () => {
    const salad = saladsMock[0];
    saladRepo.findOneBy.mockReturnValue(salad);
    expect(service.findOne(salad.id)).toEqual(salad);
    expect(saladRepo.findOneBy).toHaveBeenCalledWith({ id: salad.id });
  });

  it('Should add a topping when addTopping() called', () => {
    const topping: Topping = { id: 0, name: 'Tomatoes', price: 1.2 };

    toppingRepo.save.mockReturnValue(topping);
    expect(service.addTopping(topping)).toEqual(topping);
    expect(toppingRepo.save).toHaveBeenCalledWith(topping);
  });

  it('Should add Toppings to salad when addToppingsToSalad() called', async () => {
    const toppings: Topping[] = [{ id: 0, name: 'Tomatoes', price: 1.2 }];
    const salad = saladsMock[0];
    const saladWithToppings = { ...salad, toppings };

    saladRepo.save.mockReturnValue(saladWithToppings);
    saladRepo.findOneBy.mockReturnValue(salad);
    expect(
      await service.addToppingsToSalad({ saladId: salad.id, toppings }),
    ).toEqual(saladWithToppings);
    expect(saladRepo.save).toHaveBeenCalledWith(saladWithToppings);
    expect(await service.addToppingsToSalad({ saladId: salad.id, toppings }));
  });
});
