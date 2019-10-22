const mongoose = require('mongoose');
const fs = require('fs');


const DataSchema = new mongoose.Schema({
    aqm: {
        r3000: Number,
        r5000: Number,
        noxevent: Number,
        r2000: Number,
        coevent: Number
    },
    gps: {
        system_time: String,
        gps_time: String,
        latitude: Number,
        longitude: Number
    }
})
const dataData = mongoose.model('aqmpoints', DataSchema);

mongoose.connect("mongodb://localhost:27017/sensordata", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});


const searchQuery1 = {'aqm.noxevent':{$gte: 50}}; // '$gte" = greater than equal
const searchQuery2 = {'gps.system_time': {$gte: "2018-02-06 14:28:40.581219"}};
//const searchStr = process.argv.q;
//const subStr = new RegExp(searchStr.toLowerCase(),"i")



let stringCSV = "AQM r3000, AQM r5000, AQM noxevent, AQM r2000, AQM coevent, GPS system_time, GPS gps_time, GPS latitude, GPS longitude \n";

let createTableCsv = (data) => {
    for(obj of data){
        console.log(obj.aqm.r3000, obj.aqm.r5000, obj.aqm.noxevent, obj.aqm.r2000, obj.aqm.coevent, obj.gps.system_time, obj.gps.gps_time, obj.gps.latitude, obj.gps.longitude);
        stringCSV += `${obj.aqm.r3000},${obj.aqm.r5000},${obj.aqm.noxevent},${obj.aqm.r2000},${obj.aqm.coevent},${obj.gps.system_time},${obj.gps.gps_time},${obj.gps.latitude},${obj.gps.longitude}\n`
    }
    console.log(stringCSV)
    return stringCSV;
}

(async() => {
    const data = await dataData.find(searchQuery1)
    //console.log(data[0]);
    
    let table = createTableCsv(data);
    await fs.writeFileSync('./table.csv', table)
    console.log('DONE')
})()


