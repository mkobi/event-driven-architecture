const express = require("express");
const PubSub = require("./pub-sub");

const app = express();
const PORT = 5050;

app.use(express.json());
PubSub.bindSubscribers();

app.get("/review/post", (req, res) => {
  const { rating } = req.query;

  if (!rating) {
    return res
      .status(400)
      .send({ message: "Please provide the necessary data" });
  }

  const review = { rating, status: "active" };

  PubSub.invoke("review-posted", review);

  res.send({ message: "Event published successfully" });
});

app.get("/review/reply", (req, res) => {
  const { id, reply } = req.query;

  if (!id) {
    return res
      .status(400)
      .send({ message: "Please provide the necessary data" });
  }

  // Mock fetching review by id (e.g. const review = Review.findById(id))
  const review = { reply: "5", status: "active", reply };

  PubSub.invoke("review-reply", review);

  res.send({ message: "Event published successfully" });
});

app.listen(PORT, () => {
  console.log(`Pub-Sub demo is running on port ${PORT}\n`);
});