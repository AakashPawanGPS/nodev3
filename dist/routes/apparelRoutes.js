"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apparelController_1 = require("../controllers/apparelController");
const router = express_1.default.Router();
router.put('/update-one', apparelController_1.updateOneApparel);
router.put('/update-many', apparelController_1.updateManyApparels);
exports.default = router;
