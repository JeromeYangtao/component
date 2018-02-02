var slides = function (element) {
    var $element = $(element);
    var $view = $element.children('.view');
    var width = $element.width();
    var height = $element.height();
    var count = $element.find('.slide').length;
    var currentIndex = 0;
    var timer;
    // 切换时间
    var time = 2000;
    var $ol = $('<ol class="controls"></ol>');
    for (var i = 0; i < count; i++) {
        $ol.append("<li>" + (i + 1) + "</li>");
    }
    $element.append($ol);
    $ol.css({
        marginLeft: "-" + $ol.width() / 2 + "px"
    });
    $ol
        .find('li')
        .eq(currentIndex)
        .addClass('active')
        .siblings()
        .removeClass('active');
    $ol.on('click', function (e) {
        var index = $(e.target).index();
        goToSlide(index);
    });
    function goToSlide(index) {
        var width = $element.width();
        if (index < 0) {
            index = count - 1;
        }
        else if (index >= count) {
            index = 0;
        }
        if (index == 0) {
            var $li_1 = $element
                .find('.slide')
                .eq(0)
                .clone();
            $li_1.appendTo($view);
            var number_1 = -width * count;
            $view.css({
                transform: "translateX(" + number_1 + "px)"
            });
            $ol
                .find('li')
                .eq(index)
                .addClass('active')
                .siblings()
                .removeClass('active');
            $view.one('transitionend', function () {
                $li_1.remove();
                var oldTransition = $view.css('transition');
                $view.css({
                    transition: "none",
                    transform: "translateX(0px)"
                });
                $view.offset();
                $view.css('transition', oldTransition);
                currentIndex = index;
                goToSlide(index + 1);
            });
            return;
        }
        var number = -index * width;
        $view.css({
            transform: "translateX(" + number + "px)"
        });
        currentIndex = index;
        $ol
            .find('li')
            .eq(index)
            .addClass('active')
            .siblings()
            .removeClass('active');
    }
    function autoPlay() {
        timer = setInterval(function () {
            goToSlide(currentIndex + 1);
        }, time);
    }
    $element.on('mouseenter', function () {
        clearInterval(timer);
    });
    $element.on('hover', function () {
        clearInterval(timer);
    });
    $element.on('mouseleave', function () {
        autoPlay();
    });
    autoPlay();
};
