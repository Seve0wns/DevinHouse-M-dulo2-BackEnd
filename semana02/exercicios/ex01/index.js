import express from "express";
import uuid4 from "uuid4";
import cors from "cors";

const app=express();
const PORT=3333;
app.use(express.json());
app.use(cors());

const pizzas=[];
let orders=[];

app.get("/pizzas",(req,res)=>{
    const name=req.query.name?.toLowerCase()||"";
    res.json(
        pizzas.filter(pizza=>pizza.name.toLowerCase().includes(name))
    );
});
app.post("/pizzas",(req,res)=>{
    const {name,description,price,ingredients}=req.body;
    const newPizza={id:uuid4(),name,description,price,ingredients}
    if(name&&description&&price&&ingredients.length){
        pizzas.push(newPizza);
        return res.status(201).json(pizzas.at(pizzas.length-1));
    }
    res.status(400).json({message:"Um ou mais campos inválidos"});
});

app.get("/solicitations",(req,res)=>{
    const status=req.query.status?.toLowerCase()||"";
    res.json(orders.filter(order=>order.status.toLowerCase().includes(status)));
});
app.get("/solicitation/:id",(req,res)=>{
    const id=req.params.id||"";
    res.json(orders.filter(order=>order.id===id));
});
app.post("/solicitations",(req,res)=>{
    const {name,cpf,address,phone,payment,obs,order}=req.body;
    const newOrder={id:uuid4(),name,cpf,address,phone,payment,obs:obs||"",order,status:"in production"};
    newOrder.order=order.map(pizzaID=>pizzas.find(pizza=>pizza.id===pizzaID));
    if(name&&cpf&&address&&phone&&payment&&order.length){
        orders.push(newOrder);
        return res.status(201).json(orders[orders.length-1]);
    }
    res.json({message:"Um ou mais campos inválidos"});
});
app.put("/solicitation/:id",(req,res)=>{
    const id=req.params.id||"";
    const newStatus=req.body.status;
    if(!newStatus) return res.status(400).json({message:"Status inválido."});
    const order=orders.find((order)=>order.id===id)
    if(!order) return res.status(404).json({message:"Pedido não encontrado."});
    order.status=newStatus;
    res.json(order);
});
app.delete("/solicitation/:id",(req,res)=>{
    const id=req.params.id||"";
    orders=orders.filter(order=>order.id!==id);
    res.json("Pedido cancelado!");
})

app.listen(PORT,()=>{
    console.log("Online");
})