const express = require("express");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

// Multer konfiguráció a fájl feltöltéshez
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Új felhasználó létrehozása
router.post(
  "/",
  upload.fields([{ name: "residenceCard" }, { name: "driveLicense" }]),
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        addressLine1,
        addressLine2,
        city,
        country,
        state,
        zip,
        additional,
        points,
      } = req.body;
      const fullname = `${firstName} ${lastName}`;
      const residenceCard = req.files?.residenceCard?.[0]?.path || "";
      const driveLicense = req.files?.driveLicense?.[0]?.path || "";

      const user = new User({
        firstName,
        lastName,
        fullname,
        email,
        phone,
        addressLine1,
        addressLine2,
        city,
        country,
        state,
        zip,
        additional,
        residenceCard,
        driveLicense,
        points,
      });

      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Felhasználók lekérdezése
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
