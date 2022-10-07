import axios from "axios";
import express from "express";

const app=express();


async function getFunction(){
    const res=await axios.get("https://api.github.com/users/Seve0wns/repos");
    console.log(res.data[0]);
}

app.get("/",(req,res)=>{
    res.send("Deu!");
})

app.listen(5555,()=>{
    console.log("Online");
})

