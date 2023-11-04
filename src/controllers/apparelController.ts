import { Request, Response } from 'express';
import { Apparel } from '../models/apparelModel';
import * as fs from 'fs';

const dataPath = 'data/stocks.json';

const stockUpdate = (apparel: Apparel) => {
    const stocks: Apparel[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
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

export const updateOneApparel = (req: Request, res: Response) => {
    const newApparel: Apparel = req.body;
    const stocks = stockUpdate(newApparel);
    fs.writeFileSync(dataPath, JSON.stringify(stocks, null, 4));
    res.status(201).json(newApparel);
};

export const updateManyApparels = (req: Request, res: Response) => {
    const newApparels: Apparel[] = req.body;
    newApparels.forEach(newApparel => {
        const stocks = stockUpdate(newApparel);
        fs.writeFileSync(dataPath, JSON.stringify(stocks, null, 2));
    })
    res.status(201).json(newApparels);
};


