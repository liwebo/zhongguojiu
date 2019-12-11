function ajaxGet(url, cb, data) {
    // 0.处理默认值，保证data绝对是一个对象
    data = data || {};
    // 1，解析并接收数据
    var str = "";
    for (var i in data) {
        str = str + i + "=" + data[i] + "&";
    }
    //  2将拼接好的数据，在拼接到URL上 并拼接时间戳
    //  console.log(str.slice(0,str.length-1));
    // url = url + "?" + str.slice(0,str.length-1);

    var d = new Date();
    url = url + "?" + str + "__qft" + d.getTime();

    //   3.开启ajax的过程
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cb(xhr.responseText);
            // console.log(xhr.responseText);
        }
    }
    xhr.send();
}





function ajaxPost(url, cb, data) {
    data = data || {};

    //    解析数据
    var str = "";
    for (var i in data) {
        str += `${i}=${data[i]}&`;
    }
    str = str.slice(0, str.length - 1);
    // console.log(str);

    // get的数据要拼接到URL上  post不是

    // 开启ajax
    var ajax = new XMLHttpRequest();
    ajax.open("post", url, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            cb(ajax.responseText);
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    ajax.send(str);
}



// jsonp的垮域接口
function jsonp(url, cb, data) {
    // 1解析数据
    // data = data || {};
    var str = "";
    for (var i in data) {
        str += `${i}=${data[i]}&`;
    }
    url = url + "?" + str;

    //  2创建script标签
  var script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
  window[data[data.colName]] = function(res){
      cb(res);
  }
}



