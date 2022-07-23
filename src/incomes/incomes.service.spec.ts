import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { IncomesService } from './incomes.service';
import { Income } from './schemas/income.schema';

describe('IncomesService', () => {
  let service: IncomesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncomesService,
        {
          provide: getModelToken(Income.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<IncomesService>(IncomesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
