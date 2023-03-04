'use strict'
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const futbolistaSchema= new Schema({
    id:String,
    nombre:String,
    equipo:String,
    liga:String,
    nacionalidad:String,
    goles:String
})

//Creamos el modelo
const Futbolista=mongoose.model('Futbolista',futbolistaSchema,"futbolista");
module.exports=Futbolista;