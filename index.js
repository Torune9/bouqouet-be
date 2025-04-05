require("dotenv").config();

const express = require("express");
const mainRouter = require("./src/router/main");
const app = express();
const port = 3000;

const cors = require('cors')

const urlEncode = express.urlencoded({
    extended: true,
});

app.use(cors())

app.use(express.json());

app.use(urlEncode);

app.use("/api/v1/", mainRouter);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.get('/', (req, res) => res.send('Hello from Vercel'));


// app.listen(port, () => {
//     console.log(`server running on port ${port}`);
// });
