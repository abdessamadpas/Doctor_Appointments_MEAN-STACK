import express from "express";
const router = express.Router();

router.get((req, res) => {
  res.status(404);
  res.json({
    message: `${req.location.url} 🚑 I think you are lost 🤦‍♀️🤦‍♀️ `,
  });
});
