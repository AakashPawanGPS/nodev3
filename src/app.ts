import express from "express";
import apparelRoutes from "./routes/apparelRoutes";
import orderRoutes from "./routes/orderRoutes";
import bodyParser from 'body-parser';

const app = express();
const PORT = 3200;

app.use(bodyParser.json());

app.use('/api/stocks', apparelRoutes);

app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})