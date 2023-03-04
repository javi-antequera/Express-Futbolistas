const express=require('express');
const router=express.Router();
const Futbolista=require('../../models/Futbolista');


router.get('/', async (req,res)=>{

    try{
        const arrayFutbolistaDB= await Futbolista.find();
        console.log(arrayFutbolistaDB);
        res.render("futbolista",{
            arrayFutbolista:arrayFutbolistaDB
        })
    }catch(error){
        console.error(error)
    }
})

router.get('/crear',(req,res)=>{
    res.render('crear')
})

router.post('/', async (req,res)=>{
    const body=req.body

    console.log(body)
    try{
        const futbolistaDB=new Futbolista(body)

        await futbolistaDB.save()
        res.redirect('/')
    }catch(error){
        console.log('error',error)
    }
})

router.get('/:id',async(req,res)=>{
    const id=req.params.id

    try{
        const FutbolistaDB=await Futbolista.findOne({_id:id})

        console.log(FutbolistaDB)
        res.render('detalle',{
            futbolista:FutbolistaDB,
            error:false
        })
    }catch(error){
        console.log('Se ha producido un error', error)
        res.render('detalle',{
            error:true,
            mensaje:'Futbolista no encontrado!'
        })
    }
})

router.delete('/:id', async(req,res)=>{
    const id=req.params.id;
    console.log('_id desde backend',id)
    try{
        const FutbolistaDB =await Futbolista.findByIdAndDelete({_id:id});
        console.log(FutbolistaDB)

        if(!FutbolistaDB){
            res,json({
                estado:false,
                mensaje:'No se puede eliminar al Futbolista'
            })
        }else{
            res.json({
                estado:true,
                mensaje:'Futbolista eliminado.'
            })
        }
    }catch(error){
        console.log(error)
    }
})

router.put('/:id', async(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    console.log(id)
    console.log('body',body)
    try{
        const FutbolistaDB =await Futbolista.findByIdAndUpdate(
            id,body,{useFindAndModify:false}
        )
        console.log(FutbolistaDB)
        res.json({
            estado:true,
            mensaje:'Futbolista editado.'
        })

    }catch(error){
        console.log(error)
        res.json({
            estado:false,
            mensaje:'Problema al editar el Futbolista'
        })
    }
})

module.exports=router;