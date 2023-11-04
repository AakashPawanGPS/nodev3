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

const isStockAvailable = (code: string, size: string): Apparel | undefined => {
    const stocks: Apparel[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const apparel = stocks.find(item => item.code == code && item.size == size);
    if (apparel) return apparel;
}

export const canFullFill = (req: Request, res: Response) => {
    const code: string = req.params.code;
    const size: string = req.params.size;
    const quantity: number = parseInt(req.params.quantity);
    const apparel = isStockAvailable(code, size)
    if (apparel) {
        res.status(200).send(apparel.quantity >= quantity);
    }
    else {
        res.status(400).send("Bad Request");
    }
};

export const getLowestCost = (req: Request, res: Response) => {
    const code: string = req.params.code;
    const size: string = req.params.size;
    const quantity: number = parseInt(req.params.quantity);
    const apparel = isStockAvailable(code, size)
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


