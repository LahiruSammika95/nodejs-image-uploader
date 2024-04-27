import express from "express";
const { cloudinary } = require('./cloudinary');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add a book - request body should contain a title, status and an author
app.post("/imageupload/image", async (req, res) => {
  const { title, author, status } = req.body;
  const fileStr = req.body.image;
 
  if (!title || !author || !status) {
    return res.status(400).json({ error: "Title, Status or Author is empty" });
  }
 
  try {

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'ml_default',
    });
    const image = uploadResponse.url;
    const image_id = uploadResponse.public_id;
    return res.status(201).json({ image, image_id });

  }
  catch (err) {
    return res.status(500).json({ title, author });
  }


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
