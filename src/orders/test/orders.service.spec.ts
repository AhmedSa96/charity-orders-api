import { Test, TestingModule } from '@nestjs/testing';
import { GetOrdersFiltersDto } from '../dto/get-orders-filters-dto';
import { OrdersRepository } from '../orders.repository';
import { OrdersService } from '../orders.service';
import { fakeCreateOrderDto, fakeOrder, fakeUpdateOrderDto } from './fake-data/fake-orders';

jest.mock('../orders.repository');

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: OrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, OrdersRepository],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<OrdersRepository>(OrdersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call OrdersRepository.create', async () => {
      const createOrderDto = fakeCreateOrderDto();

      await service.create(createOrderDto);

      expect(repository.create).toBeCalledWith(createOrderDto);
    });

    it('should create an order', async () => {
      const createOrderDto = fakeCreateOrderDto();
      const order = fakeOrder();

      expect(await service.create(createOrderDto)).toEqual(order);
    });
  });

  describe('findOne', () => {
    it('should call OrdersRepository.findOne', async () => {
      const id = 1;

      await service.findOne(id);

      expect(repository.findOne).toBeCalled();
    });

    it('should return an order', async () => {
      const id = 1;
      const order = fakeOrder();

      expect(await service.findOne(id)).toEqual(order);
    });
  });

  describe('findOrdersByFilters', () => {
    it('should call OrdersRepository.findOrdersByFilters', async () => {
      const filters: GetOrdersFiltersDto = {
        page: 1,
        limit: 10,
        search: null,
      };

      await service.findAll(filters);

      expect(repository.findOrdersByFilters).toBeCalledWith(filters);
    });

    it('should return an array of orders', async () => {
      const filters: GetOrdersFiltersDto = {
        page: 1,
        limit: 10,
        search: null,
      };
      const order = fakeOrder();

      expect(await service.findAll(filters)).toEqual([order]);
    });
  });

  describe('update', () => {
    it('should call OrdersRepository.update', async () => {
      const id = 1;
      const updateOrderDto = fakeUpdateOrderDto();
      const order = fakeOrder();

      await service.update(id, updateOrderDto);

      expect(repository.merge).toBeCalledWith(order, updateOrderDto);
      expect(repository.save).toBeCalledWith(order);
    });

    it('should update an order', async () => {
      const id = 1;
      const updateOrderDto = fakeUpdateOrderDto();
      const order = fakeOrder();

      expect(await service.update(id, updateOrderDto)).toEqual(order);
    });
  });

  describe('delete', () => {
    it('should call OrdersRepository.softDelete', async () => {
      const id = 1;
      const order = fakeOrder();

      await service.remove(id);

      expect(repository.softRemove).toBeCalledWith(order);
    });

    it('should delete an order', async () => {
      const id = 1;
      const order = fakeOrder();

      expect(await service.remove(id)).toEqual(order);
    });
  });
});
