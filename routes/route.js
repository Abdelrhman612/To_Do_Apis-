const express = require("express");
const {
  GetTsks,
  GetTsk,
  CreateTsk,
  UpDateTask,
  DeletTask,
} = require("../controllers/controllersTsk");
const router = express.Router();
router.post("/", CreateTsk);
router.get("/", GetTsks);
router.get("/:Id", GetTsk);
router.patch("/:Id", UpDateTask);
router.delete("/:Id", DeletTask);
module.exports = router;
