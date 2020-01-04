import express from "express"
import Reading from "../models/reading"

const router = express.Router();

router.post("/add", (req,res) =>{
    const {data} = req.body;
    console.dir(data);

    var date = new Date();
    console.log("dateTime:"+ date);

    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    
    console.log("date:"+dd+"/"+mm+"/"+yyyy);

    const reading = new Reading({
        deviceID: data.deviceID,
        temperature: data.temperature,
        moisture: data.moisture,
        humidity: data.humidity,
        light: data.light,

    })
    res.status(400).json({error:"its fucked"})
});

export default router;