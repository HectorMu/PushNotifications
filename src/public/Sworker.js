self.addEventListener('push',e =>{
    const data = e.data.json()
    console.log(data);
    self.registration.showNotification(data.title,{
        body: data.message, 
        icon:'https://pbs.twimg.com/profile_images/1280149050965331968/MmdsLqBZ_400x400.jpg'
    })
})
