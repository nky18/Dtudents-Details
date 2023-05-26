const dbConfig = require("./config/db.config");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const getAllRoutes = require("./routes/all_app_routes.routes");
const cors = require('cors')


var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
 app.use(express.json());



mongoose.connect(dbConfig.url,{
    useNewUrlParser : true,
}).then(
    ()=>{
        console.log("Database Connected Successfully");
    }
).catch(err=>{
    console.log("Database can't be connected")
})
getAllRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))