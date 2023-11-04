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
exports.updateManyApparels = exports.updateOneApparel = void 0;
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
const updateOneApparel = (req, res) => {
    const newApparel = req.body;
    const stocks = stockUpdate(newApparel);
    fs.writeFileSync(dataPath, JSON.stringify(stocks, null, 4));
    res.status(201).json(newApparel);
};
exports.updateOneApparel = updateOneApparel;
const updateManyApparels = (req, res) => {
    const newApparels = req.body;
    newApparels.forEach(newApparel => {
        const stocks = stockUpdate(newApparel);
        fs.writeFileSync(dataPath, JSON.stringify(stocks, null, 2));
    });
    res.status(201).json(newApparels);
};
exports.updateManyApparels = updateManyApparels;
