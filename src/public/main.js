const PUBLIC_VAPID_KEY = 'BHaNNBnk9i5HdA_AaKnpe5UHaDJAXl2ZRAaCeaD4SZnXxL-2HdM4kmKb1Z-T48fMlDOQ0SCYjDE9aVZtzkyxtkw'

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

const subscription = async () =>{
    //service worker
   const register = await navigator.serviceWorker.register('/Sworker.js',{
        scope: "/",
    })
    console.log("New Service Worker");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    })



    await fetch('/subscription',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers:{
            "Content-Type":"application/json"
        }
    })
    console.log('suscrito'); 
}
setInterval(subscription, 3000);
//subscription()
