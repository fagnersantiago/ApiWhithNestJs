import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users/users.controller';
import { UsersService } from './users/users.services';
import { Clients } from './users/entities/users.entites';

const userList: Clients[] = [
  new Clients({
    id: 1,
    name: 'john doe',
    email: 'email@email',
    password: '123',
  }),
  new Clients({ id: 2, name: 'mary', email: 'email@email', password: '123' }),
  new Clients({ id: 3, name: 'james', email: 'email@email', password: '123' }),
];

describe('UserController', () => {
  let userController: UserController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            get: jest.fn().mockResolvedValue(userList),
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Get all Users', () => {
    it('should be able return all users', async () => {
      const usersList = await userController.getAll();

      console.log(userList);
      expect(usersList).toEqual(userList);
    });
  });
});
