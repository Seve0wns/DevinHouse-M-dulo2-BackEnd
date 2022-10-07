import express from "express";

const app=express();
const PORT=3333;
app.use(express.json())

const pizzas=[];

app.get("/pizzas",(req,res)=>{
    const name=req.query.name?.toLowerCase()||"";
    res.json(
        pizzas.filter(pizza=>pizza.name.toLowerCase().include(name))
    );
});

app.post("/pizzas",(req,res)=>{
    pizzas.push(req.body);
    res.status(201).json(pizzas.at(pizzas.length-1));
});

app.listen(PORT,()=>{
    console.log("Online");
})