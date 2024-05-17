import express from 'express';
import { sequelize } from './database';
import { router } from './routes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log("DB connection successfuly");
    });
    console.log(`Server started successfuly at port ${PORT}`);
});
