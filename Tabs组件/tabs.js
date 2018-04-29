class tabs {
  constructor (element) {
    this.$element = $(element)
    this.$nav = $(this.$element.children('ol')[0])
    this.$panes = $(this.$element.children('ol')[1])
    this.$nav.on('click', e => {
      let index = $(e.target).index()
      this.$panes.children()
        .eq(index)
        .addClass('active')
        .siblings()
        .removeClass('active')
    })
    this.init()
  }

  init () {
    this.$panes.children()
      .eq(0)
      .addClass('active')
      .siblings()
      .removeClass('active')
  }
}