const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
//err handler
server.use((err,req,res,next)=>{
    res.status(500).json({
        message:"sth wrong,try later"
    })
});

server.get('/',async (req,res,next)=>{
    try{ 
        const budgets = await db("accounts");
        res.json(budgets)

    }catch(err){
       next(err)
        // res.status(500).json({ message: 'The item not found in server' })
    }
})

server.get('/:id',async (req,res)=>{
    try{
        const budget = await db("accounts")
        .where("id",req.params.id)
        .first();
        res.status(201).json(budget)

    }catch(err){
     next(err)
    }
})

server.post('/',async (req,res,next)=>{
    try{
    const [id] = await db.insert({
          name:req.body.name,
          budget:req.body.budget
         }).into("accounts");
    const newBudget = await db("accounts").where("id",id).first();
    res.status(201).json(newBudget)

    }catch(err){
        next(err)
    }
})

server.delete('/:id',async (req,res,next)=>{
    try{
        const delBudget = await db("accounts").where("id",req.params.id).del();
        res.status(201).json(delBudget)

    }catch(err){
        next(err)
    }
})

server.put('/:id',async (req,res,next)=>{
    try{
        const upBudget = await db("accounts").where("id",req.params.id).update({
            name:req.body.name,
            budget:req.body.budget    
        });
        res.status(201).json(upBudget)
    }catch(err){
        next(err)
    }
})
module.exports = server;
