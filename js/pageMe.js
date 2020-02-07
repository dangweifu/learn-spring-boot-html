;(function ($, window, document, undefined) {
    'use strict';
    function Paging(element, options) {
        this.element = element;
        this.options = {
            pageNum: options.pageNum || 1, // 当前页码
            totalNum: options.totalNum, // 总页码
            totalList: options.totalList, // 数据总记录
            callback: options.callback // 回调函数
        };
        this.init();
    }
    Paging.prototype = {
        constructor: Paging,
        init: function () {
            this.createHtml();
            this.bindEvent();
        },
        createHtml: function () {
            var me = this;
            // var content = [];
            var pageNum = me.options.pageNum; //当前页
            // var totalNum = me.options.totalNum; //总页数
            var totalList = me.options.totalList; //总条数

            page(pageNum,10,totalList,me.options.callback , me.id);

            //原来分页代码被注释，切别丢到最下边了。

        },
        bindEvent: function () {
            // var me = this;
            // me.element.off('click', 'button');
            // // 委托新生成的dom监听事件
            // me.element.on('click', 'button', function () {
            //     var id = $(this).attr('id');
            //     var num = parseInt($(this).html());
            //     var pageNum = me.options.pageNum;
            //     if (id === 'prePage') {
            //         if (pageNum !== 1) {
            //             me.options.pageNum -= 1;
            //         }
            //     } else if (id === 'nextPage') {
            //         if (pageNum !== me.options.totalNum) {
            //             me.options.pageNum += 1;
            //         }
            //     } else if (id === 'firstPage') {
            //         if (pageNum !== 1) {
            //             me.options.pageNum = 1;
            //         }
            //     } else if (id === 'lastPage') {
            //         if (pageNum !== me.options.totalNum) {
            //             me.options.pageNum = me.options.totalNum;
            //         }
            //     } else {
            //         me.options.pageNum = num;
            //     }
            //     me.createHtml();
            //     if (me.options.callback) {
            //         me.options.callback(me.options.pageNum);
            //     }
            // });
        },
        dis: function () {
            // var me = this;
            // var pageNum = me.options.pageNum;
            // var totalNum = me.options.totalNum;
            // if (pageNum === 1) {
            //     me.element.children('#firstPage, #prePage').prop('disabled', true);
            // } else if (pageNum === totalNum) {
            //     me.element.children('#lastPage, #nextPage').prop('disabled', true);
            // }
        }
    };
    $.fn.paging = function (options) {
        return new Paging($(this), options);
    }
})(jQuery, window, document);


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
    demandListPagebar += "<li><a  href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+1+")\">首页</a></li>";
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
                    // var ii = currPage_ right - left ;
                    var ii  ;
                    if (currPage_ <= left) {
                        ii = left + Math.ceil((right - left)/2);
                    }else if (currPage_ >= right) {
                        ii = right - Math.ceil((right - left)/2);
                    }
                    console.log("ii :" + ii);
                    if (centerLableCount <= 0) {
                        demandListPagebar += "<li><a  href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+ii+")\">...</a></li>" ;
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
    demandListPagebar += "<li><a  href='javascript:void(0)' onclick=\""+pageBarOnClick+"("+pageCount+")\">尾页</a></li>";
    demandListPagebar += "</ul>";
    pageBarTag.append(demandListPagebar);
}




// content.push("<button type='button' id='firstPage'>首页</button><button type='button' id='prePage'>上一页</button>");
// // 总页数大于6必显示省略号
// if (totalNum > 6) {
//     // 1、当前页码小于5且总页码大于6 省略号显示后面+总页码
//     if (pageNum < 5) {
//         // 1与6主要看要显示多少个按钮 目前都显示5个
//         for (var i = 1; i < 6; i++) {
//             if (pageNum !== i) {
//                 content.push("<button type='button'>" + i + "</button>");
//             } else {
//                 content.push("<button type='button' class='current'>" + i + "</button>");
//             }
//         }
//         content.push(". . .");
//         content.push("<button type='button'>" + totalNum + "</button>");
//     } else {
//         // 2、当前页码接近后面 到最后页码隔3个 省略号显示后面+总页面
//         if (pageNum < totalNum - 3) {
//             for (var i = pageNum - 2; i < pageNum + 3; i++) {
//                 if (pageNum !== i) {
//                     content.push("<button type='button'>" + i + "</button>");
//                 } else {
//                     content.push("<button type='button' class='current'>" + i + "</button>");
//                 }
//             }
//             content.push(". . .");
//             content.push("<button type='button'>" + totalNum + "</button>");
//         } else {
//             // 3、页码至少在5，最多在【totalNum - 3】的中间位置 第一页+省略号显示前面
//             content.push("<button type='button'>" + 1 + "</button>");
//             content.push(". . .");
//             for (var i = totalNum - 4; i < totalNum + 1; i++) {
//                 if (pageNum !== i) {
//                     content.push("<button type='button'>" + i + "</button>");
//                 } else {
//                     content.push("<button type='button' class='current'>" + i + "</button>");
//                 }
//             }
//         }
//     }
// } else {
//     // 总页数小于6
//     for (var i = 1; i < totalNum + 1; i++) {
//         if (pageNum !== i) {
//             content.push("<button type='button'>" + i + "</button>");
//         } else {
//             content.push("<button type='button' class='current'>" + i + "</button>");
//         }
//     }
// }
// content.push("<button type='button' id='lastPage'>尾页</button><button type='button' id='nextPage'>下一页</button>");
// //content.push("<span class='totalNum'> 共 " + totalNum + " 页 </span>");
// //content.push("<span class='totalList'> 共 " + totalList + " 条记录 </span>");
// content.push("跳转至<input type='text' id='inpuPageNum' name='whj_toPage' style='border: 1px solid rgb(225, 231, 234);margin: 2px;padding: 0px;height: 26px;outline: none;text-align: center;width: 31px;vertical-align: bottom;color: black;font-size: 14px;'/>页");
// me.element.html(content.join(''));
//
// // DOM重新生成后每次调用是否禁用button
// setTimeout(function () {
//     me.dis();
// }, 20);