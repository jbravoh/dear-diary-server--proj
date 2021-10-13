import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/jwtAuth";
import dashboardRouter from "./routes/dashboard";

config(); 

const herokuSSLSetting = { rejectUnauthorized: false };
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting;
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

export const client = new Client(dbConfig);
client.connect();

// ===> ROUTES <====

// Register and login routes

app.use("/auth", authRouter);

// Dashboard

app.use("/dashboard", dashboardRouter);


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw "Missing PORT environment variable.  Set it in .env file.";
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
