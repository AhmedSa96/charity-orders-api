import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "../products.controller";
import { ProductsService } from "../products.service";
import { fakeCreateProductDto, fakeProduct, fakeUpdateProductDto } from "./fake-data/fake-products";

jest.mock('../products.service');

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create function to be called', async () => {
      const order = fakeCreateProductDto();
      await controller.create(order);
      expect(service.create).toBeCalledWith(order);
    });

    it('should create a new product', async () => {
      const order = fakeCreateProductDto();
      const newOrder = await controller.create(order);

      
      expect(newOrder).toEqual(fakeProduct());
    })
  });

  describe('findAll', () => {
    it('should findAll function to be called', async () => {
      await controller.findAll({ });
      expect(service.findAll).toBeCalled();
    });

    it('should return an array of products', async () => {
      const orders = await controller.findAll({});
      expect(orders).toEqual([fakeProduct()]);
    });
  });

  describe('findOne', () => {
    it('should findOne function to be called', async () => {
      const id = 1;
      await controller.findOne(id);
      expect(service.findOne).toBeCalledWith(+id);
    });

    it('should return an product', async () => {
      const id = 1;
      const order = await controller.findOne(id);
      expect(order).toEqual(fakeProduct());
    });
  });

  describe('update', () => {
    it('should update function to be called', async () => {
      const id = 1;
      const order = fakeUpdateProductDto();
      await controller.update(id, order);
      expect(service.update).toBeCalledWith(+id, order);
    });

    it('should update an product', async () => {
      const id = 1;
      const order = fakeUpdateProductDto();
      const updatedOrder = await controller.update(id, order);
      expect(updatedOrder).toEqual(fakeProduct());
    });
  });

  describe('remove', () => {
    it('should remove function to be called', async () => {
      const id = 1;
      await controller.remove(id);
      expect(service.remove).toBeCalledWith(+id);
    });

    it('should remove an product', async () => {
      const id = 1;
      const order = await controller.remove(id);
      expect(order).toEqual(fakeProduct());
    });
  });
});
