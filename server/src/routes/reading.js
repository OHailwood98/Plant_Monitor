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
        temperature: data.temp,
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

    for(var i=0; i < 3; i++){

        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth();
        var yyyy = date.getFullYear();
        var dateTime = new Date(yyyy,mm,dd,hour,min);

        dateTime.setDate(dateTime.getDate() -i);
        const reading = new Reading({
            deviceID: data.deviceID,
            temperature: data.temp,
            moisture: data.moisture,
            humidity: data.humidity,
            light: data.light,
            time: dateTime
        });
        reading.save();
    }

    res.status(400).json({ errors: "its fucked"});
})

router.get("/getOneDay", (req, res) =>{
    var lte = new Date();
    lte.setHours(0);
    lte.setMinutes(0);

    var gte = new Date();
    gte.setHours(0);
    gte.setMinutes(0);
    gte.setDate(gte.getDate()-1);
    
    var timeArray = [];
    var averageTimes = [];

    Reading.find({time:{$gte: gte.toISOString(), $lte: lte.toISOString()}})
        .sort({time:-1})
        .then(times =>{
            times.forEach(time=>{
                var newTime = {
                    deviceID: time.deviceID,
                    moisture: time.moisture,
                    humidity: time.humidity,
                    light: time.light,
                    time: time.time
                }
                timeArray.push(newTime)
            })
            for(var i=0; i < 24; i++){
                var time = getHourAverages(timeArray, i)
                averageTimes.push(time)
            }
            res.status(200).json({ timeList: averageTimes });
        })
        .catch(err => {
            console.dir(err)
            res.status(400).json({ errors: err.errors })});
});

function getHourAverages(times, hour){
    var chosenTimes = [];
    times.forEach(time =>{
        if(time.time.getHours()===hour){
            chosenTimes.push(time)
        }
    })
    if(chosenTimes.length ===0){
        var averageReading = {
            deviceID: 0,
            moisture: 0,
            temperature: 0,
            humidity: 0,
            light: 0,
            time: 0
        }
        return(averageReading)
    }else{
        var average = averageReadings(chosenTimes);
        average.time.setMinutes(0);
        return(average);
    }
    
}

function averageReadings(times){
    var len = times.length;
    var id = times[0].deviceID;

    var moisture = 0;
    var temperature = 0;
    var humidity = 0;
    var light = 0;

    times.forEach(time => {
        moisture += time.moisture;
        temperature += time.temperature;
        humidity += time.humidity;
        light += time.light;
    });

    moisture = moisture/len;
    temperature = temperature/len;
    humidity = humidity/len;
    light = light/len;

    var averageReading = {
        deviceID: id,
        moisture: moisture,
        temperature: temperature,
        humidity: humidity,
        light: light,
        time: times[0].time
    }

    return(averageReading)
}

export default router;