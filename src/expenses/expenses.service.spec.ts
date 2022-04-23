import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { Expense } from './schemas/expense.schema';

describe('ExpensesService', () => {
  let service: ExpensesService;

  const mockExpenseModel = {
    create: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: getModelToken(Expense.name),
          useValue: mockExpenseModel,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
