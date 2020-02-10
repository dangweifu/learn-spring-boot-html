var apiUrl = "http://localhost/api";
var imgUrl = "http://localhost/file/";
var imgUrlUeditor = "http://localhost/api/ueditor/config";
var webserviece_api = 'http://localhost/'; // webservice 接口
var collectUrl = "http://localhost/collect";
//ajax 对应实体类的方法
//CgMemberEntity cgMemberEntity
function ajax(type, url, data, success, error) {
  var _self = $(this);
  _self.off('click', ajax);

  Cookies.get('token');
  $.ajax({
    headers: {
      token: Cookies.get('token') || ''
    },
    url: apiUrl + url,
    type: type,
    data: data,
    success: function (res) {
        _self.on('click', ajax);
        if(res.code==401){
          layer.msg(res.msg);
          Cookies.remove("token");
          window.location.href = "/login.html";
        }
        success && success(res)
    },
    error: function (err) {
      // alert("报错了")
      _self.on('click', ajax);
      error && error(err)
    }
  });
}

//ajaxRaw json请求的方法
//@RequestBody LoginForm form
function ajaxRaw(type, url, data, success, error) {

  var _self = $(this);
  _self.off('click', ajax);

  $.ajax({
    url: apiUrl + url,
    headers: {
      token: Cookies.get('token') || '',
      'Content-Type': 'application/json'
    },
    type: type,
    data: data,
    dataType: "json",
    success: function (res) {
       _self.on('click', ajax);

      if(res.code==401){
        layer.msg(res.msg);
        Cookies.remove("token")
        window.location.href = "/login.html";
      }
      success(res)
    },
    error: function (err) {
      _self.on('click', ajax);
      error && error(err)
    }
  });
}

function ajaxNoToken(type, url, data, success, error) {
    var _self = $(this);
    _self.off('click', ajax);

    $.ajax({
        url: apiUrl + url,
        type: type,
        data: data,
        success: function (res) {
          _self.on('click', ajax);

          if(res.code==401){
            // layer.msg(res.msg);
            Cookies.remove("token")
            window.location.href = "/login.html";
          }
          success && success(res)
        },
        error: function (err) {
          _self.on('click', ajax);
          // alert("报错了")
          error && error(err)
        }
    });
}

/**
 * 同步的ajax请求
 */
function ajaxAsync(type, url, data, success, error) {
    var _self = $(this);
    _self.off('click', ajax);

    $.ajax({
        url: apiUrl + url,
        headers: {
            token: Cookies.get('token') || '',
            'Content-Type': 'application/json'
        },
        type: type,
        data: data,
        async:false,
        dataType: "json",
        success: function (res) {
          _self.on('click', ajax);

          if(res.code==401){
            // layer.msg(res.msg);
            Cookies.remove("token")
            window.location.href = "/login.html";
          }
            success(res)
        },
        error: function (err) {
          _self.on('click', ajax);
          // alert("报错了")
          error && error(err)
        }
    });
}

//图片上传
function ajaxImg(url, formdata, success, error) {
  var _self = $(this);
  _self.off('click', ajax);

  $.ajax({
    url: apiUrl + url,
    type: 'post',
    contentType: false,
    data: formdata,
    processData: false,
    success: function (res) {
      _self.on('click', ajax);
      if(res.code==401){
        // layer.msg(res.msg);
        Cookies.remove("token")
        window.location.href = "/login.html";
      }
      success && success(res)
    },
    error: function (err) {
      _self.on('click', ajax);
      // alert("报错了")
      error && error(err)
    }
  });
}

$(function () {
  $.fn.serializeJson = function () {
    // 定义一个json对象
    var serializeObj = {};
    // this 就是谁调用，就把谁转换为数组
    var array = this.serializeArray();
    //遍历数组，
    $(array).each(function () {
      //判断是否有对应的名称
      if (serializeObj[this.name]) {
        //判断这个名称是否有值，若有多个值，则多个值存到一个数组中
        if ($.isArray(serializeObj[this.name])) {
          //若有值，则追加。
          serializeObj[this.name].push(this.value);
        } else {
          serializeObj[this.name] = [serializeObj[this.name], this.value];
        }
      } else {
        // 若无对应的名称 ,则创建名称。然后赋值
        serializeObj[this.name] = this.value;
      }
    });
    return serializeObj;
  };
  $('.dropdown-toggle').dropdown();
});

/**
 * 退出登录
 */
function clearLoginInfo() {
  Cookies.remove("token");
  //把用户信息删了
  localStorage.removeItem("user");
  // window.location.href="../../pc/index.html";
}
//获取url中的信息
function getUrlJson() {
    var json = {};
    if (location.search) {
	    var search = location.search.split("?")[1];
	    var searchArray = search.split("&");
        for (var i in searchArray) {
            json[searchArray[i].split("=")[0]] = searchArray[i].split("=")[1]
        }
    }
    return json
}

var fileSizeType = [];
fileSizeType[0] = "B" ;
fileSizeType[1] = "KB" ;
fileSizeType[2] = "MB" ;
fileSizeType[3] = "GB" ;
fileSizeType[4] = "TB" ;

/**
 * 根据 type 的不同进行文件大小单位转换
 * @param type  文件大小单位，类型为String
 * @param fileSize  单位为 B 的文件大小，类型为String
 * @return 文件大小(向上取整) 类型为String（含单位标识）
 */
function getFileSizeBy(type , fileSize) {
    if (type === fileSizeType[0]){
        return fileSize + fileSizeType[0];
    }else if (type === fileSizeType[1]){
        return Math.ceil(parseInt(fileSize)/1024) ;
    }else if (type === fileSizeType[2]){
        return Math.ceil(parseInt(fileSize)/1024/1024);
    }else if (type === fileSizeType[3]){
        return Math.ceil(parseInt(fileSize)/1024/1024/1024) ;
    }else if (type === fileSizeType[4]){
        return Math.ceil(parseInt(fileSize)/1024/1024/1024/1024) ;
    }
}


$(function(){
    $('.computeDaysRemain').each(
        function () {
            //获取当前天数
            var panda = $(this).data("panda");
            //计算剩余天数
            var days = computeDaysRemain(panda);
            //插入进去
            $(this).html("剩<span class=\"number\" style=\"color: red\"> " + days + " </span>天");
        }
    )
});



/**
 *传入截止时间，和当前时间对比，计算剩余天数
 *
 * @param sDate1
 * @param sDate2
 * @returns {number}
 */
function computeDaysRemain(sDate1) {    //sDate1和sDate2是2006-12-18格式
    try {
        var dateSpan,
            iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(new Date());
        if (sDate1 < sDate2) {
            return 0;
        }
        dateSpan = Math.abs(sDate1 - sDate2);
        iDays = Math.ceil(dateSpan / (24 * 3600 * 1000));
        if (isRealNum(iDays)) {
            return iDays;
        }
        return 0;
    } catch (e) {
        console.log(e.name + ": " + e.message);
        return 0;
    }
}
function isRealNum(val) {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if (val === "" || val == null) {
        return false;
    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 获取url中指定参数的值
 * @param variable  url中的参数名
 * @return url中指定参数的值
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    console.log(query);
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        console.log(pair);
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return "";
}

/**
 * 进入投诉页面
 * unitId  投诉来源稿件所属单位ID
 * unitName 投诉来源稿件所属单位名称
 * sourceId 投诉来源稿件ID
 * sourceTitle 投诉来源稿件标题
 * sourceType 投诉来源稿件入口：10、用户中心；20、采购公告；30、采购需求；40、集中采购；50、预研指南；60、装备市场准入 ；
 *                              70、通用装备-产品征集；80、通用装备-目录更新需求；90、企业及产品-企业名录；100、企业及产品-产品技术
 * sourceCreator 投诉来源稿件创建人
 */
function turnToComplain(unitId, unitName, sourceId, sourceTitle, sourceType, sourceCreator) {
    window.location.href = "/advisoryComplaints/detailsComplaint.html?unitId=" + unitId + "&unitName=" + unitName
        + "&sourceId=" + sourceId + "&sourceTitle=" + sourceTitle + "&sourceType=" + sourceType + "&sourceCreator=" + sourceCreator;
}

// 列表全选
/* checkbox全选 */
$("#selectAll").click(function () {
    $(":checkbox[name='checkboxid']").prop("checked", this.checked);
});
