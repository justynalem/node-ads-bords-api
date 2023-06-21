const express = require("express");
const router = express.Router();

const {
  handleAddAd,
  handleGetAdById,
  handleGetAds,
  handleDeleteAd,
  handleUpdateAd,
} = require("./ads.handlers");
const { authenticate } = require("../users/user.middleware");
const { validateAddAd } = require("./ads.middleware");

router.post("/", authenticate, validateAddAd, handleAddAd);
router.get("/", handleGetAds);
router.get("/:id", handleGetAdById);
router.delete("/:id",authenticate, handleDeleteAd);
router.patch("/:id", authenticate, handleUpdateAd);

module.exports = router;
