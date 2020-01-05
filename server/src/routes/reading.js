import express from "express"
import Reading from "../models/reading"

const router = express.Router();

router.post("/add", (req,res) =>{
    const {data} = req.body;

    var date = new Date();
    console.log("dateTime:"+ date);

    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();
    var hour = data.time.split(":")[0];
    var min = data.time.split(":")[1];

    var dateTime = new Date(yyyy,mm,dd,hour,min);

    const reading = new Reading({
        deviceID: data.deviceID,
        temperature: data.temperature,
        moisture: data.moisture,
        humidity: data.humidity,
        light: data.light,
        time: dateTime
    });

    console.log(dateTime);

    reading.save()
            .then(reading =>{
                res.status(200).json({success:true});
            })
            .catch(err => res.status(400).json({ errors: err.errors }));
});

router.post("/addmany", (req,res) =>{
    const {data} = req.body;

    var hour = data.time.split(":")[0];
    var min = data.time.split(":")[1];

    for(var i=0; i < 7; i++){

        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth();
        var yyyy = date.getFullYear();
        var dateTime = new Date(yyyy,mm,dd,hour,min);

        dateTime.setDate(dateTime.getDate() -i);
        const reading = new Reading({
            deviceID: data.deviceID,
            temperature: data.temperature,
            moisture: data.moisture,
            humidity: data.humidity,
            light: data.light,
            time: dateTime
        });
        reading.save();
    }

    res.status(400).json({ errors: "its fucked"});
})

router.get("/getToday", (req, res) =>{
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    console.log(date)
});



export default router;