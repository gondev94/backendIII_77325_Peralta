import { faker } from "@faker-js/faker";

export function generateFakerUsers(count) {
    if (!Number.isInteger(count) || count < 0) {
        throw new Error("count must be a positive integer");
    }

    const users = [];

    for (let i = 0; i < count; i++){
        users.push({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            username: faker.internet.username(),
        });
    }
    return users;
}