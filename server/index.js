import express, { Router } from 'express';
import cors from 'cors';
import { faker, fakerRO } from '@faker-js/faker';

const PORT = 8000;

const createRandomProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseInt(faker.commerce.price()),
    productMaterial: faker.commerce.productMaterial(),
    department: faker.commerce.department(),
    image: faker.image.url(),
    id: faker.string.uuid(),
  };
}

const getMultipleProducts = (amount) => faker.helpers.multiple(createRandomProduct, {
  count: parseInt(amount),
});

export const routes = () => {
  const api = Router();

  api.get('/data', (req, res) => {
    const { amount } = req.query;
    res.send({
      status: 200,
      body: {
        products: getMultipleProducts(amount),
      },
    })
  });

  /**
   * Create endpoints here
   */

  return api;
};

const app = express();
app.use(cors());
app.use(routes());

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();

export default app;
