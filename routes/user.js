const express = require('express')
const router = express.Router()
const {mongodb,dbName,dbUrl} = require('../config/dbconfig')

const MongoClient = mongodb.MongoClient
const client = new MongoClient(dbUrl)

router.get('/',async(req,res)=>{
    await client.connect()
    try{
        let db = await client.db(dbName)
        let data = await db.collection('users').find().toArray()
        
        res
        .status(200)
        .send({
            message:"Data Fetch Successfull",
            data
        })
}catch (error){
    res
    .status(500)
    .send({
        message:"Internal Server Error"
    })
}
   finally{
    client.close()
   }
})

router.get('/:id',async(req,res)=>{
    await client.connect()
    try{
        let db = await client.db(dbName)
        let data = await db.collection('users').findOne({_id: new mongodb.ObjectId(req.params.id)})
        if(data)
        {
        res
        .status(200)
        .send({
            message:"Data Fetch Successfully",
            data
        })
        }
        else
        {
            res
            .status(400)
            .send({message:'invalid id'})
        }
        
}catch (error){
    res
    .status(500)
    .send({
        message:"Internal Server Error"
    })
}
   finally{
    client.close()
   }
})

router.post('/',async(req,res)=>{
    await client.connect()
    try{
        let db = await client.db(dbName)
        let data = await db.collection('users').insertOne(req.body)
        res
        .status(200)
        .send({
            message:"Data saved Successfully",
        
        })
}catch (error){
    res
    .status(500)
    .send({
        message:"Internal Server Error"
    })
}
   finally{
    client.close()
   }
})



router.put('/:id',async(req,res)=>{
    await client.connect()
    try{
        let db = await client.db(dbName)
        let data = await db.collection('users').updateOne({_id: new mongodb.ObjectId(req.params.id)},{$set:req.body})
        
        res
        .status(200)
        .send({
            message:"user updated Successfully",
            data
        })
       
        }
    catch (error){
    res
    .status(500)
    .send({
        message:"Internal Server Error"
    })
}
   finally{
    client.close()
   }
})


router.delete('/:id',async(req,res)=>{
    await client.connect()
    try{
        let db = await client.db(dbName)
        let data = await db.collection('users').deleteOne({_id: new mongodb.ObjectId(req.params.id)})
        
        res
        .status(200)
        .send({
            message:"user deleted Successfully",
            
        })
       
        }
    catch (error){
    res
    .status(500)
    .send({
        message:"Internal Server Error"
    })
}
   finally{
    client.close()
   }
})

module.exports = router