;(function (){
    var Tloding = function (){

        this.timeId = null;
        // 默认参数
        this.option = {
        };

        var js = document.scripts;
        this.jsDir = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);
        // 加载CSS
        $('head').append($('<link rel="stylesheet" type="text/css" href="'+ this.jsDir +'tloading.css" />'));
    };

    Tloding.prototype.setOption = function (option){
        this.option = $.extend(this.option, option);
    };

    Tloding.prototype.getWindowSize = function (){

        var sWidth = document.body.scrollWidth;
        var sHeight =  document.body.scrollHeight;

        return [sWidth, sHeight];
    };

    Tloding.prototype.init = function (content){

        var loadingBox = $('<div>', {
            'id': 'loading'
        });

        var loadingImg = $('<img>', {
            src: this.jsDir + 'loading.png',
            width: 30,
            height: 30
        });

        $('#loading').remove();

        var size = this.getWindowSize();

        loadingBox.css('left', (size[0] - 80) / 2);
        loadingBox.css('top', ($(window).height() - 80) / 2);
        loadingBox.append(loadingImg);
        loadingBox.append('<p>' + (content ? content : '加载中...') + '</p>');

        var rotate = 0;
        this.timeId = setInterval(function (){
            rotate += 5;
            loadingImg.css('transform', 'rotate('+ rotate + 'deg)');
        }, 10);

        $('body').append(loadingBox);

    };

    Tloding.prototype.success = function (content){
        clearInterval(this.timeId);
        var obj = $('#loading');

        obj.find('img').attr('src', this.jsDir + 'ok.png');
        obj.find('img').css('transform', 'rotate(0deg)');
        obj.find('p').text(content ? content :'加载成功');
        setTimeout(function (){
            obj.fadeOut(function (){
                obj.remove()
            });
        }, 1000);
    };


    Tloding.prototype.error = function (content){
        clearInterval(this.timeId);
        var obj = $('#loading');

        obj.find('img').attr('src', this.jsDir + 'error.png');
        obj.find('img').css('transform', 'rotate(0deg)');
        obj.find('p').text(content ? content : '加载失败');
        setTimeout(function (){
            obj.fadeOut(function (){
                obj.remove()
            });
        }, 1000);
    };

    Tloding.prototype.clear = function (content){
        clearInterval(this.timeId);
        var obj = $('#loading');

        obj.remove();
    };

    window.tLoading = new Tloding();

}(window, document));