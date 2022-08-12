const express = require('express')
const app = express()
let cors = require("cors");


app.use(cors());


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})


/**
 * Import MongoClient & connexion à la DB
 */
 const MongoClient = require('mongodb').MongoClient;
 const url = 'mongodb://localhost:27017';
 const dbName = 'coachingAPI';
 let db
  
 MongoClient.connect(url, function(err, client) {
     if (err) {
         console.log("error", err)
     }
   console.log("Connected successfully to server");
   db = client.db(dbName);
 });

 app.listen(8000,() =>{
    console.log('serveur a lécoute')
})
app.use(express.json())
//matchs
app.get('/equipe', (req,res) => {
    db.collection('equipe').find({}).toArray()
        .then(docs => res.status(200).json(docs))
        .catch(err => {
            console.log(err)
            throw err
        })
})
//GET equipe BYID
app.get('/equipe/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    try {
        const docs = await db.collection('equipe').find({id}).toArray()
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})
app.post('/equipe', async (req,res) => {
    try {
        const parkingData = req.body
        const parking = await db.collection('equipe').insertOne(parkingData)
        res.status(200).json(parking)
    } catch (err) {
        console.log(err)
        throw err
    }
    
})

//joueurs
//GET LES JOUEUR BY ID
app.get('/joueur/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    try {
        const docs = await db.collection('joueur').find({id}).toArray()
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})

//GET les noms des joueurs
app.get('/joueur', (req,res) => {
    db.collection('joueur').find({}).toArray()
        .then((docs) =>{ 
            console.log(docs)
            //  let tab = docs.map( item => ({name:item.nom,equipe:item.equipee,position:item.poste}))
             return res.status(200).json(docs)} )
        .catch(err => {
            console.log(err)
            throw err
        })
})



//GET joueur BY POSTE

app.get('/joueur/poste/:poste', (req,res) => {
    let poste=req.params.poste
    db.collection('joueur').find({poste}).toArray()
        .then((docs) =>{ 
             let tab = docs.map( item => item.nom)
             return res.status(200).json(tab)} )
        .catch(err => {
            console.log(err)
            throw err
        })
})




//GET joueur BY EQUIPE

app.get('/joueur/equipe/:equipee', (req,res) => {
    let equipee=req.params.equipee
    db.collection('joueur').find({equipee}).toArray()
        .then((docs) =>{ 
            
             return res.status(200).json(docs)} )
        .catch(err => {
            console.log(err)
            throw err
        })
})





//POST

app.post('/joueur', async (req,res) => {
    try {
        const parkingData = req.body
        const parking = await db.collection('joueur').insertOne(parkingData)
        res.status(200).json(parking)
    } catch (err) {
        console.log(err)
        throw err
    }
    
})
//PUT
app.put('/joueur/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const replacementParking = req.body
        const parking = await db.collection('joueur').replaceOne({id},replacementParking)
        res.status(200).json(parking)
    } catch (err) {
        console.log(err)
        throw err
    }
})
//DELETE
app.delete('/joueur/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const parking = await db.collection('joueur').deleteOne({id})
        res.status(200).json(parking)
    } catch (err) {
        console.log(err)
        throw err
    } 
})