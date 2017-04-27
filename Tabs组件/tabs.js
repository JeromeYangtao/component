 window.tabs = function(element) {
     let $element = $(element)
     let $nav = $($element.children('ol')[0])
     let $panes = $($element.children('ol')[1])
     $nav.on('click', function(e) {
         let index = $(e.target).index()
         $panes.children()
             .eq(index)
             .addClass('active')
             .siblings()
             .removeClass('active')
     })
 }