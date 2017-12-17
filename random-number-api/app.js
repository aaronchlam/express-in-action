const express = require("express");
const logger = require("morgan");

app = express();

app.use(logger("dev"));

app.get("/random", (req, res) => {
    const min = parseInt(req.query.min);
    const max = parseInt(req.query.max);

    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        return res.json({ error: "Bad request." });
    } else if (min >= max) {
        res.status(400);
        return res.json({ error: "max must be greater than min." })
    }

    const result = Math.floor(Math.random() * (max - min) + min);
    return res.json({ result });
});

app.listen(3000, () => {
    console.log("App started on port 3000");
});
