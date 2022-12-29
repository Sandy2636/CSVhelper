const router = require("express").Router();
const { findByIdAndUpdate } = require("../Modal/User");
const User = require("../Modal/User");
const multer = require("multer");
const csvtojson = require("csvtojson");

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./CSV");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ sucess: true, data: data });
  } catch (err) {
    res.status(500).json;
  }
});
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json({ sucess: true, data: savedUser });
  } catch (err) {
    res.status(500).json;
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ sucess: true, data: updatedUser });
  } catch (err) {
    res.status(500).json;
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ sucess: true, data: "User has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/upload", upload.single("CSV"), async (req, res) => {
  try {
    csvtojson()
      .fromFile(req.file.path)
      .then((json) => {
        res.status(200).json({ sucess: true, data: json });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
