import { faker } from "@faker-js/faker"

export const generateProducts = () => {
    return {
        //_id: {"$oid": faker.database.mongodbObjectId()},
        title: faker.commerce.productName(),
        code: faker.string.alphanumeric(6),
        desciption: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        stock: parseInt(faker.string.numeric()),
        category: faker.commerce.productAdjective(),
        thumbnails: [faker.image.url()],
        owner: faker.database.mongodbObjectId()
        //isActive: faker.datatype.boolean(1.0)
        // id: faker.database.mongodbObjectId(),
    }
}