const express = require("express");
const cors = require("cors");

const holdingsRoutes = require("./routes/holdings");
const calcRoutes = require("./routes/calc");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/holdings", holdingsRoutes);
app.use("/api/calc", calcRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
