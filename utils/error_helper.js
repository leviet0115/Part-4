const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  }
  res.status(500).end();

  next(err);
};

module.exports = errorHandler;
