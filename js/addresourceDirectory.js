$("header").load("../header.html");
$("footer").load("../footer.html");
var pageBarCallBack=function(currPage_) {
    initlist(currPage_)
  }
var pageBarCallBack2=function(currPage_) {
    initlist(currPage_)
}


$('#datetimepicker-start').datetimepicker({
    format: 'YYYY-MM-DD',
    locale: moment.locale('zh-cn')
})
$('#datetimepicker-end').datetimepicker({
    format: 'YYYY-MM-DD',
    locale: moment.locale('zh-cn')
});
$('#approval_time').datetimepicker({
    format: 'YYYY-MM-DD',
    locale: moment.locale('zh-cn')
})
$('#datetimepicker_end').datetimepicker({
    format: 'YYYY-MM-DD',
    locale: moment.locale('zh-cn')
});
$('#datetimepicker_start').datetimepicker({
    format: 'YYYY-MM-DD',
    locale: moment.locale('zh-cn')
});
$('#mechanism_time').datetimepicker({
    format: 'YYYY-MM-DD',
    locale: moment.locale('zh-cn')
})
ajax("get", "/unit/dicts/institutionalNatures", "", function (result) {
    if (result.code == 0) {
        var dict = result.dicts;
        var str = "<option>请选择机构性质</option>";
        for (var i = 0; i < dict.length; i++) {
            str += "<option value='" + dict[i].value + "'>" + dict[i].value + "</option>";
        }
        $("#state").html(str)
    }
})
ajax("get", "/unit/dicts/confidentialityQualificationLevel", "", function (result) {
    if (result.code == 0) {
        var dict = result.dicts;
        var str = "";

        for (var i = 0; i < dict.length; i++) {
            str += "<option value='" + dict[i].value + "'>" + dict[i].value + "</option>";
        }
        $("#confidentialityQualificationLevel").html(str)
    }
})
ajax("get", "/unit/dicts/legalPersonType", "", function (result) {
    if (result.code == 0) {
        var dict = result.dicts;
        var str = "<option>请选择法人类别</option>";
        for (var i = 0; i < dict.length; i++) {
            str += "<option value='" + dict[i].value + "'>" + dict[i].value + "</option>";
        }
        $("#legalPersonType").html(str)
    }
})
ajax("get", "/unit/dicts/unitCategorys", "", function (result) {
    if (result.code == 0) {
        var dict = result.dicts;
        var str=''
        // var str = "<option>请选择单位类别</option>";
        for (var i = 0; i < dict.length; i++) {
            str += "<option value='" + dict[i].value + "'>" + dict[i].value + "</option>";
        }
       
        $("#unitCategorys").html(str)
    }
})
ajax("get", "/unit/dicts/licensingUnit", "", function (result) {
    if (result.code == 0) {
        var dict = result.dicts;
        var str = "<option>请选择发证单位</option>";
        for (var i = 0; i < dict.length; i++) {
            str += "<option value='" + dict[i].value + "'>" + dict[i].value + "</option>";
        }
        $(".licensingUnit").html(str)
    }
})
//:1:试验能力类别 
ajax("get", "/cg/cgequipmentdict/getDictByType?type=1", "", function (result) {
    if (result.code == 0) {
        var dict = result.data;
        var str = "<option>请选择发证单位</option>";
        for (var i = 0; i < dict.length; i++) {
            str += "<option value='" + dict[i].value + "'>" + dict[i].value + "</option>";
        }
        $(".classifiy").html(str)
    }
})
//3:大单位信息 
ajax("get", "/cg/cgequipmentdict/getDictByType?type=3", "", function (result) {
    if (result.code == 0) {
        var dict = result.data;
        var str = "<option>请选择发证单位</option>";
        for (var i = 0; i < dict.length; i++) {
            str += "<option value='" + dict[i].value + "'>" + dict[i].value + "</option>";
        }
    }
})
//2:实验能力指标
ajax("get", "/cg/cgequipmentdict/getDictByType?type=2", "", function (result) {
    if (result.code == 0) {
        var dict = result.data;
        var str = "<option>请选择发证单位</option>";
        for (var i = 0; i < dict.length; i++) {
            str += "<option value='" + dict[i].id + "'  data-keys="+dict[i].value+" data-trem="+dict[i].trem+">" + dict[i].value + "</option>";
        }
        $(".zhibiao").html(str)
    }
})
// 4:单位性质 
ajax("get", "/cg/cgequipmentdict/getDictByType?type=4", "", function (result) {
    if (result.code == 0) {
        var dict = result.data;
        var str = "<option>请选择发证单位</option>";
        for (var i = 0; i < dict.length; i++) {
            str += "<option value='" + dict[i].value + "'>" + dict[i].value + "</option>";
        }
        $("#sinstitutionalNature").append(str)
    }
})

//详情回显
var ids='';
var date=new Date().getTime();
var dateRandom=Math.floor(Math.random(date)*9999*date);
ids=dateRandom;
shengfen(0)
if(getQueryVariable("ids")!=''){
    
    setTimeout(function(){
    

    ajaxRaw("GET","/cg/cgequipmenttestresource/info/"+getQueryVariable("ids"),'',function(res){
        var da=res.cgEquipmentTestResource;
        ids=da.id;//
        $(".sname").val(da.name);
        $(".salias").val(da.alias);
        $(".sfullName").val(da.fullName);
        $(".sauthState").val(da.authState);
        $(".briefIntro").val(da.briefIntro);
        $(".largeUnitName").val(da.largeUnitName);
        $(".srecommUnitName").val(da.recommUnitName);
        $(".suscc").val(da.uscc);
        $("#sinstitutionalNature").val(da.institutionalNature);
        $("#sestablish").val(da.establish);
        $(".secrecySeniorityLevel").val(da.secrecySeniorityLevel);
        $(".slegalName").val(da.legalName);
        $(".segalCategory").val(da.egalCategory);
        $(".sunitCategory").val(da.unitCategory);
        $(".sfax").val(da.fax);
        $(".stelphone").val(da.telphone)

        
        getcity(da.province);
        getcounty(da.city)
        $("#province").val(da.province);
        setTimeout(function(){
            $("#city").val(da.city);
            getcounty(da.city)
            setTimeout(function(){
                $("#county").val(da.county);
            },1000)
        },3000)
        //
        $(".sdetailAddr").val(da.detailAddr);
        $(".smultipleAddr").val(da.multipleAddr);
        $(".sapprovalTime").val(da.approvalTime)
        if(da.abilityEntity.length==0){
            return false;
        }
        $(".contenPart_wraps").empty();
        for(var i=0;i<da.abilityEntity.length;i++){
            var data=da.abilityEntity[i];
            var htmls=$(".tableList_two_clone").clone().show().addClass("ability_to");
            $(htmls).find(".briefDesc").val(data.briefDesc);
            $(htmls).find(".desc").val(data.describe);
            $(htmls).find(".classifiy").val(data.classifiy)
            var dataArr=JSON.parse(data.acquiredQualifications);
            if(dataArr.length!=0){
               
                $(htmls).find(".zili").empty()
                for(var j=0;j<dataArr.length;j++){
                    console.log(dataArr[j])
                    var zili=$(".test_sevenList_clone").clone().show();
                    $(zili).find(".sqdzz").val(dataArr[j].sqdzz);
                    $(zili).find(".fzdw").val(dataArr[j].fzdw)
                    $(zili).find(".zsbh").val(dataArr[j].zsbh)
                    $(zili).find(".zsyxq_e").val(dataArr[j].zsyxq_e)
                    $(zili).find(".zsyxq_s").val(dataArr[j].zsyxq_s)
                    $(htmls).find(".enclosureName").val(dataArr[j].fileName);
                    $(htmls).find(".enclosure").val(dataArr[j].fileUrl)
                    $(htmls).find(".fileName").text(dataArr[j].fileName)
                    $(htmls).find(".zili").append(zili)
                }
                //
            }
            $(".contenPart_wraps").append(htmls);
           
        }
    })
},2000)

}
//保存
$(".save").on("click",function(){

    
    var abilityEntityArr=[],acquiredQualificationsObj={};
    $(".ability_to").each(function(index,item){
        var jsonArr=[];
        abilityEntityArr.push({
            acquiredQualifications:(function(){
                for(var i=0;i<$(item).find(".zili_list").length;i++){
                    var da=$(item).find(".zili_list")[i];
                    jsonArr.push(
                        {   
                            fileUrl:$(".enclosure").val(),
                            fileName:$(".enclosureName").val(),
                            sqdzz:$(da).find(".sqdzz").val(),
                            fzdw:$(da).find(".fzdw").val(),
                            zsbh:$(da).find(".zsbh").val(),
                            zsyxq_s:$(da).find(".zsyxq_s").val(),
                            zsyxq_e:$(da).find(".zsyxq_e").val()
                        }
                    )
                }
                return JSON.stringify(jsonArr)
            })(),
            briefDesc:$(item).find(".briefDesc").val(),
            classifiy:$(item).find(".classifiy").val(),
            describe:$(item).find(".desc").val(),
            resourceId:Math.floor(Math.random(ids)*ids),
        })
    })
    if($("input").val()==''||$("select").val()==''){
        return false;
    }
    var obj={
            "id": Math.floor(ids),		
            "name": $(".sname").val(),		
            "alias": $(".salias").val(), 			
            "fullName": $(".sfullName").val(),	
            "authState": parseInt($(".sauthState").val()),			
            "briefIntro": $(".briefIntro").val(),		
            "largeUnitName": $(".largeUnitName").val(),	
            "recommUnitName": $(".srecommUnitName").val(),	
            "uscc": $(".suscc").val(),			
            "institutionalNature": $("#sinstitutionalNature").val(),	
            "secrecySeniorityLevel": $(".secrecySeniorityLevel").val(),	
            "legalName": $(".slegalName").val(),	
            "egalCategory": $(".segalCategory").val(), 	
            "establish":$("#sestablish").val(),
            "unitCategory": $(".sunitCategory").val(),		
            "contacts": $(".scontacts").val(),		
            "telphone": $(".stelphone").val(),		
            "fax": $(".sfax").val(),		
            "province": parseInt($("#province").val()), 
            "city": parseInt($("#city").val()),                   
            "county": parseInt($("#county").val()),			
            "detailAddr": $(".sdetailAddr").val(),		
            "multipleAddr": $(".smultipleAddr").val(),	
            "wholeAddr": $("#province option:selected").data("keys")+$("#city option:selected").data("keys")+$("#county option:selected").data("keys")+ $(".sdetailAddr").val(),	
            "approvalTime": $(".sapprovalTime").val(),    	 
            "state": parseInt($(this).attr("status")),			
            "abilityEntity":abilityEntityArr
        }
        var apis='save'
        if(getQueryVariable("ids")!=''){
            apis="update"
        }
        ajaxRaw("POST","/cg/cgequipmenttestresource/"+apis,JSON.stringify(obj),function(res){
            if(res.code==0){
                window.history.back();
            }
        })
})
 $(document).on("change",".imgsfile",function(e){
    var formdata = new FormData();
    var datas={}
    formdata.append('file', e.currentTarget.files[0]);
    var _this=$(this);
     ajaxImg("/uploadLocal", formdata, function (result) {
        if(result.code == 0){
            datas=result;
            $(_this).parent().siblings(".fileName").html(result.file.fileName)
            $(_this).siblings(".enclosureName").val(result.file.fileName)
            $(_this).siblings(".enclosure").val(result.file.url)
        }
    })
    
})
//添加资质    
$(document).on("click",".addzi",function(){
    $(this).siblings(".zili").append($(".test_sevenList_clone").children().clone().show())
})
// 添加实验能力 
$(".addAbility").on("click",function(){
    $(".contenPart_wraps").append($(".tableList_two_clone").clone().show().addClass("ability_to"))
})
//添加指标
$(".addTarget").on("click",function(){
    $(".form-group_wraps").append($(".form-group_clone").clone().show().addClass("form-group_list").removeClass("form-group_clone"))
})
//列表删除
var delArr=[];
$(document).on("click",".dels",function(){
    delArr=[]
    delArr=[$(this).attr("ids")];
    dels();
})
//批量删除
$(".alldel").on("click",function(){
    delArr=[];
    $("input[name=tablecheck]:checked").each(function(){
        delArr.push($(this).val())
    })
    dels()
})
function dels(){
    ajaxRaw("POST","/cg/cgequipmenttestdevice/delete",JSON.stringify(delArr),function(res){
        initlist(1);
    })
}
//设备信息列表页接口 
initlist(1)
function initlist(pages){
    ajaxRaw("GET","/cg/cgequipmenttestdevice/deviceList",{page:pages,limit:10},function(res){
        var html='';
        for(var i=0;i<res.data.length;i++){
            html+='<tr>'
            html+='<td>'
            html+='<input type="checkbox" name="tablecheck" value="'+res.data[i].id+'">'
            html+=' <label for=""></label>'
            html+='   </td>'
            html+='  <td>'+(i+1)+'</td>'
            html+='  <td>'+res.data[i].deviceName+'</td>'
            html+='  <td><img src="'+imgUrl+"/"+res.data[i].mainPicture+'" width="53px" heihgt="30px" alt=""></td>'
            html+='  <td>'+res.data[i].majorField1+'</td>'
            // html+='  <td>大类5</td>'
            // html+='  <td>子类5</td>'
            html+=' <td class="tdAlert" id='+res.data[i].id+'><a>'+res.data[i].targetsCount+'</a></td>'
            html+=' <td>'+res.data[i].secretGrade+'</td>'
            var keyEquipmentsStr=''
            if(res.data[i].keyEquipments==2){
                keyEquipmentsStr='非重大'
            }else if(res.data[i].keyEquipments==1){
                keyEquipmentsStr='重大'
            }
            html+=' <td>'+keyEquipmentsStr+'</td>'
            html+='  <td>'+res.data[i].remark+'</td>'
            html+='  <td><span class="dels" ids="'+res.data[i].id+'" data-toggle="modal" data-target="#myModalDelete">删除</span></td>'
            html+='  </tr>'
        }
        $("#tbodys").html(html)
        page(pages, 10, parseInt(res.count), 'pageBarCallBack', 'pageBar');
    })
}
$(document).on("click",".tdAlert",function(){
    ajaxRaw("GET","/cg/cgequipmenttestdevice/target?page=1&limit=10&id="+$(this).attr("id"),'',function(res){
        page(pages, 10, parseInt(res.count), 'pageBarCallBack2', 'pageBar2');
        console.log(res)
    })
})
$(document).on("change",".zhibiao",function(){
    $(this).find("option:selected").data("trem");
    if($(this).find("option:selected").data("trem")=='约束'){
        $(this).parent().parent().parent().siblings(".conect_one").find(".zhibiaozhi2").show()
    }else{
        $(this).parent().parent().parent().siblings(".conect_one").find(".zhibiaozhi2").hide()
    }
})

//列表保存接口
$(".listSaveAdd").on("click",function(){
    if($(".deviceName").val()==''){
        $(".deviceName").siblings(".erros").show();
        return false;
    }
    if($(".keyEquipments").val()==''){
        $(".keyEquipments").siblings(".erros").show();
        return false;
    }
    if($(".remark").val()==''){
        $(".remark").siblings(".erros").show();
        return false;
    }
    if($(".majorField1").val()==''){
        $(".majorField1").siblings(".erros").show();
        return false;
    }
    if($(".secretGrade").val()==''){
        $(".secretGrade").siblings(".erros").show();
        return false;
    }
    
    var strImg={}
    $(".relative-img").each(function(){
        if($(this).attr("src")==''){
            return false;
        }
        var keys=$(this).attr("keys"),values=$(this).attr("origin-url");
        
        strImg[keys]=values
    })
    var targetResourceArr=[];
    // $(".form-group_list").each(function(){

    // })
    var date=new Date().getTime();
    var dateRandom=Math.floor(Math.random(date)*99999)
    var obj={
        resourceId:JSON.stringify(dateRandom),
        deviceName:$(".deviceName").val(),   //设备名称
        keyEquipments:$(".keyEquipments").val(),//重大设备标识单位
        mainPicture:$(".mainPicture").attr("origin-url"),//设备主图
        pictures:JSON.stringify(strImg),//上传图片所有 逗号分割
        remark:$(".remark").val(),//设备说明
        majorField1:$(".majorField1").val(),//专业领域
        secretGrade:$(".secretGrade").val(),//密级
        targetResource:(function(){
            var jsonArrs=[];
            var da=$(".form-group_wraps").find(".form-group_list");
            $(da).each(function(index,item){

                jsonArrs.push({
                    targetValue:$(item).find(".zhibiaozhi").val()+"-"+$(item).find(".zhibiaozhi2").val(),
                    targetId:$(item).find(".zhibiao").val(),
                    targetName:$(item).find(".zhibiao option:selected").data("keys")
                })
            })
            return jsonArrs;
           
        })()
        // targetResource:[{"targetId": 0,"targetName": "中国", "targetValue": 0}],//指标数组
    };
    $(this).attr("data-dismiss","modal")
    ajaxRaw("POST","/cg/cgequipmenttestdevice/save",JSON.stringify(obj),function(res){
        initlist(1)
    })
})
//上传技术图片
function getPhoto(e, imgClass, inputId) {
  var formdata = new FormData();
  formdata.append('file', e.files[0]);
  var name = e.files[0].name;
  $("." + inputId).val(name);
  $("." + imgClass).attr("keys",name);
  ajaxImg("/uploadLocal", formdata, function (result) {
    if (result.code == 0) {
      $('.' + imgClass).attr("src", imgUrl+'/' + result.file.url).attr("origin-url", result.file.url)
    }
  })
}
var cgMember = {};
function shengfen(parentId){
    //省市区
    // let parentId = 0;
    ajax("get", "/front/cgarea/findChilds/" + parentId, parentId, function (res) {
        if (res.code == 0) {
            var areaList = res.areaList;
            var str = "";
            for (var i = 0; i < areaList.length; i++) {
                
                str += "<option value='" + areaList[i].areaId + "' data-keys="+ areaList[i].areaName +">" + areaList[i].areaName + "</option>";
            }
            $("#province").html(str)
            $("#province").val(1)
            getcity($("#province").val(),1)
        }
    })
}
// parentId:父级is,status:判断当前id是否有效
function getcity(parentId,status) {
ajax("get", "/front/cgarea/findChilds/" + parentId, parentId, function (res) {
  if (res.code == 0) {
    var areaList = res.areaList;
    var str = "";
    for (var i = 0; i < areaList.length; i++) {
      str += "<option value='" + areaList[i].areaId + "' data-keys="+ areaList[i].areaName +">" + areaList[i].areaName + "</option>";
    }
      $("#city").html(str);
      if(status){
          $("#city").val(cgMember.city||1)
          getcounty($("#city").val(),status)
      }else{
          $("#city").val(areaList[0].areaId);
          getcounty(areaList[0].areaId,status)
      }
  }
})
}
function getcounty(parentId,status) {
ajax("get", "/front/cgarea/findChilds/" + parentId, parentId, function (res) {
  if (res.code == 0) {
    var areaList = res.areaList;
    var str = "";//
    for (var i = 0; i < areaList.length; i++) {
      str += "<option value='" + areaList[i].areaId + "' data-keys="+ areaList[i].areaName +">" + areaList[i].areaName + "</option>";
    }
    $("#county").html(str)
      if(status){
          $("#county").val(cgMember.county||1)
      }else{
          $("#county").val(areaList[0].areaId||0)
      }
  }
})
}
