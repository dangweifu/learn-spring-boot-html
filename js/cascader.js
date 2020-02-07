
var lists = [
    {
        value: 'zhinan',
        label: '指南',
        children: [
            {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                    value: 'yizhi',
                    label: '一致'
                }, {
                    value: 'fankui',
                    label: '反馈'
                }, {
                    value: 'xiaolv',
                    label: '效率'
                }, {
                    value: 'kekong',
                    label: '可控'
                }]
            },
            {
                value: 'daohang',
                label: '导航',
                children: [
                    {
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    },
                    {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }
                ]
            }
        ]
    },
    {
        value: 'zujian',
        label: '组件',
        children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
                value: 'layout',
                label: 'Layout 布局'
            }, {
                value: 'color',
                label: 'Color 色彩'
            }, {
                value: 'typography',
                label: 'Typography 字体'
            }, {
                value: 'icon',
                label: 'Icon 图标'
            }, {
                value: 'button',
                label: 'Button 按钮'
            }]
        }, {
            value: 'form',
            label: 'Form',
            children: [{
                value: 'radio',
                label: 'Radio 单选框'
            }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
            }, {
                value: 'input',
                label: 'Input 输入框'
            }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
            }, {
                value: 'select',
                label: 'Select 选择器'
            }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
            }, {
                value: 'switch',
                label: 'Switch 开关'
            }, {
                value: 'slider',
                label: 'Slider 滑块'
            }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
            }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
            }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
            }, {
                value: 'upload',
                label: 'Upload 上传'
            }, {
                value: 'rate',
                label: 'Rate 评分'
            }, {
                value: 'form',
                label: 'Form 表单'
            }]
        }, {
            value: 'data',
            label: 'Data',
            children: [{
                value: 'table',
                label: 'Table 表格'
            }, {
                value: 'tag',
                label: 'Tag 标签'
            }, {
                value: 'progress',
                label: 'Progress 进度条'
            }, {
                value: 'tree',
                label: 'Tree 树形控件'
            }, {
                value: 'pagination',
                label: 'Pagination 分页'
            }, {
                value: 'badge',
                label: 'Badge 标记'
            }]
        }, {
            value: 'notice',
            label: 'Notice',
            children: [{
                value: 'alert',
                label: 'Alert 警告'
            }, {
                value: 'loading',
                label: 'Loading 加载'
            }, {
                value: 'message',
                label: 'Message 消息提示'
            }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
            }, {
                value: 'notification',
                label: 'Notification 通知'
            }]
        }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
            }, {
                value: 'tabs',
                label: 'Tabs 标签页'
            }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
            }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
            }, {
                value: 'steps',
                label: 'Steps 步骤条'
            }]
        }, {
            value: 'others',
            label: 'Others',
            children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
            }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
            }, {
                value: 'popover',
                label: 'Popover 弹出框'
            }, {
                value: 'card',
                label: 'Card 卡片'
            }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
            }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
            }]
        }]
    },
    {
        value: 'ziyuan',
        label: '资源',
        children: [{
            value: 'axure',
            label: 'Axure Components'
        }, {
            value: 'sketch',
            label: 'Sketch Templates'
        }, {
            value: 'jiaohu',
            label: '组件交互文档'
        }]
    },
    { "value": 1, label: 'xxx' },
]



//构造函数
function Cascader(id, data, fn) {
    //把创建好的“联级选择器”插入到哪个元素内
    this.$box = $("#" + id);
    //data: 是要填充的数据
    this.init(data);

    //对外提供的接口函数
    this.clickHandle = fn || function () { };

    //最外层的容器,后期需要把createEl()方法创建的内容都插入到这里面的
    this.$wrap = null;
}

Cascader.prototype = {
    constructor: Cascader,
    init: function (data) {
        var This = this;
        this.$wrap = $("<div class='cascader-menus'></div>")
        //创建里面的元素
        this.createEl(data, function ($ul) {
            This.$wrap.append($ul);
            This.$box.append(This.$wrap)
        });
        console.log(data)
    },
    createEl: function (data, fn) {
        var This = this;
        //创建完成以后回调函数
        var fn = fn || function () { };
        var $ul = $("<ul class='menus'></ul>");

        //创建li，并把li插入到ul中
        for (var i = 0; i < data.length; i++) {
            var $li = $("<li>" + data[i].label + "</li>");
            //给每一个Li加点击事件，点击以后显示子菜单,这里最好采用闭包的形式，不然i传递不进去，当然也可以用es6的let（不过这里没有bable，浏览器会不支持let的，在vue-cli中的话就没问题了）
            (function (i) {
                $li.click(function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    //先需要清除掉后面所有的菜单
                    $ul.nextAll().remove();
                    if (data[i].children && data[i].children.length) {
                        //创建子菜单
                        This.createEl(data[i].children, function (ul) {
                            //把创建好的子菜单插入到上一个菜单的后面
                            $ul.after(ul);
                        });
                    }
                    //对外提供的点击接口函数，并把数据给传递出去
                    This.clickHandle(data[i]);
                })
            })(i)
            $ul.append($li);
        }

        //创建完成以后回调函数
        fn($ul)
    }
}


// var c1 = new Cascader("box",lists,function(mes){ //需要绑定的id,数据,回调函数
//         console.log(mes)  
// });