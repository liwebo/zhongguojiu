; (function ($) {
    "use strict";

    $.fn.banner = function (options) {
        // 功能
        //1默认处理的参数
        // this.left = options.left;   x  会操作到jQuery的document对象 会覆盖默认属性

        this._obj_ = {
            list: options.list === false ? false : true,
            index: options.index || 0,   //默认第几张
            autoPlay: options.autoPlay === false ? false : true,//是否自动播放
            delayTime: options.delayTime || 2000,//默认多长时间播一张
            moveTime: options.moveTime || 200,//一张多长时间滑过

            // 假设上一张是最后一个索引
            iPtev: options.items.length - 1,
            // iPtev:this._obj_.index == 0 ? options.length-1 : this._obj_.index-1,
        };
        // console.log(this._obj_.iPtev)
        // 2初始化布局
        var that = this;
        this._obj_.init = function () {
            that.css({
                overflow: "hidden" //给大框加溢出隐藏
            })

            //每张图片的定位位置
            options.items.css({
                position: "absolute",
                left: options.items.eq(0).width(),//任意一张图片的宽
                top: 0
            }).eq(this.index).css({
                left: 0
            })
        }
        this._obj_.init();

        // console.log(this._obj_)
        // 2.判断是否传入左右按钮，有就做功能 ，没有就跳过
        if (options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0) {

            // console.log("有左右按钮的功能")
            // 3.1.1绑定事件
            options.left.click(function () {
                // 3.2.1计算索引
                if (that._obj_.index == 0) {
                    that._obj_.index = options.items.length - 1;
                    that._obj_.iPtev = 0;
                } else {
                    that._obj_.index--;
                    that._obj_.iPtev = that._obj_.index + 1;
                }
                //  3.3.1开始移动动画
                that._obj_.btnMove(1);

            })
            // 3.1.2绑定事件
            options.right.click(function () {
                // 3.2.2计算索引
                if (that._obj_.index == options.items.length - 1) {
                    that._obj_.index = 0;
                    that._obj_.iPtev = options.items.length - 1;
                } else {
                    that._obj_.index++;
                    that._obj_.iPtev = that._obj_.index - 1;
                }
                // 3.3.2开始移动动画
                that._obj_.btnMove(-1);
            })
            // 移动动画功能的定义
            this._obj_.btnMove = function (type) {
                options.items.eq(that._obj_.iPtev).css({
                    left: 0
                }).stop().animate({
                    left: options.items.eq(0).width() * type
                },that._obj_.moveTime).parent().children().eq(that._obj_.index).css({
                    left: -options.items.eq(0).width() * type
                },that._obj_.moveTime).stop().animate({
                    left: 0
                });
                $(".list").children().css({ //ul里的li
                    background: "rgba(200,200,200,0.5)"
                }).eq(that._obj_.index).css({ //对于左右按钮的当前index
                    background: "black",
                    color:"#fff"
                })
            }
            // end()返回上一步
            //   4 list为true有小按钮功能
            if (this._obj_.list) {
                // 4.1 创建小按钮
                var str = "";
                for (var i = 0; i < options.items.length; i++) { //遍历图片 获取长度
                    str += `<li>${i + 1}</li>`;
                }
                // 4.2创建小按钮的框，并设置框和小按钮的样式
                $("<ul class='list' >").html(str).appendTo(this).css({
                    width: 180,
                    height: 40,
                    display: "flex",
                    position: "absolute",
                    left: 670,
                    bottom: 20,
                    listStyle: "none",
                }).children().css({
                    flex: 1,
                    background: "rgba(200,200,200,0.5)",
                    lineHeight: "40px",
                    margin:"0 10px 0",
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius:"50%", 
                    color:"#fff"                 
                }).eq(this._obj_.index).css({
                    background: "black",
                    
                });
                // 4.3给小按钮添加事件
                $(".list").children("li").click(function () {
                    // 4.4判断点击的索引和当前索引的大小，决定移动的方向
                    if ($(this).index() > that._obj_.index) { //当前点的如果大于原来的 那么往左走
                        // console.log("左")
                        that._obj_.listMove($(this).index(), 1);//传参 传一个当前点击的索引
                    }
                    if ($(this).index() < that._obj_.index) { //当前点的如果小于原来的 那么往右走
                        // console.log("右")
                        that._obj_.listMove($(this).index(), -1);
                    }
                    // 4.5设置小按钮的当前项
                    $(this).css({    //当前点击的li设置css样式
                        background: "black"
                    }).siblings().css({ // 除当前点击的 其他所有子元素的css样式
                        background: "rgba(200,200,200,0.5)"
                    })

                    that._obj_.index = $(this).index();//点击事件结束后改成我当前点击的index


                })
                this._obj_.listMove = function (i, type) {
                    options.items.eq(that._obj_.index).css({//初始要走的
                        left: 0
                    }).stop().animate({
                        left: -options.items.eq(0).width() * type//负的一张距离
                    },that._obj_.moveTime).end().eq(i).css({
                        left: options.items.eq(0).width() * type //正的一张距离
                    },that._obj_.moveTime).stop().animate({
                        left: 0
                    })
                }

            }
            //  5 autoPlay为true，有自动播放功能
            if (this._obj_.autoPlay) {
                this._obj_.t = setInterval(() => {
                    options.right.trigger("click");//模拟触发事件
                }, this._obj_.delayTime)

                this.hover(function () {
                    clearInterval(that._obj_.t)
                }, function () {
                    that._obj_.t = setInterval(() => {
                        options.right.trigger("click");//模拟触发事件
                    }, that._obj_.delayTime)
                })
            }
        }
        // 封装思想

    }
})(jQuery);