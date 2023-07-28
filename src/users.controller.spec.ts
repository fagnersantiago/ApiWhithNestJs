import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users/users.controller';
import { CreateUserController } from './users/create/create.user.controller';
import { CreteUserService } from './users/create/create.user.service';
import { ListUserController } from './users/list/list.user.controller';
import { ListUserService } from './users/list/list.user.service';
import { DeleteUserController } from './users/delete/delete.user.controller';
import { DeleteUserService } from './users/delete/delete.user.service';
import { UsersService } from './users/users.services';
import { Clients } from './users/entities/users.entites';
import { hashSync } from 'bcrypt';

const userList: Clients[] = [
  new Clients({
    id: 1,
    name: 'john doe',
    email: 'email@email',
    password: hashSync('123', 10),
  }),
  new Clients({ id: 2, name: 'mary', email: 'email@email', password: '123' }),
  new Clients({ id: 3, name: 'james', email: 'email@email', password: '123' }),
];

describe('UserController', () => {
  // let userController: UserController;
  // let userService: UsersService;
  let createUserController: CreateUserController;
  let createUserService: CreteUserService;
  let listUserController: ListUserController;
  let listUserService: ListUserService;
  let deleteUserController: DeleteUserController;
  let deleteUserService: DeleteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        DeleteUserController,
        CreateUserController,
        ListUserController,
      ],
      providers: [
        {
          provide: ListUserService,
          useValue: {
            get: jest.fn().mockResolvedValue(userList),
          },
        },
        {
          provide: CreteUserService,
          useValue: {
            create: jest.fn().mockReturnValue(userList[0]),
          },
        },
        {
          provide: DeleteUserService,
          useValue: {
            delete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    listUserController = module.get<ListUserController>(ListUserController);
    listUserService = module.get<ListUserService>(ListUserService);
    createUserController =
      module.get<CreateUserController>(CreateUserController);
    createUserService = module.get<CreteUserService>(CreteUserService);
    deleteUserController =
      module.get<DeleteUserController>(DeleteUserController);
    deleteUserService = module.get<DeleteUserService>(DeleteUserService);
  });

  it('should be defined', () => {
    expect(createUserController).toBeDefined();
    expect(deleteUserController).toBeDefined();
    expect(listUserController).toBeDefined();
  });

  describe('Get all Users', () => {
    it('should be able return all users', async () => {
      const usersList = await listUserController.getAll();

      expect(usersList).toEqual(userList);
    });
  });

  describe('Create User', () => {
    it('should be able create a new user', async () => {
      const user = new Clients({
        id: 1,
        name: 'john doe',
        email: 'email@email',
        password: '123',
      });

      user.hashPassword();

      console.log(user.password);
      await createUserController.create(user);
      expect(user.id).toBe(1);
      expect(user.name).toBe('john doe');
      expect(user.email).toBe('email@email');
      expect(user.password).not.toBe('123');
    });
  });

  it('should be able Delete user', async () => {
    const deleted = await deleteUserController.delete(1);
    expect(deleted).toBeUndefined();
  });
});
