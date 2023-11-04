"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.get('/can-fulfill/:code/:size/:quantity', orderController_1.canFullFill);
router.get('/get-lowest-cost/:code/:size/:quantity', orderController_1.getLowestCost);
exports.default = router;
