// import   csvtojson  from  'csvtojson';
// import  fs from 'fs';
// const  csvfilepath = "./sports.csv";
// csvtojson()
//           .fromFile(csvfilepath)
//           .then((json)=>{

//             console.log(json)
//             fs.writeFileSync("sportsstojs12.json",JSON.stringify(json), "utf-8", (err) =>{
//                 if(err)console.log(err);
//             })
//           })


import csvtojson from 'csvtojson';
import fs from 'fs';

const csvFilePaths = [
  "./sports.csv",
  "./tech.csv",
  "./world.csv",
  "./business.csv",
  "./home.csv"
];

csvFilePaths.forEach(csvFilePath => {
  csvtojson()
    .fromFile(csvFilePath)
    .then((json) => {
      const jsonFilePath = csvFilePath.replace('.csv', '.json');
      fs.writeFileSync(jsonFilePath, JSON.stringify(json), "utf-8", (err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log(`Converted ${csvFilePath} to ${jsonFilePath}`);
    });
});
