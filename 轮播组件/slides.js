window.slides = function(element) {
    let $element = $(element)
    let $view = $element.children('.view')
    let width = $element.width()
    let height = $element.height()
    let count = $element.find('.slide').length
    let currentIndex = 0
    let timer

    // 切换时间
    let time = 2000

    let $ol = $('<ol class="controls"></ol>')


    for (let i = 0; i < count; i++) {
        $ol.append(`<li>${i+1}</li>`)
    }
    $element.append($ol)
    $ol.css({
        marginLeft: `-${$ol.width()/2}px`
    })
    $ol.find('li').eq(currentIndex).addClass('active').siblings().removeClass('active')
    $ol.on('click', function(e) {
        let index = $(e.target).index()
        goToSlide(index)
    })

    function goToSlide(index) {
        let width = $element.width()
        if (index < 0) {
            index = count - 1
        } else if (index >= count) {
            index = 0
        }
        if (index == 0) {
            let $li = $element.find('.slide').eq(0).clone()
            $li.appendTo($view)
            let number = -width * count
            $view.css({
                transform: `translateX(${number}px)`
            })
            $ol.find('li').eq(index).addClass('active').siblings().removeClass('active')
            $view.one('transitionend', function() {
                $li.remove()
                let oldTransition = $view.css('transition')
                $view.css({
                    transition: `none`,
                    transform: `translateX(0px)`
                })

                $view.offset()

                $view.css('transition', oldTransition)
                currentIndex = index
                goToSlide(index + 1)
            })
            return
        }
        let number = -index * width
        $view.css({
            transform: `translateX(${number}px)`
        })

        currentIndex = index
        $ol.find('li').eq(index).addClass('active').siblings().removeClass('active')
    }

    function autoPlay() {
        timer = setInterval(function() {
            goToSlide(currentIndex + 1)
        }, time)
    }

    $element.on('mouseenter', function() {
        clearInterval(timer)
    })
    $element.on('hover', function() {
        clearInterval(timer)
    })
    $element.on('mouseleave', function() {
        autoPlay()
    })
    autoPlay()
}