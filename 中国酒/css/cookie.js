// 设置cookie的封装
function setCookie(key,val,options){
    //   1设置options的默认值为对象
      options = options || {};
    //   2解析options身上的path属性
      if(options.path){
        var p = ";path=" + options.path;
      }else{
          var p = "";
      }
    //   3解析option身上的expires属性
      if(options.expires){
          var d = new Date();
          d.setDate(d.getDate()+options.expires)
          var e = ";expires="+d;
      }else{
          var e = "";
      }
    //   4设置cookie，拼接字符
      document.cookie = key + "=" + val + e + p;
  }



  // 删除cookie封装
function removeCookie(key,options){
    options = options || {};
    // var d = new Date();
    // d.setDate(d.getDate()-1);
    // 设置cookie，相同的名字，值无所谓，有限期修改
    setCookie(key,23143,{
        expires:-1,
        path:options.path
    })
}
// removeCookie("a",{ 
//     path:"/1911"
// });



//  获取cookie 根据名字来渎值
function getCookie(key){
    var arr = document.cookie.split("; ");
    for(var i = 0;i<arr.length;i++){
      if(arr[i].split("=")[0] == key){
        return arr[i].split("=")[1];
      }
    }
    return "";
  }
  // console.log(getCookie("e"));