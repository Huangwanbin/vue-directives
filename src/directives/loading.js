//创建蒙层，样式自行修改
function createMask() {
    const ele = document.createElement("div");
    ele.style.position = "absolute";
    ele.style.top = 0;
    ele.style.right = 0;
    ele.style.bottom = 0;
    ele.style.left = 0;
    ele.style.zIndex = 9999;
    ele.style.display = "flex";
    ele.style.justifyContent = "center";
    ele.style.alignItems = "center";
    ele.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    ele.innerHTML = "加载中...";
    return ele;
  }
  
  const mask = createMask();
  let mountedFlag = false;//开关，是否已经出现过loading
  //添加 | 删除 loading
  function checkLoading(node, isLoading) {
    if (node) {
      //展示loading
      if (isLoading) {
        node.style.position = "relative";
        node.appendChild(mask);
        mountedFlag = true;
      } else if (mountedFlag) {
        //关闭loading
        node.removeChild(mask);
        mountedFlag = false;
      }
    }
  }
  
  const loading = {
    inserted(el, { value }) {
      checkLoading(el, value);
    },
    update(el, { value }) {
      checkLoading(el, value);
    },
  };
  
  export default loading;
  