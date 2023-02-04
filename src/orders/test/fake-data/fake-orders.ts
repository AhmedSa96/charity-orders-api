import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { UpdateOrderDto } from "src/orders/dto/update-order.dto";

export const fakeOrder = () => ({
    id: 1,
    title: 'fake title',
    description: 'fake description',
    startDateTime: null,
    endDateTime: null,
    latitude: 1,
    longitude: 1,
    user: {
        id: 1,
        first_name: 'fake first name',
        last_name: 'fake last name',
        email: 'fake email',
        phone: 'fake phone',
        password: 'fake password',
        user_type: 'fake user type',
        created_at: null,
        updated_at: null,
    },
});

export const fakeCreateOrderDto = (): CreateOrderDto => ({
    title: 'fake title',
    description: 'fake description',
    startDateTime: null,
    endDateTime: null,
    latitude: 1,
    longitude: 1,
    userId: 1,
});

export const fakeUpdateOrderDto = (): UpdateOrderDto => ({
    title: 'fake title',
    description: 'fake description',
    startDateTime: null,
    endDateTime: null,
    latitude: 1,
    longitude: 1,
});