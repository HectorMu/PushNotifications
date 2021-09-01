const { Router } = require('express')
const router = Router()

const webpush = require('../webpush')
let pushSub

router.post('/subscription',async(req, res)=>{
    pushSub = req.body
    const payload = JSON.stringify({
        title:'My custom notification',
        message:'Hello World'
    })
    await webpush.sendNotification(pushSub,payload)
})





module.exports = router