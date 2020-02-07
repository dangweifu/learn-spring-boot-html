/**
 * 自定义分页函数
 * 参数说明：
 *    currPage_ ：当前页
 *    limit_ ：   每页显示条数
 *    listCount ：数据总条数
 *    pageBarOnClick ：列表渲染回调函数名称 （单击页码、上一页、下一页触发）
 *        功能说明：主要用来渲染列表数据，自己实现，回调时会传一个当前页码给该函数
 *    pageBarTagId ：分页 div 标签id
 * */
function page( currPage_ , limit_ , listCount_ , pageBarOnClick , pageBarTagId ) {

    var pageBarTag = $("#pageBar");
    console.log(pageBarTagId !== undefined);
    if (pageBarTagId !== undefined) {
        if (pageBarTagId != null || pageBarTagId.length > 0 || pageBarTagId !== "") {
            pageBarTag = $("#"+pageBarTagId);
        }
    }
    currPage_ = parseInt(currPage_) ;
    listCount_ = parseInt(listCount_) ;
    var demandListPagebar = "" ;
    var num = parseInt(limit_);
    var pageCount = Math.ceil(listCount_/num) ;
    var duan = 11 ;
    var left = 5 ;
    var right = pageCount - 4 ;
    var leftLableCount = 0 ;
    var rightLableCount = 0 ;
    var centerLableCount = 0 ;

    demandListPagebar = "<ul class=\"pagination\">" ;
    if(currPage_ <= 1) {
        demandListPagebar += "<li class='disabled'><a >上一页</a></li>";
    }else{
        demandListPagebar += "<li><a  href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+(currPage_-1)+")\">上一页</a></li>";
    }
    pageBarTag.html("");
    if ( 0 < pageCount && pageCount <= duan){
        for (var j = 1 ; j <= pageCount ; j++) {
            if (j === currPage_) {
                demandListPagebar += "<li class=\"active\"><a href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
            }else {
                demandListPagebar += "<li><a  href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
            }
        }
    } else if (pageCount > duan) {
        if ( left < currPage_ && currPage_ < right ){
            for (var j = 1 ; j <= pageCount ; j++) {
                if ( j === 1 || j === 2 ) {
                    if (currPage_ === j){
                        demandListPagebar += "<li class=\"active\"><a href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
                    } else {
                        demandListPagebar += "<li><a href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
                    }
                }else if ( j > 2 && j < currPage_ - 2  ) {
                    var jj = currPage_ - 2 - Math.ceil((currPage_ - 2 - 2)/2) ;
                    if (leftLableCount <= 0){
                        demandListPagebar += "<li><a  href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+jj+")\">...</a></li>" ;
                        leftLableCount++ ;
                    }
                }else if (j > currPage_ + 2 && j <= pageCount - 2) {
                    var kk = currPage_ + 2 + Math.ceil((pageCount - 1 - currPage_ - 2)/2) ;
                    if (rightLableCount <= 0) {
                        demandListPagebar +=  "<li><a  href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+kk+")\">...</a></li>" ;
                        rightLableCount++ ;
                    }
                }else if ((currPage_ - 2) <= j && j <= (currPage_ + 2)) {
                    if (currPage_ === j){
                        demandListPagebar += "<li class=\"active\"><a href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
                    } else {
                        demandListPagebar += "<li><a href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
                    }
                }else if (j === pageCount || j === pageCount - 1) {
                    if (currPage_ === j){
                        demandListPagebar += "<li class=\"active\"><a href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
                    } else {
                        demandListPagebar += "<li><a href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
                    }
                }
            }
        }else {
            // debugger ;
            for (var j = 1 ; j <= pageCount ; j++) {
                if (j <= left || j >= right) {
                    if (currPage_ === j) {
                        demandListPagebar += "<li class=\"active\"><a href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
                    }else {
                        demandListPagebar +="<li><a href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+j+")\">"+j+"</a></li>";
                    }
                }else {
                    if (centerLableCount <= 0) {
                        demandListPagebar += "<li><a  href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+Math.ceil((pageCount - 4 + left)/2)+")\">...</a></li>" ;
                        centerLableCount++;
                    }

                }
            }
        }
    }
    if(currPage_ >= pageCount) {
        demandListPagebar += "<li class='disabled'><a  >下一页</a></li>";
    }else{
        demandListPagebar += "<li><a  href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+(currPage_+1)+")\">下一页</a></li>";
    }
    demandListPagebar += "</ul>";
    pageBarTag.append(demandListPagebar);
}
/**
 * 根据标签 id 选择 select 标签，并将数据集合拼接到该标签下，最终拼接出一个完整的下拉框
 * @param selectTagId                   select 标签的 id
 * @param dataList                      字典实体集合
 * @param defaultSelectTagName          默认的选择的标签的名称
 *      例如 ：
 *      <select id="selectTagId">
 *          <option value='' selected > defaultSelectTagName </option>
 *      </select>
 * */
function fillDictData(dataList , selectTagId , defaultSelectTagName ) {
    console.log(dataList);
    var selectTag_ = $("#"+selectTagId);
    selectTag_.html("");
    selectTag_.append("<option value='' selected >"+defaultSelectTagName+"</option>");
    if (dataList.length <= 0) return ;
    for (var i = 0; i < dataList.length; i++) {
        selectTag_.append("<option value='"+dataList[i].value+"'>"+dataList[i].value+"</option>");
    }
}
