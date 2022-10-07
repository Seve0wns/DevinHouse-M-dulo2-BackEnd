import express from "express";
import uuid4 from "uuid4";

const app=express();
const PORT=3333;
app.use(express.json())

const pizzas=[];
const orders=[];

app.get("/pizzas",(req,res)=>{
    const name=req.query.name?.toLowerCase()||"";
    res.json(
        pizzas.filter(pizza=>pizza.name.toLowerCase().include(name))
    );
});
app.post("/pizzas",(req,res)=>{
    const {name,description,price,ingredients}=req.body;
    const newPizza={name,description,price,ingredients}
    if(name&&description&&price&&ingredients.length){
        pizzas.push(newPizza);
        return res.status(201).json(pizzas.at(pizzas.length-1));
    }
    res.status(400).json({message:"Um ou mais campos inválidos"});
});

app.get("/solicitations",(req,res)=>{
    res.json(orders);
});
app.get("/solicitations/:id",(req,res)=>{
    const id=req.params.id||"";
    res.json(orders.filter(order=>order.id===id));
});
app.post("/solicitations",(req,res)=>{
    const {name,cpf,address,phone,payment,obs,order}=req.body;
    const newOrder={id:uuid4(),name,cpf,address,phone,payment,obs:obs||"",order};
    if(name&&cpf&&address&&phone&&payment&&order.length){
        orders.push(newOrder);
        return res.status(201).json(orders.at(pizzas.length-1));
    }
    res.json({message:"Um ou mais campos inválidos"});
})

app.listen(PORT,()=>{
    console.log("Online");
})