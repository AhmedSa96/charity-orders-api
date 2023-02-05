import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { fakeCreateOrderDto, fakeOrder, fakeUpdateOrderDto } from './fake-data/fake-orders';

jest.mock('../orders.service');

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create function to be called', async () => {
      const order = fakeCreateOrderDto();
      await controller.create(order);
      expect(service.create).toBeCalledWith(order);
    });

    it('should create a new order', async () => {
      const order = fakeCreateOrderDto();
      const newOrder = await controller.create(order);

      
      expect(newOrder).toEqual(fakeOrder());
    })
  });

  describe('findAll', () => {
    it('should findAll function to be called', async () => {
      await controller.findAll({ page: 1, limit: 10, search: '' });
      expect(service.findAll).toBeCalled();
    });

    it('should return an array of orders', async () => {
      const orders = await controller.findAll({ page: 1, limit: 10, search: '' });
      expect(orders).toEqual([fakeOrder()]);
    });
  });

  describe('findOne', () => {
    it('should findOne function to be called', async () => {
      const id = "1";
      await controller.findOne(id);
      expect(service.findOne).toBeCalledWith(+id);
    });

    it('should return an order', async () => {
      const id = "1";
      const order = await controller.findOne(id);
      expect(order).toEqual(fakeOrder());
    });
  });

  describe('update', () => {
    it('should update function to be called', async () => {
      const id = "1";
      const order = fakeUpdateOrderDto();
      await controller.update(id, order);
      expect(service.update).toBeCalledWith(+id, order);
    });

    it('should update an order', async () => {
      const id = "1";
      const order = fakeUpdateOrderDto();
      const updatedOrder = await controller.update(id, order);
      expect(updatedOrder).toEqual(fakeOrder());
    });
  });

  describe('remove', () => {
    it('should remove function to be called', async () => {
      const id = "1";
      await controller.remove(id);
      expect(service.remove).toBeCalledWith(+id);
    });

    it('should remove an order', async () => {
      const id = "1";
      const order = await controller.remove(id);
      expect(order).toEqual(fakeOrder());
    });
  });
});
