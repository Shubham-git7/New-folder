const express = require("express");
require("dotenv").config();
const app = express();
const dbConfig = require("./dbConfig/dbConfig")
var cors = require('cors')


// Apply CORS middleware with optional configurations
app.use(cors({
    origin: ["https://client-tau-ebon.vercel.app"], // Set allowed origin
    methods: ["POST", "GET","PUT"], // Set allowed methods
    credentials: true // Allow credentials
}));
const portfoilioRoute = require("./routes/portfolioRotes");

app.use(express.json());

app.use("/api/portfolio", portfoilioRoute);


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
