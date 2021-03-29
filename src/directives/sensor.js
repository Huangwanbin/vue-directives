const sensor = {
    // 当被绑定的元素插入到 DOM 中时
    inserted: function (el,binding) {
        let sensorObj = binding.value ,showObj={ name :'',value:''} ,clickObj= {name:'',value:''};
        if (!Object.prototype.toString.call(sensorObj) === '[object Object]'|| JSON.stringify(sensorObj) == "{}") return
        console.log(sensorObj);
        for (const key in sensorObj) {
            if (Object.hasOwnProperty.call(sensorObj, key)) {
                switch (key) {
                    case 'el':
                        showObj.name= 'ElementShow';
                        showObj.value= sensorObj[key]
                        break;
                    case 'pop':
                        showObj.name= 'PopupTrack';
                        showObj.value= sensorObj[key]
                        break;
                    case 'elClick':
                        clickObj.name= '$WebClick';
                        clickObj.value= sensorObj[key]
                        break;
                    case 'popClick':
                        clickObj.name= 'PopupBtnClick';
                        clickObj.value= sensorObj[key]
                        break;  
                    default:
                        break;
                }
            }
        }
        console.log('v-sensor',binding.value,showObj,clickObj);
        // 聚焦元素
        showObj.name && showObj.value && sensors.track(showObj.name, {
            FileName: showObj.value
        });
        if (clickObj.name && clickObj.value) {
            el.handler = function (clickObj) {
                clickObj.name === '$WebClick' && sensors.track(clickObj.name, {
                    $element_name: clickObj.value
                });
                clickObj.name === 'PopupBtnClick' && sensors.track(clickObj.name, {
                    FileName: clickObj.value
                });
            }
            el.addEventListener('click',el.handler)
        }
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
        el.handler && el.removeEventListener('click', el.handler)
    }
}
  
  export default sensor
    
  