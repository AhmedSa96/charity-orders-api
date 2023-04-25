import { Test, TestingModule } from "@nestjs/testing";
import { ProductsRepository } from "../products.repository";
import { ProductsService } from "../products.service";
import { fakeCreateProductDto, fakeProduct, fakeUpdateProductDto } from "./fake-data/fake-products";
import { GetProductsFilters } from "../models/get-products-filters";

jest.mock('../products.repository');

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductsRepository],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call ProductsRepository.create', async () => {
      const createOrderDto = fakeCreateProductDto();

      await service.create(createOrderDto);

      expect(repository.create).toBeCalledWith(createOrderDto);
    });

    it('should create an product', async () => {
      const createOrderDto = fakeCreateProductDto();
      const order = fakeProduct();

      expect(await service.create(createOrderDto)).toEqual(order);
    });
  });

  describe('findOne', () => {
    it('should call ProductsRepository.findOne', async () => {
      const id = 1;

      await service.findOne(id);

      expect(repository.findOne).toBeCalled();
    });

    it('should return an product', async () => {
      const id = 1;
      const order = fakeProduct();

      expect(await service.findOne(id)).toEqual(order);
    });
  });

  describe('findProductsByFilters', () => {
    it('should call ProductsRepository.findProductsByFilters', async () => {
      const filters: GetProductsFilters = {
        page: 1,
        per_page: 10,
        search: null,
      };

      await service.findAll(filters);

      expect(repository.findByFilters).toBeCalledWith(filters);
    });

    it('should return an array of products', async () => {
      const filters: GetProductsFilters = {
        page: 1,
        per_page: 10,
        search: null,
      };
      const order = fakeProduct();

      expect(await service.findAll(filters)).toEqual([order]);
    });
  });

  describe('update', () => {
    it('should call ProductsRepository.update', async () => {
      const id = 1;
      const updateOrderDto = fakeUpdateProductDto();
      const order = fakeProduct();

      await service.update(id, updateOrderDto);

      expect(repository.merge).toBeCalledWith(order, updateOrderDto);
      expect(repository.save).toBeCalledWith(order);
    });

    it('should update an product', async () => {
      const id = 1;
      const updateOrderDto = fakeUpdateProductDto();
      const order = fakeProduct();

      expect(await service.update(id, updateOrderDto)).toEqual(order);
    });
  });

  describe('delete', () => {
    it('should call ProductsRepository.softDelete', async () => {
      const id = 1;
      const order = fakeProduct();

      await service.remove(id);

      expect(repository.softRemove).toBeCalledWith(order);
    });

    it('should delete an product', async () => {
      const id = 1;
      const order = fakeProduct();

      expect(await service.remove(id)).toEqual(order);
    });
  });
});
