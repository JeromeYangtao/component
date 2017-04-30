window.dialog = function(options) {
    let { title, content, buttons } = options
    let $div = generateHtml()
    $div.appendTo('body')

    let api = {
        close: function() {
            $div.hide()
        },
        show: function() {
            $div.show()
        }
    }

    function generateHtml() {
        let $divWrapper = $('<div class="dialog-wrapper"></div>')
        let $div = $(`<div class='dialog'></div>`).appendTo($divWrapper)
        $(`<div class='dialog-title'></div>`).text(title).appendTo($div)
        $(`<div class='dialog-content'></div>`).text(content).appendTo($div)
        let $buttons = $(`<div class='dialog-buttons'></div>`)

        for (let i = 0; i < buttons.length; i++) {
            let button = $(`<button></button>`)
                .text(buttons[i].text)
                .on('click', function() {
                    let action = buttons[i].action
                    let result
                    if (action) { result = action() }
                    result !== false && api.close()
                })
                .appendTo($buttons)
        }
        $buttons.appendTo($div)
        return $divWrapper
    }

    return api
}