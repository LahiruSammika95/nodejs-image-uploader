import express from "express";



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add a book - request body should contain a title, status and an author
app.post("/reading-list/books", (req, res) => {
  const { title, author, status } = req.body;
 
  if (!title || !author || !status) {
    return res.status(400).json({ error: "Title, Status or Author is empty" });
  }
 
  return res.status(201).json({ title, author });
});

// health check
app.get("/healthz", (_, res) => {
  return res.sendStatus(200);
});

app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500);
  res.json({ error: err.message });
});

app.use("*", (_, res) => {
  return res
    .status(404)
    .json({ error: "the requested resource does not exist on this server" });
});

export default app;
