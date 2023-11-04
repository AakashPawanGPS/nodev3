"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLowestCost = exports.canFullFill = void 0;
const fs = __importStar(require("fs"));
const dataPath = 'data/stocks.json';
const stockUpdate = (apparel) => {
    const stocks = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const { code, size, quantity, price } = apparel;
    let newApparel = stocks.find(item => item.code == code && item.size == size);
    if (newApparel) {
        newApparel.quantity = quantity;
        newApparel.price = price;
    }
    else {
        stocks.push(apparel);
    }
    return stocks;
};
const isStockAvailable = (code, size) => {
    const stocks = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const apparel = stocks.find(item => item.code == code && item.size == size);
    if (apparel)
        return apparel;
};
const canFullFill = (req, res) => {
    const code = req.params.code;
    const size = req.params.size;
    const quantity = parseInt(req.params.quantity);
    const apparel = isStockAvailable(code, size);
    if (apparel) {
        res.status(200).send(apparel.quantity >= quantity);
    }
    else {
        res.status(400).send("Bad Request");
    }
};
exports.canFullFill = canFullFill;
const getLowestCost = (req, res) => {
    console.log(req.params);
    const code = req.params.code;
    const size = req.params.size;
    const quantity = parseInt(req.params.quantity);
    const apparel = isStockAvailable(code, size);
    if (apparel) {
        if (apparel.quantity >= quantity) {
            res.status(200).send(JSON.stringify(quantity * apparel.price));
        }
        else {
            res.status(200).send("Out of Stock");
        }
    }
    else {
        res.status(400).send("Bad Request");
    }
};
exports.getLowestCost = getLowestCost;
