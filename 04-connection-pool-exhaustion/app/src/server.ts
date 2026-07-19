import express from "express";
import cors from "cors";
import contractRouter from "./routes/contract.route";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/contracts", contractRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at: http://localhost:${PORT}`);
});
