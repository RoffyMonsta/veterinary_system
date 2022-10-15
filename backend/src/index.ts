import express from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from 'cors';
import bodyParser from "body-parser";
import { sequelize } from "./services/sequelize.service";
import apiRouter from "./routes/api.routes";
import { initMockData } from "./services/init-mock-data.service";

const allowedOrigins = [
  'http://localhost:8100', // for ionic app
  'http://localhost:4200', // for angular app
];

const corsOptions: CorsOptions = {
  origin: allowedOrigins
};
dotenv.config();



const RESYNC_DB = false;
const INIT_MOCK_DATA = true;

if (RESYNC_DB) {
  sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Database with { force: true }');
  });
} else {
  sequelize.sync();
}

if (INIT_MOCK_DATA) {
  initMockData();
}





const app = express();
const port = process.env.PORT || 8080;

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api/', apiRouter);

app.get('/', (_request, response) => {
  response.send('Hello world!');
});
app.listen(port, () => console.log(`Running on port ${port}`));