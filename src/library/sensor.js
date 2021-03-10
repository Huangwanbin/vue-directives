export default {
    install(){
        window.sensors = {
            track(event,obj){
              if (!event || !obj) return;
              console.log('埋点成功:',event,obj)
            }
          }
    }
}