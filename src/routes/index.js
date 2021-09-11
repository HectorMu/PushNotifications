const { Router, json } = require('express')
const router = Router()

const webpush = require('../webpush')
let pushSub


const user ={
    id:2,
    privileges:"Mesero"
}

const esMesero =(req, res, next) =>{
    if(user.privileges === "Mesero"){
        console.log('Authoriced');
        return next()
    }else{
        res.status(401)
        console.log('Reached. cant see notification');
        return res.send('No notificacion')

    }
}
const esRepartidor =(req, res, next) =>{
    if(user.privileges === "Repartidor"){
        console.log('Authoriced');
        return next()
    }else{
        res.status(401)
        console.log('Reached. cant see notification');
        return res.send('No notificacion')

    }
}
//to send notifications to a specific user, we can get the id, name etc.
const isUser =(req, res, next) =>{
    const {iduser} = req.body
    console.log(iduser);
    if(user.id == iduser){
        console.log('Authoriced');
        return next()
    }else{
        res.status(401)
        console.log('Reached. cant see notification');
        return res.send('No notificacion')
    }
}

router.post('/subscription',async(req, res)=>{
    pushSub = req.body
    // const payload = JSON.stringify({
    //     title:'My custom notification',
    //     message:'Hello World'
    // })
    // try{
    //     await webpush.sendNotification(pushSub,payload)
    // }catch(error){
    //     console.log(error);
    // }

})

router.post('/cocina-message',esMesero,async(req, res)=>{

    const{message} = req.body;
    const payload = JSON.stringify({
        title:'Mensaje de cocina',
        message: message
    })
    try{
        await webpush.sendNotification(pushSub,payload)
    }catch(error){
        console.log('Paso algo');
    }
})

router.post('/pedido-message',isUser,async(req, res)=>{

    const {message}  = req.body;
    const payload = JSON.stringify({
        title:'Pedido listo',
        message: message
    })
    try{
        await webpush.sendNotification(pushSub,payload)
    }catch(error){
        console.log('xd');
    }
})





module.exports = router
