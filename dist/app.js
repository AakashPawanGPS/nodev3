"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apparelRoutes_1 = __importDefault(require("./routes/apparelRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3200;
app.use(body_parser_1.default.json());
app.use('/api/stocks', apparelRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
