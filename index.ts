import express, { Express, Request, Response } from "express";
const port = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Testing Express & TS setup");
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
