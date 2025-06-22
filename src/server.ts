// import {Server} from "http";
import app from "./app";
import mongoose from "mongoose";
// let server:Server;
const PORT = 5000;

async function main(){
try{

  await mongoose.connect('mongodb+srv://library:library@cluster0.ungcn7e.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0')
  
    app.listen(PORT, ()=>{
        console.log(`Liberary management is running port ${PORT}`);
    })

}
catch(error){
    console.log(error);
}

}

main();