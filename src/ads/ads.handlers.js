const { startOfDay, endOfDay } = require("date-fns");
const AdModel = require("./ads.model");

async function handleAddAd(req, res) {
  const ad = await AdModel.create({
    ...req.body,
    author: req.user.login,
    authorId: req.user.id,
  });
  const savedAd = await ad.save();
  res.status(201).send(`New ad was added: ${savedAd}`);
}

async function handleGetAdById(req, res) {
  const ad = await AdModel.findById(req.params.id, { authorId: 0 });
  if (!ad) {
    console.log("no ad with given id");
    res.status(404).send("Ad not found");
    return;
  }
  res.status(200);
  res.format({
    "text/plain": function () {
      res.send(JSON.stringify(ad));
    },
    "text/html": function () {
      res.send(`<pre>${JSON.stringify(ad, null, 2)}</pre>`);
    },
    "application/json": function () {
      res.send(ad);
    },
  });
}

async function handleGetAds(req, res) {
  const filters = Object.entries(req.query).reduce((acc, [key, value]) => {
    if (key === "dateStart") {
      acc["createdAt"] = {
        ...acc["createdAt"],
        $gte: startOfDay(new Date(value)),
      };
      return acc;
    }
    if (key === "dateEnd") {
      acc["createdAt"] = {
        ...acc["createdAt"],
        $lte: endOfDay(new Date(value)),
      };
      return acc;
    }
    if (key === "priceStart") {
      acc["price"] = { ...acc["price"], $gte: Number(value) };
      return acc;
    }
    if (key === "priceEnd") {
      acc["price"] = { ...acc["price"], $lte: Number(value) };
      return acc;
    }
    acc[key] = { $regex: value };
    return acc;
  }, {});
  try {
    const ads = await AdModel.find(filters, { authorId: 0 });
    res.status(200).send(ads);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

async function handleDeleteAd(req, res) {
  const adToDelete = await AdModel.findOne({
    _id: req.params.id,
    authorId: req.user.id,
  });
  if (!adToDelete) {
    console.log("user not authorized to delete add - only author authorized");
    res.status(403).send("Not authorized to delete ad");
    return;
  }
  try {
    await AdModel.deleteOne({ _id: req.params.id });
    res.status(202).send();
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

async function handleUpdateAd(req, res) {
  const adToUpdate = await AdModel.findOne({
    _id: req.params.id,
    authorId: req.user.id,
  });
  if (!adToUpdate) {
    console.log("user not authorized to update add - only author authorized");
    res.status(403).send("Not authorized to update ad");
    return;
  }
  try {
    const updatedAd = await AdModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).send(updatedAd);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

module.exports = {
  handleAddAd,
  handleGetAdById,
  handleGetAds,
  handleDeleteAd,
  handleUpdateAd,
};
