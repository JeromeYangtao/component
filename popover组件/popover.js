window.popover = function(options) {

    let { element, content } = options

    let $element = $(element)

    let $popover
    show()

    $element.on('click', function() {
        if ($popover) {
            $popover.remove()
            $popover = null // 关键
        } else {
            show()
        }
    })

    function show() {
        let width = $element.outerWidth()
        let height = $element.outerHeight()

        $popover = $('<div class="popover"></div>')
            .html(content)
            .insertAfter($element)

        let selfWidth = $popover.outerWidth()

        let x = -(width / 2 + selfWidth / 2)

        $popover.css({
            transform: `translate(${x}px, -100%)`
        })
    }

    return undefined
}