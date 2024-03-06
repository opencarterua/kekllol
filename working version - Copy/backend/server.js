// server.js

const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors'); // добавленный модуль cors

const app = express();
const port = 5000;

// Строка подключения к MongoDB
const connectionString = 'mongodb+srv://root:root@cluster0.not19kw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(bodyParser.json());
// Конфигурация CORS
app.use(cors({
  origin: true,
  credentials: true,
}));


// Обработчик для корневого пути
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

// Роут для получения уникальных магазинов
app.get('/api/stores', async (req, res) => {
  try {
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('medecines-db');
    const collection = db.collection('medicines');

    // Получение уникальных названий магазинов из коллекции medicines
    const stores = await collection.distinct('storeName');
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    //client.close();
  }
});

// Роут для получения товаров по названию магазина
app.get('/api/products/:storeName', async (req, res) => {
  const storeName = req.params.storeName;

  try {
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('medecines-db');
    const collection = db.collection('medicines');

    // Получение товаров по названию магазина
    const products = await collection.find({ storeName }).toArray();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    //client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
