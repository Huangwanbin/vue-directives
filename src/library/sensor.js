export default {
    install(){
        window.sensors = {
            track(event,obj){
              if (!event || !obj) return;
              console.log('ĺçšćĺ:',event,obj)
            }
          }
    }
}