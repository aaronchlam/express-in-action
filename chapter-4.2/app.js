const express = require("express");
const logger = require("morgan");
const path = require("path");
const fs = require("fs");

const app = express();

// Logging middleware
app.use(logger("short"));
// app.use((req, res, next) => {
//     console.log(`Request IP: ${req.ip}`);
//     console.log(`Request date: ${new Date()}`);
//     next();
// });

// Static file server middleware
app.use(express.static(path.join(__dirname, "public")));
// app.use((req, res, next) => {
//     const filePath = path.join(__dirname, "public", req.url);
//     fs.stat(filePath, (err, stats) => {
//         if (!err && stats.isFile()) {
//             res.sendFile(filePath);
//         } else {
//             next();
//         }
//     });
// });

// Handle 404 errors
app.use((req, res) => {
    res.status(404);
    res.send("File not found!");
});

app.listen(3000, () => {
    console.log("App started on port 3000");
});
