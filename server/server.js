const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
var multer = require('multer');
var upload = multer();


app.use("/", routes);

app.post('/addQuestionFromCsv', upload.array('quesFile'), async (req, res) => {
  if(!req.files[0]) res.send({message:"No File Received"});
  else if(req.files[0].originalname.split('.')[req.files[0].originalname.split('.').length-1]!=='csv'  ) res.send({message:"Invalid"});
  else{
  let fileBuffer = req.files[0].buffer
  console.log(req.files[0])
  var fs = require('fs'); 
  var parse = require('csv-parse');
  var csvData=[];
  fs.writeFileSync(`public/${"temp"}.csv`, fileBuffer)

    fs.watch(`public`, (eventType, filename) => { 
        console.log("\nThe file", filename, "was modified!"); 
    });



  fs.createReadStream(`public/${"temp"}.csv`)
      .pipe(parse({delimiter: ','}))
      .on('data', (csvrow)=> {
          csvData.push(csvrow);        
      })
      .on('end',() => {
        var obj = [];
        for(var i=1;i<csvData.length;i++)
        {
          var temp={};
          var curr=csvData[i];
          var head=csvData[0];
          // console.log(head);
          // console.log(curr);
          for(var j=0;j<head.length;j++)
          {
            temp[head[j]]=curr[j];
          }
          obj.push(temp);
        }
        console.log(obj);
        res.send(obj);
        fs.unlinkSync(`public/${"temp"}.csv`);
      }).on('error',(err)=>{
        res.status(500).send({error:err})
      }) ;
    }
})



const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
