const handleImage = (req, res, dataBase) => {
  const { id } = req.body;
  dataBase("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("unable to get entries");
    });
};

module.exports = {
  handleImage: handleImage,
};
