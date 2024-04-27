import express from "express";
import cache from "./cache.mjs";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add a book - request body should contain a title, status and an author
app.post("/fileupload/books", (req, res) => {
  const { title, author, status } = req.body;
  const uuid = uuidv4();
  if (!(status === "read" || status === "to_read" || status === "reading")) {
    return res.status(400).json({
      error: "Status is invalid. Accepted statuses: read | to_read | reading",
    });
  }
  if (!title || !author || !status) {
    return res.status(400).json({ error: "Title, Status or Author is empty" });
  }
  const value = { uuid, title, author, status };
  cache.set(uuid, value, 86400);
  return res.status(201).json({ uuid, title, author });
});


export default app;
