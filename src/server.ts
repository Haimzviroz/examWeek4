import express, { Application } from "express";
import dotenv from "dotenv";
import authrouter from "./routes/beepers";

dotenv.config();
const app: Application = express();
const PORT: number | string = process.env.PORT || "3000";

//BODY PARSER
app.use(express.json());
app.use(authrouter);

//IMPORT ROUTES

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
