/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-generatedcontent-touch-shiv-cssclasses-teststyles-prefixes-load
 */
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(n.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o={},p={},q={},r=[],s=r.slice,t,u=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:u(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},o.generatedcontent=function(){var a;return u(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a};for(var C in o)w(o,C)&&(t=C.toLowerCase(),e[t]=o[C](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e.testStyles=u,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+r.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/**
 * cbpHorizontalSlideOutMenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
	
	'use strict';

	var document = window.document;

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function cbpHorizontalSlideOutMenu( el, options ) {	
		this.el = el;
		this.options = extend( this.defaults, options );
		this._init();
	}

	cbpHorizontalSlideOutMenu.prototype = {
		defaults : {},
		_init : function() {
			this.current = -1;
			this.touch = Modernizr.touch;
			this.menu = this.el.querySelector( '.cbp-hsmenu' );
			this.menuItems = this.el.querySelectorAll( '.cbp-hsmenu > li' );
			this.menuBg = document.createElement( 'div' );
			this.menuBg.className = 'cbp-hsmenubg';
			this.el.appendChild( this.menuBg );
			this._initEvents();
		},
		_openMenu : function( el, ev ) {
			
			var self = this,
				item = el.parentNode,
				items = Array.prototype.slice.call( this.menuItems ),
				submenu = item.querySelector( '.cbp-hssubmenu' ),
				closeCurrent = function( current ) {
					var current = current || self.menuItems[ self.current ];
					current.className = '';
					current.setAttribute( 'data-open', '' );	
				},
				closePanel = function() {
					self.current = -1;
					self.menuBg.style.height = '0px';
				};

			if( submenu ) {

				ev.preventDefault();

				if( item.getAttribute( 'data-open' ) === 'open' ) {
					closeCurrent( item );
					closePanel();
				}
				else {
					item.setAttribute( 'data-open', 'open' );
					if( self.current !== -1 ) {
						closeCurrent();
					}
					self.current = items.indexOf( item );
					item.className = 'cbp-hsitem-open';
					self.menuBg.style.height = submenu.offsetHeight + 'px';
				}
			}
			else {
				if( self.current !== -1 ) {
					closeCurrent();
					closePanel();
				}
			}

		},
		_initEvents : function() {
			
			var self = this;

			Array.prototype.slice.call( this.menuItems ).forEach( function( el, i ) {
				var trigger = el.querySelector( 'a' );
				if( self.touch ) {
					trigger.addEventListener( 'touchstart', function( ev ) { self._openMenu( this, ev ); } );
				}
				else {
					trigger.addEventListener( 'click', function( ev ) { self._openMenu( this, ev ); } );
				}
			} );
			
			window.addEventListener( 'resize', function( ev ) { self._resizeHandler(); } );

		},
		// taken from https://github.com/desandro/vanilla-masonry/blob/master/masonry.js by David DeSandro
		// original debounce by John Hann
    	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
		_resizeHandler : function() {
			var self = this;
			function delayed() {
				self._resize();
				self._resizeTimeout = null;
			}

			if ( this._resizeTimeout ) {
				clearTimeout( this._resizeTimeout );
			}

			this._resizeTimeout = setTimeout( delayed, 50 );
		},
		_resize : function() {
			if( this.current !== -1 ) {
				this.menuBg.style.height = this.menuItems[ this.current ].querySelector( '.cbp-hssubmenu' ).offsetHeight + 'px';
			}
		}
	}

	// add to global namespace
	window.cbpHorizontalSlideOutMenu = cbpHorizontalSlideOutMenu;

} )( window );
/*! Pushy - v1.1.0 - 2017-1-30
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

(function ($) {
	var pushy = $('.pushy'), //menu css class
		body = $('body'),
		container = $('#container'), //container css class
		push = $('.push'), //css class to add pushy capability
		pushyLeft = 'pushy-left', //css class for left menu position
		pushyOpenLeft = 'pushy-open-left', //css class when menu is open (left position)
		pushyOpenRight = 'pushy-open-right', //css class when menu is open (right position)
		siteOverlay = $('.site-overlay'), //site overlay
		menuBtn = $('.menu-btn, .pushy-link'), //css classes to toggle the menu
		menuBtnFocus = $('.menu-btn'), //css class to focus when menu is closed w/ esc key
		menuLinkFocus = $(pushy.data('focus')), //focus on link when menu is open
		menuSpeed = 200, //jQuery fallback menu speed
		menuWidth = pushy.width() + 'px', //jQuery fallback menu width
		submenuClass = '.pushy-submenu',
		submenuOpenClass = 'pushy-submenu-open',
		submenuClosedClass = 'pushy-submenu-closed',
		submenu = $(submenuClass);

	//close menu w/ esc key
	$(document).keyup(function(e) {
		//check if esc key is pressed
		if (e.keyCode == 27) {

			//check if menu is open
			if( body.hasClass(pushyOpenLeft) || body.hasClass(pushyOpenRight) ){
				if(cssTransforms3d){
					closePushy(); //close pushy
				}else{
					closePushyFallback();
					opened = false; //set menu state
				}
				
				//focus on menu button after menu is closed
				if(menuBtnFocus){
					menuBtnFocus.focus();
				}
				
			}

		}   
	});

	function togglePushy(){
		//add class to body based on menu position
		if( pushy.hasClass(pushyLeft) ){
			body.toggleClass(pushyOpenLeft);
		}else{
			body.toggleClass(pushyOpenRight);
		}

		//focus on link in menu after css transition ends
		if(menuLinkFocus){
			pushy.one('transitionend', function() {
				menuLinkFocus.focus();
			});
		}
		
	}

	function closePushy(){
		if( pushy.hasClass(pushyLeft) ){
			body.removeClass(pushyOpenLeft);
		}else{
			body.removeClass(pushyOpenRight);
		}
	}

	function openPushyFallback(){
		//animate menu position based on CSS class
		if( pushy.hasClass(pushyLeft) ){
			body.addClass(pushyOpenLeft);
			pushy.animate({left: "0px"}, menuSpeed);
			container.animate({left: menuWidth}, menuSpeed);
			//css class to add pushy capability
			push.animate({left: menuWidth}, menuSpeed);
		}else{
			body.addClass(pushyOpenRight);
			pushy.animate({right: '0px'}, menuSpeed);
			container.animate({right: menuWidth}, menuSpeed);
			push.animate({right: menuWidth}, menuSpeed);
		}

		//focus on link in menu
		if(menuLinkFocus){
			menuLinkFocus.focus();
		}
	}

	function closePushyFallback(){
		//animate menu position based on CSS class
		if( pushy.hasClass(pushyLeft) ){
			body.removeClass(pushyOpenLeft);
			pushy.animate({left: "-" + menuWidth}, menuSpeed);
			container.animate({left: "0px"}, menuSpeed);
			//css class to add pushy capability
			push.animate({left: "0px"}, menuSpeed);
		}else{
			body.removeClass(pushyOpenRight);
			pushy.animate({right: "-" + menuWidth}, menuSpeed);
			container.animate({right: "0px"}, menuSpeed);
			push.animate({right: "0px"}, menuSpeed);
		}
	}

	function toggleSubmenu(){
		//hide submenu by default
		$(submenuClass).addClass(submenuClosedClass);

		$(submenuClass).on('click', function(){
	        var selected = $(this);

	        if( selected.hasClass(submenuClosedClass) ) {
	            //hide opened submenus
	            $(submenuClass).addClass(submenuClosedClass).removeClass(submenuOpenClass);
	            //show submenu
	            selected.removeClass(submenuClosedClass).addClass(submenuOpenClass);
	        }else{
	            //hide submenu
	            selected.addClass(submenuClosedClass).removeClass(submenuOpenClass);
	        }
	    });
	}

	//checks if 3d transforms are supported removing the modernizr dependency
	var cssTransforms3d = (function csstransforms3d(){
		var el = document.createElement('p'),
		supported = false,
		transforms = {
		    'webkitTransform':'-webkit-transform',
		    'OTransform':'-o-transform',
		    'msTransform':'-ms-transform',
		    'MozTransform':'-moz-transform',
		    'transform':'transform'
		};

		if(document.body !== null) {
			// Add it to the body to get the computed style
			document.body.insertBefore(el, null);

			for(var t in transforms){
			    if( el.style[t] !== undefined ){
			        el.style[t] = 'translate3d(1px,1px,1px)';
			        supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
			    }
			}

			document.body.removeChild(el);

			return (supported !== undefined && supported.length > 0 && supported !== "none");
		}else{
			return false;
		}
	})();

	if(cssTransforms3d){
		//toggle submenu
		toggleSubmenu();

		//toggle menu
		menuBtn.on('click', function(){
			togglePushy();
		});
		//close menu when clicking site overlay
		siteOverlay.on('click', function(){
			togglePushy();
		});
	}else{
		//add css class to body
		body.addClass('no-csstransforms3d');

		//hide menu by default
		if( pushy.hasClass(pushyLeft) ){
			pushy.css({left: "-" + menuWidth});
		}else{
			pushy.css({right: "-" + menuWidth});
		}

		//fixes IE scrollbar issue
		container.css({"overflow-x": "hidden"});

		//keep track of menu state (open/close)
		var opened = false;

		//toggle submenu
		toggleSubmenu();

		//toggle menu
		menuBtn.on('click', function(){
			if (opened) {
				closePushyFallback();
				opened = false;
			} else {
				openPushyFallback();
				opened = true;
			}
		});

		//close menu when clicking site overlay
		siteOverlay.on('click', function(){
			if (opened) {
				closePushyFallback();
				opened = false;
			} else {
				openPushyFallback();
				opened = true;
			}
		});
	}
}(jQuery));
/*
 * Copyright 2010 akquinet
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *  This JQuery Plugin will help you in showing some nice Toast-Message like notification messages. The behavior is
 *  similar to the android Toast class.
 *  You have 4 different toast types you can show. Each type comes with its own icon and colored border. The types are:
 *  - notice
 *  - success
 *  - warning
 *  - error
 *
 *  The following methods will display a toast message:
 *
 *   $().toastmessage('showNoticeToast', 'some message here');
 *   $().toastmessage('showSuccessToast', "some message here");
 *   $().toastmessage('showWarningToast', "some message here");
 *   $().toastmessage('showErrorToast', "some message here");
 *
 *   // user configured toastmessage:
 *   $().toastmessage('showToast', {
 *      text     : 'Hello World',
 *      sticky   : true,
 *      position : 'top-right',
 *      type     : 'success',
 *      close    : function () {console.log("toast is closed ...");}
 *   });
 *
 *   To see some more examples please have a look into the Tests in src/test/javascript/ToastmessageTest.js
 *
 *   For further style configuration please see corresponding css file: jquery-toastmessage.css
 *
 *   This plugin is based on the jquery-notice (http://sandbox.timbenniks.com/projects/jquery-notice/)
 *   but is enhanced in several ways:
 *
 *   configurable positioning
 *   convenience methods for different message types
 *   callback functionality when closing the toast
 *   included some nice free icons
 *   reimplemented to follow jquery plugin good practices rules
 *
 *   Author: Daniel Bremer-Tonn
**/
(function($)
{
	var settings = {
				inEffect: 			{opacity: 'show'},	// in effect
				inEffectDuration: 	600,				// in effect duration in miliseconds
				stayTime: 			3000,				// time in miliseconds before the item has to disappear
				text: 				'',					// content of the item. Might be a string or a jQuery object. Be aware that any jQuery object which is acting as a message will be deleted when the toast is fading away.
				sticky: 			false,				// should the toast item sticky or not?
				type: 				'notice', 			// notice, warning, error, success
                position:           'top-right',        // top-left, top-center, top-right, middle-left, middle-center, middle-right ... Position of the toast container holding different toast. Position can be set only once at the very first call, changing the position after the first call does nothing
                closeText:          '',                 // text which will be shown as close button, set to '' when you want to introduce an image via css
                close:              null                // callback function when the toastmessage is closed
            };

    var methods = {
        init : function(options)
		{
			if (options) {
                $.extend( settings, options );
            }
		},

        showToast : function(options)
		{
			var localSettings = {};
            $.extend(localSettings, settings, options);

			// declare variables
            var toastWrapAll, toastItemOuter, toastItemInner, toastItemClose, toastItemImage;

			toastWrapAll	= (!$('.toast-container').length) ? $('<div></div>').addClass('toast-container').addClass('toast-position-' + localSettings.position).appendTo('body') : $('.toast-container');
			toastItemOuter	= $('<div></div>').addClass('toast-item-wrapper');
			toastItemInner	= $('<div></div>').hide().addClass('toast-item toast-type-' + localSettings.type).appendTo(toastWrapAll).html($('<p>').append (localSettings.text)).animate(localSettings.inEffect, localSettings.inEffectDuration).wrap(toastItemOuter);
			toastItemClose	= $('<div></div>').addClass('toast-item-close').prependTo(toastItemInner).html(localSettings.closeText).click(function() { $().toastmessage('removeToast',toastItemInner, localSettings) });
			toastItemImage  = $('<div></div>').addClass('toast-item-image').addClass('toast-item-image-' + localSettings.type).prependTo(toastItemInner);

            if(navigator.userAgent.match(/MSIE 6/i))
			{
		    	toastWrapAll.css({top: document.documentElement.scrollTop});
		    }

			if(!localSettings.sticky)
			{
				setTimeout(function()
				{
					$().toastmessage('removeToast', toastItemInner, localSettings);
				},
				localSettings.stayTime);
			}
            return toastItemInner;
		},

        showNoticeToast : function (message)
        {
            var options = {text : message, type : 'notice'};
            return $().toastmessage('showToast', options);
        },

        showSuccessToast : function (message)
        {
            var options = {text : message, type : 'success'};
            return $().toastmessage('showToast', options);
        },

        showErrorToast : function (message)
        {
            var options = {text : message, type : 'error'};
            return $().toastmessage('showToast', options);
        },

        showWarningToast : function (message)
        {
            var options = {text : message, type : 'warning'};
            return $().toastmessage('showToast', options);
        },

		removeToast: function(obj, options)
		{
			obj.animate({opacity: '0'}, 600, function()
			{
				obj.parent().animate({height: '0px'}, 300, function()
				{
					obj.parent().remove();
				});
			});
            // callback
            if (options && options.close !== null)
            {
                options.close();
            }
		}
	};

    $.fn.toastmessage = function( method ) {

        // Method calling logic
        if ( methods[method] ) {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  method + ' does not exist on jQuery.toastmessage' );
        }
    };

})(jQuery);
/*
 * This file is part of the Tabulator package.
 *
 * (c) Oliver Folkerd <oliver.folkerd@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Full Documentation & Demos can be found at: http://olifolkerd.github.io/tabulator/
 *
 */

 (function(){

 	'use strict';

 	//polyfill for Array.find method
 	if (!Array.prototype.find) {
 		Array.prototype.find = function (predicate, thisValue) {
 			var arr = Object(this);
 			if (typeof predicate !== 'function') {
 				throw new TypeError();
 			}
 			for(var i=0; i < arr.length; i++) {
 				if (i in arr) {
 					var elem = arr[i];
 					if (predicate.call(thisValue, elem, i, arr)) {
 						return elem;
 					}
 				}
 			}
 			return undefined;
 		}
 	}

 	$.widget("ui.tabulator", {

	data:[],//array to hold data for table
	activeData:[],//array to hold data that is active in the DOM

	selectedRows:[], //array to hold currently selected rows
	selecting:false, //is selection currently happening
	selectPrev:[], //hold jQuery element for previously selected row to handle changing direction when selecting

	firstRender:true, //layout table widths correctly on first render
	mouseDrag:false, //mouse drag tracker;
	mouseDragWidth:false, //starting width of colum on mouse drag
	mouseDragElement:false, //column being dragged
	mouseDragOut:false, //catch to prevent mouseup on col drag triggering click on sort

	sortCurCol:null,//column name of currently sorted column
	sortCurDir:null,//column name of currently sorted column

	filterField:null, //field to be filtered on data render
	filterValue:null, //value to match on filter
	filterType:null, //filter type

	paginationCurrentPage:1, // pagination page
	paginationMaxPage:1, // pagination maxpage

	progressiveRenderTimer:null, //timer for progressiver rendering
	progressiveRenderFill:false, //initial fill of a progressive rendering table

	columnList:[], //an array of all acutal columns ignoring column groupings

	responsiveColumnList:[], //array of responsive columns
	responsiveColumnIndex:0, //current possition in responsive array

	columnFrozenLeft:[], //list of frozen columns left
	columnFrozenRight:[], //list of frozen columns right

	loaderDiv: $("<div class='tablulator-loader'><div class='tabulator-loader-msg'></div></div>"), //loader blockout div

	lang:{}, // hold current locale text

	defaultLang:{ //hold default locale text
		"columns":{
		},
		"pagination":{
			"first":"First",
			"first_title":"First Page",
			"last":"Last",
			"last_title":"Last Page",
			"prev":"Prev",
			"prev_title":"Prev Page",
			"next":"Next",
			"next_title":"Next Page",
		},
	},


	//setup options
	options: {
		colMinWidth:"40px", //minimum global width for a column
		colResizable:true, //resizable columns
		colVertAlign:"top", //vertical alignment of column headers

		height:false, //height of tabulator
		fitColumns:false, //fit colums to width of screen;

		movableCols:false, //enable movable columns
		movableRows:false, //enable movable rows
		movableRowHandle:"<div></div><div></div><div></div>", //handle for movable rows

		locale:"en-gb", //durrent system language
		langs:{},

		persistentLayout:false, //store cookie with column _styles
		persistentLayoutID:"", //id for stored cookie

		pagination:false, //enable pagination
		paginationSize:false, //size of pages
		paginationElement:false, //element to hold pagination numbers
		paginationDataReceived:{ //pagination data received from the server
			"current_page":"current_page",
			"last_page":"last_page",
			"data":"data",
		},
		paginationDataSent:{ //pagination data sent to the server
			"page":"page",
			"size":"size",
			"sort":"sort",
			"sort_dir":"sort_dir",
			"filter":"filter",
			"filter_value":"filter_value",
			"filter_type":"fitler_type",
		},
		paginator:false, //pagination url string builder

		progressiveRender:false, //enable progressive rendering
		progressiveRenderSize:20, //block size for progressive rendering
		progressiveRenderMargin:200, //disance in px before end of scroll before progressive render is triggered

		headerFilterPlaceholder: "filter column...", //placeholder text to display in header filters

		tooltips: false, //Tool tip value
		tooltipsHeader: false, //Tool tip for headers

		columns:false,//store for colum header info
		data:false, //store for initial table data if set at construction

		index:"id",

		sortable:true, //global default for sorting
		dateFormat: "dd/mm/yyyy", //date format to be used for sorting

		sortBy:"id", //defualt column to sort by
		sortDir:"desc", //default sort direction

		groupBy:false, //enable table grouping and set field to group by
		groupStartOpen:true, //starting state of group

		groupHeader:function(value, count, data){ //header layout function
			return value + "<span>(" + count + " " + ((count === 1) ? "item" : "items") + ")</span>";
		},

		rowFormatter:false, //row formatter callback

		addRowPos:"bottom", //position to insert blank rows, top|bottom

		selectable:"highlight", //highlight rows on hover
		selectableRollingSelection:true, //roll selection once maximum number of selectable rows is reached
		selectablePersistence:true, // maintain selection when table view is updated
		selectableCheck:function(data, row){return true;}, //check wheather row is selectable

		responsiveLayout:false, //enable responsive column layout

		ajaxURL:false, //url for ajax loading
		ajaxParams:{}, //params for ajax loading
		ajaxType:"get", //ajax request type

		showLoader:true, //show loader while data loading
		loader:"<div class='tabulator-loading'>Loading Data</div>", //loader element
		loaderError:"<div class='tabulator-error'>Loading Error</div>", //loader element

		//Callbacks from events
		rowClick:function(){},
		rowDblClick:function(){},
		rowAdded:function(){},
		rowDeleted:function(){},
		rowContext:function(){},
		rowMoved:function(){},
		rowUpdated:function(){},
		rowSelectionChanged:function(){},

		cellEdited:function(){},

		colMoved:function(){},
		colTitleChanged:function(){},

		dataLoading:function(){},
		dataLoaded:function(){},
		dataLoadError:function(){},
		dataEdited:function(){},

		ajaxResponse:false,

		dataFiltering:function(){},
		dataFiltered:function(){},

		dataSorting:function(){},
		dataSorted:function(){},

		renderStarted:function(){},
		renderComplete:function(){},

		pageLoaded:function(){},

		localized:function(){},

		tableBuilding:function(){},
		tableBuilt:function(){},
	},

	////////////////// Element Construction //////////////////

	//constructor
	_create: function(){
		var self = this;
		var element = self.element;

		//initialize arrays
		self.selectedRows = [];
		self.selectPrev = [];
		self.columnList = [];

		//prevent column array being copied over when not explicitly set
		if(!self.options.columns){
			self.options.columns = [];
		}

		if(element.is("table")){
			self._parseTable();
		}else{
			self._buildElement();
		}
	},

	//parse table element to create data set
	_parseTable:function(){
		var self = this;
		var element = self.element;
		var options = self.options;

		var rows = $("tbody tr", element);
		var headers = $("th", element);

		var hasIndex = false;

		var columns = options.columns;

		//find column if it has already been defined
		function search(title){

			var match = false;

			$.each(columns, function(index, column) {
				if(column.title === title){
					match = column;
					return false;
				}
			});

			return match;
		}

		//get attributes of cell
		var attributes = element[0].attributes;

		function attribValue(value){
			if(value === "true"){
				return true;
			}

			if(value === "false"){
				return false;
			}

			return value;
		}


		//check for tablator inline options
		for(var index in attributes){
			var attrib = attributes[index];
			var name;

			if(attrib.name && attrib.name.indexOf("tabulator-") === 0){

				name = attrib.name.replace("tabulator-", "");

				for(var key in options){
					if(key.toLowerCase() == name){
						options[key] = attribValue(attrib.value);
					}
				}
			}
		}

		//build columns from table header if they havnt been set;
		if(headers.length){

			//list of possible attributes
			var attribList = ["title", "field", "align", "width", "minWidth", "frozen", "sortable", "sorter", "formatter", "onClick", "onDblClick", "onContext", "editable", "editor", "visible", "cssClass", "tooltip", "tooltipHeader", "editableTitle", "headerFilter", "mutator", "mutateType", "accessor"];

			//create column array from headers
			headers.each(function(index){

				var header = $(this);
				var exists = false;

				var attributes = header[0].attributes;

				var col = search(header.text());

				if(col){
					exists = true;
				}else{
					col = {title:header.text()};
				}

				if(!col.field) {
					col.field = header.text().toLowerCase().replace(" ", "_");
				}

				$("td:eq(" + index + ")", rows).data("field", col.field)

				var width = header.attr("width");

				if(width && !col.width)	{
					col.width = width;
				}

				if(col.field == options.index){
					hasIndex = true;
				}

				//check for tablator inline options
				for(var index in attributes){
					var attrib = attributes[index];
					var name;

					if(attrib.name && attrib.name.indexOf("tabulator-") === 0){

						name = attrib.name.replace("tabulator-", "");

						attribList.forEach(function(key){
							if(key.toLowerCase() == name){
								col[key] = attribValue(attrib.value);
							}
						});
					}
				}

				if(!exists){
					columns.push(col)
				}
			});
		}else{
			//create blank table headers
			headers = $("tr:first td", element);

			headers.each(function(index){
				var col = {title:"", field:"col" + index};
				$("td:eq(" + index + ")", rows).data("field", col.field)

				var width = $(this).attr("width");

				if(width){
					col.width = width;
				}

				columns.push(col);
			});
		}

		self.data = [];

		//iterate through table rows and build data set
		rows.each(function(rowIndex){
			var item = {};

			//create index if the dont exist in table
			if(!hasIndex){
				item[options.index] = rowIndex;
			}

			//add row data to item
			$("td", $(this)).each(function(colIndex){
				item[$(this).data("field")] = $(this).html();
			});

			self.data.push(item);
		});

		//create new element
		var newElement = $("<div></div>");

		//transfer attributes to new element
		var attributes = element.prop("attributes");

		// loop through attributes and apply them on div
		$.each(attributes, function(){
			newElement.attr(this.name, this.value);
		});

		// replace table with div element
		element.replaceWith(newElement);

		options.data = self.data;

		newElement.tabulator(options);
	},

	//build tabulator element
	_buildElement: function(){
		var self = this;
		var options = self.options;
		var element = self.element;

		options.tableBuilding();

		//set current locale
		self.setLocale(self.options.locale);


		//// backwards compatability options adjustments ////

		//old persistan column layout adjustment
		if( typeof options.columnLayoutCookie != 'undefined'){
			options.persistentLayout = options.columnLayoutCookie;
			options.persistentLayoutID = options.columnLayoutCookieID;
		}
		/////////////////////////////////////////////////////


		//setup persistent layout storage if needed
		if(self.options.persistentLayout){
			//determine persistent layout storage type
			self.options.persistentLayout = self.options.persistentLayout !== true ?  self.options.persistentLayout : (typeof window.localStorage !== 'undefined' ? "local" : "cookie");

			//set storage tag
			self.options.persistentLayoutID = "tabulator-" + (self.options.persistentLayoutID ? self.options.persistentLayoutID : self.element.attr("id") ? self.element.attr("id") : "");
		}

		options.colMinWidth = isNaN(options.colMinWidth) ? options.colMinWidth : options.colMinWidth + "px";

		if(options.height){
			options.height = isNaN(options.height) ? options.height : options.height + "px";
			element.css({"height": options.height});
		}

		element.addClass("tabulator").attr("role", "grid");
		element.empty();

		self.header = $("<div class='tabulator-header'></div>")

		self.tableHolder = $("<div class='tabulator-tableHolder'></div>");

		var scrollTop = 0;
		var scrollLeft = 0;
		self.tableHolder.scroll(function(){

			//scroll header along with table body
			var holder = $(this);

			var left = holder.scrollLeft();
			self.header.scrollLeft(left);

			var hozAdjust = 0;

			//adjust for vertical scrollbar moving table when present
			var scrollWidth = self.header[0].scrollWidth - self.element.innerWidth();
			if(left > scrollWidth){
				hozAdjust = left - scrollWidth
				self.header.css("margin-left", -(hozAdjust));
			}else{
				self.header.css("margin-left", 0);
			}

			//keep frozen columns fixed in position
			self._calcFrozenColumnsPos(hozAdjust + 3);



			//trigger progressive rendering on scroll
			if(self.options.progressiveRender && scrollTop != holder.scrollTop() && scrollTop < holder.scrollTop()){
				if(holder[0].scrollHeight - holder.innerHeight() - holder.scrollTop() < self.options.progressiveRenderMargin){
					if(self.options.progressiveRender == "remote"){
						if(self.paginationCurrentPage <= self.paginationMaxPage){
							self._renderTable(true);
						}
					}else{
						if(self.paginationCurrentPage < self.paginationMaxPage){
							self.paginationCurrentPage++;
							self._renderTable(true);
						}
					}
				}
			}



			scrollTop = holder.scrollTop();
		});

		//create scrollable table holder
		self.table = $("<div class='tabulator-table'></div>");

		//build pagination footer if needed
		if(options.pagination){

			if(options.pagination === true){
				options.pagination = "local"; //convert old pagination style to new
			}

			if(!options.paginationElement){
				options.paginationElement = $("<div class='tabulator-footer'></div>");
				self.footer = options.paginationElement;
			}

			self.paginator = $("<span class='tabulator-paginator'><span class='tabulator-page' data-page='first' role='button' aria-label='" + self.lang.pagination.first_title + "' title='" + self.lang.pagination.first_title + "'>" + self.lang.pagination.first + "</span><span class='tabulator-page' data-page='prev' role='button' aria-label='" + self.lang.pagination.prev_title + "' title='" + self.lang.pagination.prev_title + "'>" + self.lang.pagination.prev + "</span><span class='tabulator-pages'></span><span class='tabulator-page' data-page='next' role='button' aria-label='" + self.lang.pagination.next_title + "' title='" + self.lang.pagination.next_title + "'>" + self.lang.pagination.next + "</span><span class='tabulator-page' data-page='last' role='button' aria-label='" + self.lang.pagination.last_title + "' title='" + self.lang.pagination.last_title + "'>" + self.lang.pagination.last + "</span></span>");

			self.paginator.on("click", ".tabulator-page", function(){
				if(!$(this).hasClass("disabled")){
					self.setPage($(this).data("page"));
				}
			});

			options.paginationElement.append(self.paginator);
		}

		//layout columns
		if(options.persistentLayout){
			self._getPersistentCol();
		}else{
			self._colLayout();
		}
	},

	//set options
	_setOption: function(option, value){
		var self = this;

		//block update if option cannot be updated this way
		if(["columns"].indexOf(option) > -1){
			return false;
		}

		//set option to value
		$.Widget.prototype._setOption.apply(this, arguments);

		//trigger appropriate table response

		if(["colMinWidth", "colResizable", "fitColumns", "movableCols", "movableRows", "movableRowHandle", "sortable", "groupBy", "groupHeader", "rowFormatter", "selectable"].indexOf(option) > -1){

			//triger rerender
			self._renderTable();

		}else if(["height", "pagination", "paginationSize", "tooltips"].indexOf(option) > -1){

			//triger render/reset page
			if(self.options.pagination){
				self.setPage(1);
			}else{
				self._renderTable();
			}

		}else if(["dateFormat", "sortBy", "sortDir"].indexOf(option) > -1){

			//trigger sort
			if(self.sortCurCol){
				self.sort(self.sortCurCol, self.sortCurDir);
			}

		}else if(["index"].indexOf(option) > -1){

			//trigger reparse data
			self._parseData(self.data);

		}else if(["paginationElement"].indexOf(option) > -1){
			//trigger complete redraw
		}
	},

	////////////////// Localization Functions //////////////////

	//set current locale
	setLocale:function(desiredLocale){
		var self = this;

		var locale = false; //hold the matching locale

		//fill in any matching languge values
		function traverseLang(trans, path){
			for(var prop in trans){

				if(typeof trans[prop] == "object"){
					if(!path[prop]){
						path[prop] = {};
					}
					traverseLang(trans[prop], path[prop]);
				}else{
					path[prop] = trans[prop];
				}
			}
		}

		//determing correct locale to load
		if(desiredLocale === true && navigator.language){
			//get local from system
			desiredLocale = navigator.language.toLowerCase();
		}

		if(desiredLocale){

			if(self.options.langs[desiredLocale]){
				locale = desiredLocale;
			}else{
				//see if matching top level local is present
				var prefix = desiredLocale.split("-")[0];
				if(self.options.langs[prefix]){
					locale = prefix;
				}
			}
		}

		//load default lang template
		self.lang = $.extend(true, [], self.defaultLang);


		if(locale){
			traverseLang(self.options.langs[locale], self.lang);
		}


		self.options.locale = locale;

		//update ui elements that need translating
		if(!self.firstRender){
			self._updateLocaleText();
		}

		//triger localized callback
		self.options.localized(locale, self.lang);

		return locale;

	},

	//quick update of elements with local based text
	_updateLocaleText:function(){
		var self = this;

		//update column titles
		self.columnList.forEach(function(column){
			if(column.field){
				$(".tabulator-col[data-field=" + column.field + "] .tabulator-col-title", self.header).text(self.lang.columns[column.field] || column.title);
			}
		});

		//update pagination if enabled
		if(self.options.pagination){
			for(var prop in self.lang.pagination){

				var propParts = prop.split("_");

				var element = $(".tabulator-paginator .tabulator-page[data-page=" + propParts[0] + "]", self.element);

				if (propParts.length > 1){
					element.attr("title",self.lang.pagination[prop])
					.attr("aria-label",self.lang.pagination[prop]);
				}else{
					element.text(self.lang.pagination[prop]);
				}
			}
		}

		//redraw incase column headers change width
		self.redraw(true);
	},

	//return the current locale
	getLocale:function(){
		var self = this;

		return self.options.locale;
	},

	//return the language definitions for the curent locale
	getLang:function(){
		var self = this;

		var lang = self.options.langs[self.options.locale]

		return lang ? lang : false;
	},

	////////////////// General Public Functions //////////////////

	//get number of elements in dataset
	dataCount:function(){
		return this.data.length;
	},


	//redraw list without updating data
	redraw:function(fullRedraw){
		var self = this;

		//redraw columns
		if(self.options.fitColumns || self.options.responsiveLayout || fullRedraw){
			self._colRender();
		}

		//reposition loader if present
		if(self.element.innerHeight() > 0){
			var msg = $(".tabulator-loader-msg", self.loaderDiv);
			msg.css({"margin-top":(self.element.innerHeight() / 2) - (msg.outerHeight()/2)})
		}

		self._calcFrozenColumnsPos();

		//trigger row restyle
		self._styleRows(true);

		if(fullRedraw){
			self._renderTable();
		}
	},

	//trigger file download
	download:function(type, filename, options){
		var self = this;

		//create temporary link element to trigger download
		var element = document.createElement('a');

		if(typeof type === "function"){

			//create the download link
			element.setAttribute('href', type(self.columnList, self.activeData, options));

		}else{

			switch(type){
				case "csv":

				var delimiter = options && options.delimiter ? options.delimiter : ",";

				//get field lists
				var titles = [];
				var fields = [];

				self.columnList.forEach(function(column){
					if(column.field){
						titles.push('"' + String(column.title).split('"').join('""') + '"');
						fields.push(column.field);
					}
				})

				//generate header row
				var fileContents = [titles.join(delimiter)];

				//generate each row of the table
				self.activeData.forEach(function(row){

					var rowData = [];

					fields.forEach(function(field){
						var value = typeof row[field] == "object" ? JSON.stringify(row[field]) : row[field];

						//escape uotation marks
						rowData.push('"' + String(value).split('"').join('""') + '"');
					})

					fileContents.push(rowData.join(delimiter));

				});

				//create the download link
				element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(fileContents.join("\n")));

				break;

				case "json":

				var fileContents = JSON.stringify(self.activeData, null, '\t');

				//create the download link
				element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(fileContents));

				break;

				default:
				return false;
				break;
			}
		}

		//set file title
		element.setAttribute('download', filename || "Tabulator." + (typeof type === "function" ? "txt" : type));

		//trigger download
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();

		//remove temporary link element
		document.body.removeChild(element);

		return true;
	},

	////////////////// Column Manipulation //////////////////

	//set column style cookie
	_setPersistentCol:function(){
		var self = this;

		//parse styles from columns
		function parseCols(columns){
			var cols = [];

			columns.forEach(function(column){
				var style = {
					field: column.field,
					width: column.width,
					visible: column.visible,
				};

				if(column.columns){
					style.title = column.title;
					style.columns = parseCols(column.columns);
				}

				cols.push(style);

			})

			return cols;
		}

		//create array of column styles only
		var columnStyles = parseCols(self.options.columns);

		//JSON format column data
		var data = JSON.stringify(columnStyles);

		if(self.options.persistentLayout == "cookie"){
			//set cookie expiration far in the future
			var expDate = new Date();
			expDate.setDate(expDate.getDate() + 10000);

			//save cookie
			document.cookie = self.options.persistentLayoutID + "=" + data + "; expires=" + expDate.toUTCString();
		}else{
			//save data to local storage
			localStorage.setItem(self.options.persistentLayoutID, data);
		}
	},

	//set Column style cookie
	_getPersistentCol:function(){
		var self = this;

		var colString = "";

		if(self.options.persistentLayout == "cookie"){
			//find cookie
			var cookie = document.cookie;
			var cookiePos = cookie.indexOf(self.options.persistentLayoutID + "=");

			//if cookie exists, decode and load column data into tabulator
			if(cookiePos > -1){
				cookie = cookie.substr(cookiePos);

				var end = cookie.indexOf(";");

				if(end > -1){
					cookie = cookie.substr(0, end);
				}

				colString = cookie.replace(self.options.persistentLayoutID + "=", "");
			}

		}else{
			//find loocal storage value
			var colString = localStorage.getItem(self.options.persistentLayoutID);
		}

		if(colString){
			self.setColumns(JSON.parse(colString), true);
		}else{
			self._colLayout();
		}
	},

	//set tabulator columns
	setColumns: function(columns, update){
		var self = this;

		//update column properties
		function updateCols(oldCols, newCols){
			newCols.forEach(function(item, to){

				var type = item.columns ? "group" : (item.field ? "field" : "object");
				var from = search(oldCols, item, type);

				if(from !== false){
					var column = oldCols.splice(from, 1)[0];

					column.width = item.width;
					column.visible = item.visible;

					oldCols.splice(to , 0, column);

					if(type == "group"){
						updateCols(column.columns, item.columns);
					}
				}

			});
		}

		//find matching column
		function search(columns, col, type){

			var match = false;

			$.each(columns, function(i, column){;

				switch(type){
					case "group":
					if(col.title === column.title && col.columns.length === column.columns.length){
						match = i;
					}
					break;

					case "field":
					if(col.field === column.field){
						match = i;
					}
					break;

					case "object":
					if(col === column){
						match = i;
					}
					break;
				}

				if(match !== false){
					return false;
				}
			});

			return match;
		}


		if(Array.isArray(columns)){

			//if updating columns work through exisiting column data
			if(update){
				updateCols(self.options.columns, columns);
			}else{
				// if replaceing columns, replace columns array with new
				self.options.columns = columns;
			}

			//Trigger Redraw
			self._colLayout(true);

			if(self.options.persistentLayout){
				self._setPersistentCol();
			}
		}
	},

	//get tabulator columns
	getColumns: function(){
		var self = this;

		return self.options.columns;
	},

	//add column
	addColumn:function(newCol, before, field){
		var self = this;

		if(newCol){
			if(field){
				var match = self._findColumn(field);

				if(match){
					match.parent.splice(before ? match.index : match.index + 1, 0, newCol);
				}
			}else{
				self.options.columns.splice(before ? 0 : self.options.columns.length + 1, 0, newCol);
			}

			self.setColumns(self.options.columns);
		}
	},

	//delete column
	deleteColumn:function(field){
		var self = this;

		if(field){

			var match = self._findColumn(field);

			if(match){
				match.parent.splice(match.index, 1);
			}

			self.setColumns(self.options.columns);
		}
	},

	//traverse all columns and trigger callback on each column
	_traverseColumns:function(callback, columns){
		var self = this;
		columns = columns ? columns : self.options.columns;

		$.each(columns, function(i, column){

			if(column.columns){
				self._traverseColumns(callback, column.columns);
			}else{
				callback(column);
			}

		});
	},

	//find column
	_findColumn:function(field, columns){
		var self = this;
		var match = false;

		columns = columns ? columns : self.options.columns;

		$.each(columns, function(i, column){
			switch(typeof field){
				case "object":
				if(column == field){
					match = {parent:columns, column:column, index:i};
					return false;
				}
				break;

				case "function":
				if(field(column)){
					match = {parent:columns, column:column, index:i};
					return false;
				}
				break;

				default:
				if(column.field == field){
					match = {parent:columns, column:column, index:i};
					return false;
				}
			}

			if(column.columns){
				var children = self._findColumn(field, column.columns);

				if(children){
					match = children;
					return false;
				}
			}
		});

		return match;
	},

	_setColVisibility:function(column, visibility){
		var self = this;

		if(column){
			column.visible = visibility;

			var elements = $(".tabulator-col[data-index=" + column.index + "], .tabulator-cell[data-index=" + column.index + "]", self.element)

			if(visibility){
				elements.show();
			}else{
				elements.hide();
			}

			self._renderTable();

			if(self.options.persistentLayout){
				self._setPersistentCol();
			}
		}
	},

	//hide column
	hideCol: function(field){
		var self = this;
		var match = self._findColumn(field);

		if(match){
			self._setColVisibility(match.column, false);
		}
	},

	//show column
	showCol: function(field){
		var self = this;
		var match = self._findColumn(field);

		if(match){
			self._setColVisibility(match.column, true);
		}
	},

	//toggle column visibility
	toggleCol: function(field){
		var self = this;
		var match = self._findColumn(field);

		if(match){
			self._setColVisibility(match.column, !match.column.visible);
		}
	},

	////////////////// Row Manipulation //////////////////

	//find row in data set
	_findRow: function(id){
		var self = this;
		var row;

		if(typeof id == "object"){
			row = self.data.find(function(item){
				return item === id;
			});
		}else{
			row = self.data.find(function(item){
				return item[self.options.index] == id;
			});
		}

		return row;
	},

	//delete row from table by id
	deleteRow: function(item){
		var self = this;

		var itemType = typeof item;

		var id = (itemType == "number" || itemType == "string") ? item : item.data("data")[self.options.index];

		var row = (itemType == "number" || itemType == "string") ? $("[data-id=" + item + "]", self.element) : item;

		if(row.length){
			var rowData = row.data("data");
			rowData.tabulator_delete_row = true;

			//remove from data
			var line = self.data.find(function(item){
				return item.tabulator_delete_row;
			});

			if(line){
				line = self.data.indexOf(line);

				if(line > -1){
					//remove row from data
					self.data.splice(line, 1);
				}
			}

			//remove from active data
			line = self.activeData.find(function(item){
				return item.tabulator_delete_row;
			});

			if(line){
				line = self.activeData.indexOf(line);

				if(line > -1){
					//remove row from data
					self.activeData.splice(line, 1);
				}
			}

			var group = row.closest(".tabulator-group");

			row.remove();

			if(self.options.groupBy){

				var rows = $(".tabulator-row", group);
				var length = rows.length;

				if(length){

					var data = [];

					rows.each(function(){
						data.push($(this).data("data"));
					});

					var header = $(".tabulator-group-header", group);
					var arrow = $(".tabulator-arrow", header).clone(true,true);

					header.empty();

					header.append(arrow).append(self.options.groupHeader(group.data("value"), length, data));
				}else{
					group.remove();
				}
			}


			//style table rows
			self._styleRows();

			//align column widths
			self._colRender(!self.firstRender);

			self.options.rowDeleted(id);

			self.options.dataEdited(self.data);

			if(self.options.pagination){
				self.paginationMaxPage = Math.max(1, Math.ceil(self.activeData.length/self.options.paginationSize));

				self._layoutPageSelector();

				self.setPage(self.paginationCurrentPage);
			}
		}
	},

	//add blank row to table
	addRow:function(item, top){
		var self = this;

		if(item){
			item[self.options.index] = item[self.options.index] ? item[self.options.index] : 0;
		}else{
			item = {id:0};
		}

		//Apply mutators if present
		item = self._mutateData(item);

		//create blank row
		var row = self._renderRow(item);

		var top = typeof top == "undefined" ? self.options.addRowPos : (top === true || top === "top" ? "top" : "bottom");

		// initial place to append the row in the table, by default in the table row container
		var newRowContainer = self.table;
		// if group are used, look for the corresponding row of the group.
		if(self.options.groupBy){
			var groupVal = typeof(self.options.groupBy) == "function" ? self.options.groupBy(item) : item[self.options.groupBy];
			var group = $(".tabulator-group[data-value='" + groupVal + "']", self.table);
			//if group does not exist, build it
			if(group.length == 0){
				group = self._renderGroup(groupVal);
				self.table.append(group);
				self._renderGroupHeader(group);
			}
			//set the place to append the row to the corresponding group container.
			newRowContainer = group;
		}
		//append to top or bottom of table based on preference
		if(top == "top"){
			if (self.activeData !== self.data){
				self.activeData.unshift(item);
			}

			self.data.unshift(item);
			newRowContainer.prepend(row);
		}else{
			if (self.activeData !== self.data){
				self.activeData.push(item);
			}

			self.data.push(item);
			newRowContainer.append(row);
		}

		//align column widths
		self._colRender(!self.firstRender);

		//style table rows
		self._styleRows();

		//triger event
		self.options.rowAdded(item, row);

		self.options.dataEdited(self.data);
	},

	//update row data
	updateRow:function(index, item, bulk){
		var self = this;

		var itemType = typeof index;

		var id = (itemType == "number" || itemType == "string") ? index : index.data("data")[self.options.index];

		var row = (itemType == "number" || itemType == "string") ? $("[data-id=" + index + "]", self.element) : index;

		if(row.length){
			var rowData = row.data("data");

			//Apply mutators if present
			item = self._mutateData(item);

			//makesure there are differences between the new and old data before updating
			if(JSON.stringify(rowData) !== JSON.stringify(item)){

				//update row data
				for (var attrname in item) { rowData[attrname] = item[attrname]; }

				//render new row
			var newRow = self._renderRow(rowData);

				//replace old row with new row
				row.replaceWith(newRow);


				if(!bulk){
					//align column widths
					self._colRender(!self.firstRender);

					//style table rows
					self._styleRows();
				}


				//triger event
				self.options.rowUpdated(id, item, newRow);

				if(!bulk){
					self.options.dataEdited(self.data);
				}
			}

			return true;
		}

		return false;
	},

	////////////////// Data Manipulation //////////////////

	//get array of data from the table
	getData:function(filteredData){
		var self = this;

		//clone data array with deep copy to isolate internal data from returend result
		var outputData = $.extend(true, [], filteredData === true ? self.activeData: self.data);

		//check for accessors and return the processed data
		return self._applyAccessors(outputData);
	},

	//update existing data
	updateData:function(data){
		var self = this;

		if(data){
			data.forEach(function(item){
				//update each row in turn
				self.updateRow(item[self.options.index], item, true);
			});

			//align column widths
			self._colRender(!self.firstRender);

			//style table rows
			self._styleRows();
			self.options.dataEdited(self.data);
		}
	},

	//apply any column accessors to the data before returing the result
	_applyAccessors:function(data){
		var self = this;

		self._traverseColumns(function(col){
			if(col.accessor){
				var accessor = typeof col.accessor === "function" ? col.accessor : self.accessors[col.accessor];

				data.forEach(function(item, j){
					item[col.field] = accessor(item[col.field], item);
				});
			}
		})

		return data;
	},


	///////////////// Pagination Data Loading //////////////////

	//parse paginated data
	_parsePageData:function(data, update){
		var self = this;
		var options = self.options;

		self.paginationMaxPage = parseInt(data[options.paginationDataReceived.last_page]);

		self._layoutPageSelector();

		self._parseData(data[options.paginationDataReceived.data], update);
	},


	_getRemotePageData:function(update){
		var self = this;
		var options = self.options;

		if(typeof options.paginator == "function"){
			var url = options.paginator(options.ajaxURL, self.paginationCurrentPage, options.paginationSize, options.ajaxParams);
			self._getAjaxData(url, {}, null, update);
		}else{
			var pageParams = {};

			//clone ajax params into page request params
			for (var attrname in options.ajaxParams) { pageParams[attrname] = options.ajaxParams[attrname]; }

			//set page number
		pageParams[options.paginationDataSent.page] = self.paginationCurrentPage;

			//set page size if defined
			if(options.paginationSize){
				pageParams[options.paginationDataSent.size] = options.paginationSize;
			}

			//set sort data if defined
			if(self.sortCurCol && typeof self.sortCurCol.field === "string"){
				pageParams[options.paginationDataSent.sort] = self.sortCurCol.field;
				pageParams[options.paginationDataSent.sort_dir] = self.sortCurDir;
			}

			//set filter data if defined
			if(self.filterField && typeof self.filterField === "string"){
				pageParams[options.paginationDataSent.filter] = self.filterField;
				pageParams[options.paginationDataSent.filter_value] = self.filterValue;
				pageParams[options.paginationDataSent.filter_type] = self.filterType;
			}

			self._getAjaxData(options.ajaxURL, pageParams, null, update);
		}

	},

	////////////////// Data Loading //////////////////


	//load data
	setData:function(data, params, type){
		var self = this;

		self.options.dataLoading(data, params);

		params = params ? params : {};

		self.options.ajaxParams = params;

		//show loader if needed
		self._showLoader(this, this.options.loader);

		if(typeof(data) === "string"){
			if (data.indexOf("{") == 0 || data.indexOf("[") == 0){
				//data is a json encoded string
				self._parseData(jQuery.parseJSON(data));
			}else{

				self.options.ajaxURL = data;

				if(self.options.pagination == "remote"){
					self.setPage(1);
				}else{
					//assume data is url, make ajax call to url to get data
					self._getAjaxData(data, params, type);
				}

			}
		}else{
			if(data){
				//asume data is already an object
				self._parseData(data);

			}else{
				//no data provided, check if ajaxURL is present;
				if(this.options.ajaxURL){

					if(self.options.pagination == "remote"){
						self.setPage(1);
					}else{
						self._getAjaxData(this.options.ajaxURL, params, type);
					}

				}else{
					//empty data
					self._parseData([]);
				}
			}
		}
	},

	//clear data
	clear:function(){
		this.table.empty();
		this.data = [];
		this._filterData();
	},

	//get json data via ajax
	_getAjaxData:function(url, params, type, update){
		var self = this;
		var options = self.options;

		$.ajax({
			url: url,
			type: type || self.options.ajaxType,
			data: params || self.options.ajaxParams,
			async: true,
			dataType:"json",
			success: function (data){

				var returnedData = typeof self.options.ajaxResponse === "function" ? self.options.ajaxResponse(url, params ? params : self.options.ajaxParams, data) : data;

				if(self.options.pagination == "remote" || self.options.progressiveRender == "remote"){
					self._parsePageData(returnedData, update);
				}else{
					self._parseData(returnedData, update);
				}

			},
			error: function (xhr, textStatus, errorThrown){
				console.error("Tablulator ERROR (ajax get): " + xhr.status + " - " + errorThrown);

				self.options.dataLoadError(xhr, textStatus, errorThrown);
				self._showLoader(self, self.options.loaderError);
			},
		});
	},

	//parse and index data
	_parseData:function(data, update){
		var self = this;

		if(Array.isArray(data)){
			var newData = [];

			if(data.length){
				if(typeof(data[0][self.options.index]) == "undefined"){
					self.options.index = "_index";
					$.each(data, function(i, item){
						newData[i] = item;
						newData[i]["_index"] = i;
					});

				}else{
					$.each(data, function(i, item){
						newData.push(item);
					});
				}
			}

			self.options.dataLoaded(newData);

			var mutatedData = self._mutateData(newData);

			if(update){
				self.data = mutatedData;
				self.data = self.data.concat(mutatedData);
				self.activeData = self.activeData.concat(mutatedData);

				if(self.progressiveRenderFill){
					self._renderTable(true);
				}
			}else{
				self.data = mutatedData;

				self._clearSelection();

				//filter incomming data
				self._filterData();
			}
		}
	},

	//applu mutators if present
	_mutateData:function(data){
		var self = this;

		self._traverseColumns(function(col){
			if(col.mutator && col.mutateType !== "edit"){

				var mutator = typeof col.mutator === "function" ? col.mutator : self.mutators[col.mutator];

				if(Array.isArray(data)){
					data.forEach(function(item, j){
						if(typeof item[col.field] != "undefined"){
							item[col.field] = mutator(item[col.field], "data", item);
						}
					});
				}else{
					if(typeof data[col.field] != "undefined"){
						data[col.field] = mutator(data[col.field], "data", data);
					}
				}
			}
		});

		return data;
	},



	////////////////// Data Filtering //////////////////

	//filter data in table
	setFilter:function(field, type, value){
		var self = this;

		if(!self.options.selectablePersistence){
			self._clearSelection();
		}

		self.options.dataFiltering(field, type, value);

		//set filter
		if(field){
			//set filter
			self.filterField = field;
			self.filterType = typeof(value) == "undefined" ? "=" : type;
			self.filterValue = typeof(value) == "undefined" ? type : value;
		}else{
			//clear filter
			self.filterField = null;
			self.filterType = null;
			self.filterValue = null;
		}

		//render table
		this._filterData();
	},

	//clear filter
	clearFilter:function(){
		var self = this;

		self.filterField = null;
		self.filterType = null;
		self.filterValue = null;

		//render table
		this._filterData();
	},

	//get current filter info
	getFilter:function(){
		var self = this;

		if(self.filterField){

			var filter = {
				"field":self.filterField,
				"type":self.filterType,
				"value":self.filterValue,
			};

			return filter;

		}else{
			return false;
		}
	},

	//filter data set
	_filterData:function(){
		var self = this;

		//filter data set
		if(self.filterField){
			self.activeData = self.data.filter(function(row){
				return self._filterRow(row);
			});
		}else{
			self.activeData = self.data;
		}

		//set the max pages available given the filter results
		if(self.options.pagination == "local"){
			self.paginationMaxPage = Math.max(1, Math.ceil(self.activeData.length/self.options.paginationSize));
		}

		self.options.dataFiltered(self.activeData, self.filterField, self.filterType, self.filterValue);

		//sort or render data
		if(self.sortCurCol && self.options.pagination != "remote"){
			self.sort(self.sortCurCol, self.sortCurDir);
		}else{
			//determine pagination information / render table
			if(self.options.pagination == "local"){
				self.setPage(1);
			}else{
				self._renderTable();
			}
		}
	},

	//check if row data matches filter
	_filterRow:function(row){
		var self = this;

		// if no filter set display row
		if(!self.filterField){
			return true;
		}else{

			if(typeof(self.filterField) == "function"){

				return self.filterField(row);

			}else{
				var value = row[self.filterField];
				var term = self.filterValue;

				switch(self.filterType){
					case "=": //equal to
					return value == term ? true : false;
					break;

					case "<": //less than
					return value < term ? true : false;
					break;

					case "<=": //less than or equal too
					return value <= term ? true : false;
					break;

					case ">": //greater than
					return value > term ? true : false;
					break;

					case ">=": //greater than or equal too
					return value >= term ? true : false;
					break;

					case "!=": //not equal to
					return value != term ? true : false;
					break;

					case "like": //text like
					if(value === null){
						return term === value ? true : false;
					}else{
						return value.toLowerCase().indexOf(term.toLowerCase()) > -1 ? true : false;
					}
					break;

					default:
					return false;
				}
			}
		}

		return false;
	},

	////////////////// Data Sorting //////////////////

	//return the current sorter
	getSort:function(){
		var self = this;

		return {
			"field" : self.sortCurCol ? self.sortCurCol.field : false,
			"dir" : self.sortCurDir || false,
		};
	},

	//handle user clicking on column header sort
	_sortClick: function(column, element){
		var self = this;

		if (element.data("sortdir") == "desc"){
			element.data("sortdir", "asc").attr("aria-sort", "ascending");
		}else{
			element.data("sortdir", "desc").attr("aria-sort", "descending");
		}

		self.sort(column, element.data("sortdir"));
	},

	// public sorter function
	sort: function(sortList, dir){
		var self = this;
		var header = self.header;
		var options = this.options;

		if(!self.options.selectablePersistence){
			self._clearSelection();
		}

		if(!Array.isArray(sortList)){
			sortList = [{field: sortList, dir:dir}];
		}

		$.each(sortList, function(i, item){

			//convert column name to column object
			if(typeof(item.field) == "string"){
				var match = self._findColumn(item.field);

				if(match){
					item.field = match.column;
				}
			}

			//reset all column sorts
			$(".tabulator-col[data-sortable=true][data-field!=" + item.field.field + "]", self.header).data("sortdir", "desc").attr("aria-sort", "none");
			$(".tabulator-col .tabulator-arrow", self.header).removeClass("asc desc");

			var element = $(".tabulator-col[data-field='" + item.field.field + "']", header);

			var arrow = $(".tabulator-arrow", element);

			if (dir == "asc"){
				arrow.removeClass("desc").addClass("asc");
			}else{
				arrow.removeClass("asc").addClass("desc");
			}

			self._sorter(item.field, item.dir, sortList, i);

		});

		self.options.dataSorted(self.data, sortList, dir);

		//determine pagination information / render table
		if(self.options.pagination){
			self.setPage(1);
		}else{
			self._renderTable();
		}
	},

	//sort table
	_sorter: function(column, dir, sortList, i){
		var self = this;
		var table = self.table;
		var options = self.options;
		var data = self.data;

		self.options.dataSorting(sortList, dir);

		self.sortCurCol = column;
		self.sortCurDir = dir;

		self._sortElement(table, column, dir, sortList, i);
	},

	//itterate through nested sorters
	_sortElement:function(element, column, dir, sortList, i){
		var self = this;

		self.activeData = self.activeData.sort(function(a,b){

			var result = self._processSorter(a, b, column, dir);

			//if results match recurse through previous searchs to be sure
			if(result == 0 && i){
				for(var j = i-1; j>= 0; j--){
					result = self._processSorter(a, b, sortList[j].field, sortList[j].dir);

					if(result != 0){
						break;
					}
				}
			}

			return result;
		})
	},

	//process individual sort functions on active data
	_processSorter:function(a, b, column, dir){
		var self = this;
		//switch elements depending on search direction
		var el1 = dir == "asc" ? a : b;
		var el2 = dir == "asc" ? b : a;

		a = el1[column.field];
		b = el2[column.field];

		//run sorter
		var sorter = typeof(column.sorter) == "undefined" ? "string" : column.sorter;
		sorter = typeof(sorter) == "string" ? self.sorters[sorter] : sorter;

		return sorter.call(self, a, b, el1, el2);
	},

	////////////////// Data Pagination //////////////////

	//get current page number
	getPage:function(){
		var self = this;
		return self.options.pagination ? self.paginationCurrentPage : false;
	},

	//return max page
	getPageMax:function(){
		var self = this;
		return self.options.pagination ? self.paginationMaxPage : false;
	},

	//set current paginated page
	setPage:function(page){
		var self = this;

		if(!self.options.selectablePersistence){
			self._clearSelection();
		}

		switch(page){
			case "first":
			self.paginationCurrentPage = 1;
			break;

			case "prev":
			if(self.paginationCurrentPage > 1){
				self.paginationCurrentPage--;
			}
			break;

			case "next":
			if(self.paginationCurrentPage < self.paginationMaxPage){
				self.paginationCurrentPage++;
			}
			break;

			case "last":
			self.paginationCurrentPage = self.paginationMaxPage;
			break;

			default:
			if(page > self.paginationMaxPage){
				page = self.paginationMaxPage;
			}

			self.paginationCurrentPage = page;
			break;
		}

		if(self.options.pagination == "local"){
			self._layoutPageSelector();
			self._renderTable();
		}else{

			self._getRemotePageData();
		}

	},

	//set page size for the table
	setPageSize:function(size){
		var self = this;

		if(Number.isInteger(size) && size > 0){
			self.options.paginationSize = parseInt(size);
			self._filterData();
		}
	},


	//create page selector layout for current page
	_layoutPageSelector:function(){
		var self = this;

		var min = 1, max = self.paginationMaxPage;

		var pages = $(".tabulator-pages", self.paginator);

		pages.empty();

		var spacer = $("<span> ... </span>");

		if(self.paginationMaxPage > 10){

			if(self.paginationCurrentPage <= 4){
				max = 5;
			}else if(self.paginationCurrentPage > self.paginationMaxPage - 4){
				min = self.paginationMaxPage - 4;

				pages.append(spacer.clone());
			}else{
				min = self.paginationCurrentPage - 2;
				max = self.paginationCurrentPage + 2;

				pages.append(spacer.clone());
			}
		}

		for(var i = min; i <= max; ++i){

			var active = i == self.paginationCurrentPage ? "active" : "";

			pages.append("<span class='tabulator-page " + active + "' data-page='" + i + "' role='button' aria-label='Show Page " + i + "'>" + i + "</span>");
		}

		if(self.paginationMaxPage > 10){
			if(self.paginationCurrentPage <= 4 || self.paginationCurrentPage <= self.paginationMaxPage - 4){
				pages.append(spacer.clone());
			}
		}

		$(".tabulator-page", self.paginator).removeClass("disabled").attr("aria-disabled", "false");

		if(self.paginationCurrentPage == 1){
			$(".tabulator-page[data-page=first], .tabulator-page[data-page=prev]", self.paginator).addClass("disabled").attr("aria-disabled", "true");
		}

		if(self.paginationCurrentPage == self.paginationMaxPage){
			$(".tabulator-page[data-page=next], .tabulator-page[data-page=last]", self.paginator).addClass("disabled").attr("aria-disabled", "true");
		}
	},

	////////////////// Render Data to Table //////////////////

	//render active data to table rows
	_renderTable:function(progressiveRender){
		var self = this;
		var options = self.options;
		var hozScrollPos = 0;

		self.options.renderStarted();

		//show loader if needed
		self._showLoader(self, self.options.loader);

		if(!progressiveRender){

			clearTimeout(self.progressiveRenderTimer);

			//get current left scroll position
			hozScrollPos = self.tableHolder.scrollLeft();

			//clear data from table before loading new
			self.table.empty();
		}


		if(!options.pagination && options.progressiveRender && !progressiveRender){
			if(options.progressiveRender !== "remote"){
				self.paginationCurrentPage = 1;
				self.paginationMaxPage = Math.ceil(self.activeData.length/self.options.progressiveRenderSize);
				options.paginationSize = options.progressiveRenderSize;
			}else{
				options.paginationSize = self.activeData.length
			}

			progressiveRender = true;
		}

		var renderData = options.pagination == "local" || options.progressiveRender ? self.activeData.slice((self.paginationCurrentPage-1) * self.options.paginationSize, ((self.paginationCurrentPage-1) * self.options.paginationSize) + self.options.paginationSize) : self.activeData;

		//build rows of table
		renderData.forEach(function(item, i){

			var row = self._renderRow(item);

			if(options.groupBy){

				// if groups in use, render column in group
				var groupVal = typeof(options.groupBy) == "function" ? options.groupBy(item) : item[options.groupBy];


				var group = $(".tabulator-group[data-value='" + groupVal + "']", self.table);

				//if group does not exist, build it
				if(group.length == 0){
					group = self._renderGroup(groupVal);
					self.table.append(group);
				}

				$(".tabulator-group-body", group).append(row);

			}else{
				//if not grouping output row to table
				self.table.append(row);
			}

		});


		//enable movable rows
		if(options.movableRows){

			//sorter options
			var config = {
				handle:".tabulator-row-handle",
				opacity: 1,
				axis: "y",
				start: function(event, ui){
					ui.item.addClass("tabulator-row-moving");
				},
				stop: function(event, ui){
					ui.item.removeClass("tabulator-row-moving");
				},
				update: function(event, ui){
					//restyle rows
					self._styleRows();

					//clear sorter arrows
					$(".tabulator-col[data-sortable=true]", self.header).data("sortdir", "desc");
					$(".tabulator-col .tabulator-arrow", self.header).removeClass("asc desc");
					self.activeData = [];

					//update active data to mach rows
					$(".tabulator-row", self.table).each(function(){
						self.activeData.push($(this).data("data"));
					});

					//trigger callback
					options.rowMoved(ui.item.data("id"), ui.item.data("data"), ui.item,ui.item.prevAll(".tabulator-row").length);
				},

			}

			//if groups enabled, set sortable on groups, otherwise set it on main table
			if(options.groupBy){
				$(".tabulator-group-body", self.table).sortable(config);
			}else{
				self.table.sortable(config);
			}
		}

		if(options.groupBy){

			$(".tabulator-group", self.table).each(function(){
				self._renderGroupHeader($(this));
			});

			self._sortElement(self.table, {}, "asc", true); //sort groups

		}

		//align column widths
		self._colRender(!self.firstRender);

		//style table rows
		self._styleRows();

		if(progressiveRender && self.paginationCurrentPage < self.paginationMaxPage && self.tableHolder[0].scrollHeight <= self.tableHolder.innerHeight()){
			self.progressiveRenderFill = true;

			//trigger progressive render to fill element
			self.paginationCurrentPage++;
			if(options.progressiveRender == "remote"){
				self._getRemotePageData(true);
			}else{
				self._renderTable(true);
			}

		}else{

			//hide loader div
			self._hideLoader(self);


			if(self.options.pagination){
				self.options.pageLoaded(self.paginationCurrentPage);
			}


			if(options.progressiveRender == "remote"){
				self.progressiveRenderFill = false;
				self.paginationCurrentPage++;
				self._getRemotePageData(true);
			}
		}

		if(!progressiveRender){
			//get current left scroll position
			self.tableHolder.scrollLeft(hozScrollPos);
		}

		if(self.firstRender){
			self.firstRender = false;
			options.tableBuilt();
		}

	},

	//render individual rows
	_renderRow:function(item){
		var self = this;
		var row = $("<div class='tabulator-row' data-id='" + item[self.options.index] + "' role='row'></div>");

		//bind row data to row
		row.data("data", item);

		//handle persistent selection
		if(self.options.selectablePersistence){

			if(self.selectedRows.some(function(sel){
				return sel === item;
			})){
				row.addClass("tabulator-selected");
			}

		}

		//bind row click events
		row.on("click", function(e){self._rowClick(e, row, item)});
		row.on("dblclick", function(e){self._rowDblClick(e, row, item)});
		row.on("contextmenu", function(e){self._rowContext(e, row, item)});

		//bind row select events

		var endSelect = function(){

			setTimeout(function(){
				self.selecting = false;
			}, 50)

			$("body").off("mouseup", endSelect);
			$("body").off("keyup", endSelect);
		}

		if(self.options.selectable && self.options.selectable != "highlight"){
			row.on("click", function(e){
				if(!self.selecting){
					self._rowSelect(row);
				}
			});

			row.on("mousedown", function(e){
				if(e.shiftKey){
					self.selecting = true;

					self.selectPrev = [];

					$("body").on("mouseup", endSelect);
					$("body").on("keyup", endSelect);

					self._rowSelect($(this));

					return false;
				}
			})

			row.on("mouseenter", function(e){
				if(self.selecting){
					self._rowSelect($(this));

					if(self.selectPrev[1] == this){
						self._rowSelect($(self.selectPrev[0]));
					}
				}
			})

			row.on("mouseout", function(e){
				if(self.selecting){
					self.selectPrev.unshift(this);
				}
			})
		}

		//add row handle if movable rows enabled
		if(self.options.movableRows){

			var handle = $("<div class='tabulator-row-handle'></div>");
			handle.append(self.options.movableRowHandle);
			row.append(handle);
		}

		$.each(self.columnList, function(i, column){
			//deal with values that arnt declared
			var value = typeof(item[column.field]) == "undefined" ? "" : item[column.field];

			// set empty values to not break search
			if(typeof(item[column.field]) == "undefined"){
				item[column.field] = "";
			}

			//set column text alignment
			var align = typeof(column.align) == "undefined" ? "left" : column.align;

			//allow tabbing on editable cells
			var tabbable = column.editable || column.editor ? "tabindex='0'" : "";
			var visibility = column.visible ? "inline-block" : "none";

			//set style as string rather than using .css for massive improvement in rendering time
			var cellStyle = "text-align: " + align + "; display:" + visibility + ";";

			var cell = $("<div class='tabulator-cell " + column.cssClass + "' " + tabbable + " style='" + cellStyle + "' data-index='" + i + "' data-field='" + column.field + "' data-value='" + self._safeString(value) + "' role='gridcell'></div>");

			//add tooltip to cell
			self._generateTooltip(cell, item, column.tooltip);

			//match editor if one exists
			if (column.editable || column.editor){
				if(column.editor){
					var editor = column.editor;
				}else{
					var editor = self.editors[column.formatter] ? column.formatter: "input";
				}
				cell.data("editor", editor);
			}

			//format cell contents
			cell.data("formatter", column.formatter);
			cell.data("formatterParams", column.formatterParams);
			cell.html(self._formatCell(column.formatter, value, item, cell, row, column.formatterParams));

			//bind cell double click function
			if(typeof(column.onDblClick) == "function"){
				cell.on("dblclick", function(e){self._cellDblClick(e, cell)});
			}

			//bind cell context function
			if(typeof(column.onContext) == "function"){
				cell.on("contextmenu", function(e){self._cellContext(e, cell)});
			}

			//bind cell click function
			if(typeof(column.onClick) == "function"){
				cell.on("click", function(e){self._cellClick(e, cell)});
			}else{
				//handle input replacement on editable cells
				if(cell.data("editor")){

					cell.on("click", function(e){
						if(!$(this).hasClass("tabulator-editing")){
							$(this).focus();
						}
					});

					cell.on("focus", function(e){
						e.stopPropagation();

						//Load editor
						var editorFunc = typeof(cell.data("editor")) == "string" ? self.editors[cell.data("editor")] : cell.data("editor");

						var cellEditor = editorFunc.call(self, cell, cell.data("value"), cell.closest(".tabulator-row").data("data"));

						//if editor returned, add to DOM, if false, abort edit
						if(cellEditor !== false){
							cell.addClass("tabulator-editing");
							cell.empty();
							cell.append(cellEditor);

							//prevent editing from tirggering rowClick event
							cell.children().click(function(e){
								e.stopPropagation();
							})
						}else{
							cell.blur();
						}

					});

					//assign cell mutator function if needed
					if(column.mutator && column.mutateType !== "data"){
						var mutator = typeof column.mutator === "function" ? column.mutator : self.mutators[column.mutator];

						cell.data("mutator", mutator);
					}
				}
			}

			row.append(cell);
		});

		return row;
	},

	//render group element
	_renderGroup:function(value){
		var group = $("<div class='tabulator-group show' data-value='" + value + "' role='rowgroup'><div class='tabulator-group-header' role='rowheader'></div><div class='tabulator-group-body'></div></div>");

		return group;
	},

	//render group set
	_renderGroupHeader:function(group){
		var self = this;

		//create sortable arrow chevrons
		var arrow = $("<div class='tabulator-arrow'></div>")
		.on("click", function(){
			$(this).closest(".tabulator-group").toggleClass("show");
		});

		var data = [];

		$(".tabulator-row", group).each(function(){
			data.push($(this).data("data"));
		});


		$(".tabulator-group-header", group)
		.html(arrow)
		.append(self.options.groupHeader(group.data("value"), $(".tabulator-row", group).length, data));

		self._setGroupOpenState(group, group.data("value"), $(".tabulator-row", group).length, data);
	},

	//set group starting open state
	_setGroupOpenState:function(group, value, count, data){
		var self = this;

		var state = self.options.groupStartOpen;

		if(typeof state == "function"){
			state = state(value, count, data);
		}

		if(state === true){
			group.addClass("show");
		}else{
			group.removeClass("show");
		}
	},

	//show loader blockout div
	_showLoader:function(self, msg){
		if(self.options.showLoader){
			$(".tabulator-loader-msg", self.loaderDiv).attr("role","alert")
			$(".tabulator-loader-msg", self.loaderDiv).empty().append(msg);
			$(".tabulator-loader-msg", self.loaderDiv).css({"margin-top":(self.element.innerHeight() / 2) - ($(".tabulator-loader-msg", self.loaderDiv).outerHeight()/2)});
			self.element.append(self.loaderDiv);
		}
	},

	//hide loader
	_hideLoader:function(self){
		$(".tablulator-loader", self.element).remove();
	},

	//generate tooltip text
	_generateTooltip:function(cell, data, tooltip){
		var self = this;

		var tooltip = tooltip || tooltip === false ? tooltip : self.options.tooltips;

		if(tooltip === true){
			tooltip = cell.data("value");
		}else if(typeof(tooltip) == "function"){
			tooltip = tooltip(cell.data("field"), cell.data("value"), data);
		}

		if(tooltip){
			cell.attr("title", tooltip);
		}else{
			cell.attr("title", "");
		}
	},


	////////////////// Column Styling //////////////////

	//resize a colum to specified width
	_resizeCol:function(index, width){
		var self = this;

		$(".tabulator-cell[data-index=" + index + "], .tabulator-col[data-index=" + index + "]",this.element).css({width:width});

		//reinstate right edge on table if fitted columns resized
		if(self.options.fitColumns){
			$(".tabulator-row .tabulator-cell:last-of-type",self.element).css("border-right","");
			$(".tabulator-col:last",self.element).css("border-right","");
		}

		self._vertAlignColHeaders();

		self._calcFrozenColumnsPos();
	},

	//set all headers to the same height
	_vertAlignColHeaders:function(){
		var self = this;

		if(self.header){
			var headerHeight = self.header.outerHeight();
			var subheadings = $(".tabulator-col-group-cols>.tabulator-col:not(.tabulator-col-group)", self.header);
			var cols = $(".tabulator-col:not(.tabulator-col-group)", self.header);

			//resize header elements
			cols.css({"padding-top":""})
			subheadings.css({"height":""});
			$(">.tabulator-col, >.tabulator-col-row-handle", self.header).css({"height":""}).css({"height":self.header.innerHeight() + "px"});
			subheadings.each(function(){
				$(this).css({"height":$(this).parent().innerHeight()})
			})

			//vertical align column headers
			if(self.options.colVertAlign !== "top"){
				cols.each(function(){
					var col = $(this);
					var height = $(".tabulator-col-content", col).outerHeight();

					col.css({"padding-top": col.innerHeight() - (self.options.colVertAlign === "bottom" ? height : height*1.5)})
				});
			}

			//resize table holder to match header height
			if(self.options.height && headerHeight != self.header.outerHeight()){
				self.tableHolder.css({
					"min-height":"calc(100% - " + self.header.outerHeight() + "px)",
					"max-height":"calc(100% - " + self.header.outerHeight() + "px)",
				});
			}
		}

		//allow for scrolling of headers if table is empty
		if(self.table.is(":empty") && self.header[0].scrollWidth > self.header.outerHeight()){
			self.table.css({
				"min-width":self.header[0].scrollWidth + "px",
				"min-height":"1px",
				"visibility":"hidden",
			});
		}else{
			self.table.css({
				"min-width":"",
				"min-height":"",
				"visibility":"",
			});
		}

	},

	//layout columns
	_colLayout:function(forceRedraw){
		var self = this;
		var options = self.options;
		var element = self.element;

		self.header.empty();
		self.columnList = [];

		self._colLayoutGroup(self.options.columns, self.header);

		if(options.responsiveLayout){
			self._buildResponsiveColumnsList();
		}


		//build list of frozen columns
		var colCount = self.columnList.length;

		self.columnFrozenLeft = [];
		self.columnFrozenRight = [];

		var freezeCont = true;

		//build left column freeze list
		for (var i = 0; i < colCount; ++i) {;
			if(self.columnList[i].frozen && freezeCont){
				self.columnFrozenLeft.push(self.columnList[i]);
			}else{
				freezeCont = false;
			}
		}

		//build right column freeze list if entire table isnt frozen
		if(self.columnFrozenLeft.length != self.columnList.length){
			freezeCont = true;

			//build right column freeze list
			for (var i = colCount - 1; i >= 0; --i) {;
				if(self.columnList[i].frozen && freezeCont){
					self.columnFrozenRight.push(self.columnList[i]);
				}else{
					freezeCont = false;
				}
			}
		}



		//create sortable arrow chevrons
		var arrow = $("<div class='tabulator-arrow'></div>");


		//handle resizable columns
		if(self.options.colResizable){
			//create resize handle
			var handle = $("<div class='tabulator-handle'></div>");
			var prevHandle = $("<div class='tabulator-handle prev'></div>");

			$(".tabulator-col", self.header).append(handle)
			.append(prevHandle);

			$(".tabulator-col .tabulator-handle", self.header).on("mousedown", function(e){

				e.stopPropagation(); //prevent resize from interfereing with movable columns

				var colHandle = $(this);

				var colElement = !colHandle.hasClass("prev") ? colHandle.closest(".tabulator-col") : colHandle.closest(".tabulator-col").prev(".tabulator-col");

				if(typeof colElement.attr("data-index") === "undefined"){
					colElement = $(".tabulator-col", colElement).last();
				}

				if(colElement){
					self.mouseDrag = e.screenX;
					self.mouseDragWidth = colElement.outerWidth();
					self.mouseDragElement = colElement;
				}

				$("body").on("mouseup", endColMove);
			})
			self.element.on("mousemove", function(e){
				if(self.mouseDrag){
					self.mouseDragElement.css({width: self.mouseDragWidth + (e.screenX - self.mouseDrag)})
					self._resizeCol(self.mouseDragElement.attr("data-index"), self.mouseDragElement.outerWidth());
				}
			})

			var endColMove = function(e){
				if(self.mouseDrag){
					e.stopPropagation();
					e.stopImmediatePropagation();

					$("body").off("mouseup", endColMove);

					self.mouseDragOut = true;

					self._resizeCol(self.mouseDragElement.attr("data-index"), self.mouseDragElement.outerWidth());

					var match = self._findColumn(self.mouseDragElement.data("field"));

					if(match){
						match.column.width = self.mouseDragElement.outerWidth();
					}

					if(self.options.persistentLayout){
						self._setPersistentCol();
					}

					self.mouseDrag = false;
					self.mouseDragWidth = false;
					self.mouseDragElement = false;
				}
			}

		}

		element.append(self.header);
		self.tableHolder.append(self.table);
		element.append(self.tableHolder);

		//handle frozen columns
		if(self.columnFrozenLeft.length){
			var leftFrozen = $("<div class='tabulator-col tabulator-frozen tabulator-frozen-left'></div>");
			self.header.prepend(leftFrozen);

			//handle movable rows
			leftFrozen.append($(".tabulator-col-row-handle", self.header));

			self.columnFrozenLeft.forEach(function(column){
				leftFrozen.append($(".tabulator-col[data-index=" + column.index + "]", self.header));
			});
		}

		if(self.columnFrozenRight.length){
			var rightFrozen = $("<div class='tabulator-col tabulator-frozen tabulator-frozen-right'></div>");
			self.header.append(rightFrozen);

			self.columnFrozenRight.forEach(function(column){
				rightFrozen.prepend($(".tabulator-col[data-index=" + column.index + "]", self.header));
			});
		}


		//add pagination footer if needed
		if(self.footer){
			element.append(self.footer);

			var footerHeight = self.header.outerHeight() + self.footer.outerHeight();

			self.tableHolder.css({
				"min-height":"calc(100% - " + footerHeight + "px)",
				"max-height":"calc(100% - " + footerHeight + "px)",
			});
		}else{
			if(self.options.height){
				self.tableHolder.css({
					"min-height":"calc(100% - " + self.header.outerHeight() + "px)",
					"max-height":"calc(100% - " + self.header.outerHeight() + "px)",
				});
			}
		}

		//set paginationSize if pagination enabled, height is set but no pagination number set, else set to ten;
		if(self.options.pagination == "local" && !self.options.paginationSize){
			if(self.options.height){
				self.options.paginationSize = Math.floor(self.tableHolder.outerHeight() / ($(".tabulator-col .tabulator-col-content", self.header).first().outerHeight()));
			}else{
				self.options.paginationSize = 10;
			}
		}

		element.on("editval", ".tabulator-cell", function(e, value){
			var element = $(this);
			if(element.is(":focus")){element.blur()}
				self._cellDataChange(element, value);
		});

		element.on("editcancel", ".tabulator-cell", function(e, value){
			self._cellDataChange($(this), $(this).data("value"));
		});

		//append sortable arrows to sortable headers
		$(".tabulator-col[data-sortable=true] .tabulator-col-content", self.header)
		.data("sortdir", "desc")
		.append(arrow.clone());

		setTimeout(function(){//give columns time to be built before rendering
			//render column headings
			self._colRender(false, forceRedraw);

			if(self.firstRender){
				if(self.options.data){
					setTimeout(function(){ //give columns time to render before looding data set
						self._parseData(self.options.data);
					}, 100);
				}else{
					if(self.options.ajaxURL){
						if(self.options.pagination === "remote"){
							self.setPage(1);
						}else if(self.options.progressiveRender == "remote"){
							self.paginationCurrentPage = 1;
							self._getRemotePageData();
						}else{
							self._getAjaxData(self.options.ajaxURL, self.options.ajaxParams, self.options.ajaxType);
						}
					}
				}
			}
		}, 100);
	},

	_colLayoutGroup:function(columns, container){
		var self = this;
		var options = self.options;
		var element = self.element;

		//add column for row handle if movable rows enabled
		if(options.movableRows){
			var handle = $("<div class='tabulator-col-row-handle' role='gridcell'>&nbsp</div>");
			self.header.append(handle);
		}

		//setup movable columns
		if(options.movableCols){

			container.sortable({
				axis: "x",
				opacity:1,
				tolerance: "pointer",
				// containment: container,
				cancel:".tabulator-col-row-handle, .tabulator-col[data-field=''], .tabulator-col[data-field=undefined], .tabulator-frozen",
				start: function(event, ui){
					ui.placeholder.css({"display":"inline-block", visibility:"visible", "width":ui.item.outerWidth()});
				},
				change: function(event, ui){
					var item = ui.item;
					var placeholder = ui.placeholder;

					placeholder.css({"display":"inline-block", visibility:"visible", "width":ui.item.outerWidth()});

					//find next column
					function nextColumn(element){

						var nextCol = element.next(".tabulator-col");

						//handle cells at end of group
						if(!nextCol.length){
							var group = element.parent().closest(".tabulator-col.tabulator-col-group");
							if(group.length){
								var nextCol = nextColumn(group);
							}
						}

						//handle next column being a column group
						if(nextCol.hasClass("tabulator-col-group")){
							return $(".tabulator-col[data-index]", nextCol).first();
						}

						return nextCol;
					}

					//move cells in column
					function moveColumn(from, to){
						$(".tabulator-row", self.table).each(function(){
							if(to.length){
								$(".tabulator-cell[data-index=" + from.data("index") + "]", $(this)).insertBefore($(".tabulator-cell[data-index=" + to.data("index") + "]", $(this)));
							}else{
								$(this).append($(".tabulator-cell[data-index=" + from.data("index") + "]", $(this)));
							}
						})
					}

					var next = nextColumn(ui.placeholder);

					if(item.index != next.data("index")){
						//move whole column groups or individual columns
						if(item.hasClass("tabulator-col-group")){
							var to = next
							$($(".tabulator-col[data-index]", item).get().reverse()).each(function(){
								moveColumn($(this), to);
								to = $(this);
							});
						}else{
							moveColumn(item, next);
						}
					}

				},
				update: function(event, ui){

					//find column layout structure
					var neighbour = ui.item.next(".tabulator-col");
					var group = ui.item.parent().closest(".tabulator-col-group");

					var from = ui.item.data("column");
					var container = group.length ? group.data("column").columns : options.columns;
					var to = neighbour.length ? neighbour.data("column") : null;

					//splice column into new position
					var column = container.splice(self._findColumn(from, container).index, 1)[0];
					to = self._findColumn(to, container).index;
					container.splice(typeof to !== "undefined" ? to : container.length , 0, column);

					//regenerate column render list
					self.columnList = [];
					self._traverseColumns(function(column){
						// column.index = self.columnList.length -1;
						self.columnList.push(column);
					})

					//trigger callback
					options.colMoved(ui.item.data("field"), options.columns);

					if(self.options.persistentLayout){
						self._setPersistentCol();
					}


				},
			});
		}

		//handle filter update
		function updateFilter(){

			var filters = {};

			//determine filter value and type
			$(".tabulator-header-filter", self.header).each(function(){
				var element = $(this);
				var filterVal = element.data("filter-val");

				if(typeof filterVal !== "undefined" && filterVal !== ""){

					var comparison = "match";

					if($("input", $(this)).length){
						if($("input", $(this)).attr("type") == "text" || $("input", $(this)).attr("type") == ""){
							comparison = "partial";
						}
					}

					filters[element.closest(".tabulator-col").data("field")] = {value:filterVal, comparison:comparison};
				}
			});

			//filter all columns
			function colFilter(data){
				var match = true;

				for(var field in filters){

					switch(filters[field].comparison){
						case "partial":
						//match partial string mathes
						if(String(data[field]).toLowerCase().indexOf(String(filters[field].value).toLowerCase()) == -1){
							match = false;
						}
						break;

						default:
						//match everything else explicitly
						if(data[field] != filters[field].value){
							match = false;
						}
						break;
					}
				}

				return match;
			}

			self.setFilter(colFilter);
		}

		//iterate through columns
		columns.forEach(function(column, i){

			if(!column.columns){
				self.columnList.push(column);
				column.index = self.columnList.length -1;

				column.sorter = typeof(column.sorter) == "undefined" ? "string" : column.sorter;
				column.sortable = typeof(column.sortable) == "undefined" ? options.sortable : column.sortable;
				column.sortable = typeof(column.field) == "undefined" ? false : column.sortable;
				column.visible = typeof(column.visible) == "undefined" ? true : column.visible;
				column.cssClass = typeof(column.cssClass) == "undefined" ? "" : column.cssClass;




				if(options.sortBy == column.field){
					var sortdir = " data-sortdir='" + options.sortDir + "' ";
					self.sortCurCol= column;
					self.sortCurDir = options.sortDir;
				}else{
					var sortdir = "";
				}

				var visibility = column.visible ? "inline-block" : "none";

				var minWidth = typeof column.minWidth === "undefined" ? options.colMinWidth : column.minWidth;

				var col = $('<div class="tabulator-col ' + column.cssClass + '" style="display:' + visibility + '; min-width:' + minWidth + ';" data-index="' + column.index + '" data-field="' + column.field + '" data-sortable=' + column.sortable + sortdir + ' role="columnheader" aria-sort="' + (options.sortBy == column.field ? (options.sortDir == "asc" ? "ascending" : "descending") : "none") + '"><div class="tabulator-col-content"><div class="tabulator-col-title"></div></div></div>');
				var colContent = $(".tabulator-col-content", col);
				var colTitle = $(".tabulator-col-title", col);

				var title = self.lang.columns[column.field] || (column.title ? column.title : "&nbsp");

				if(column.editableTitle){
					var titleElement = $("<input class='tabulator-title-editor'>");
					titleElement.val(title);

					titleElement.on("click", function(e){
						e.stopPropagation();
						$(this).focus();
					});

					titleElement.on("change", function(){
						var newTitle = $(this).val();
						column.title = newTitle;
						options.colTitleChanged(newTitle, column, options.columns);
					});

					title = titleElement;
				}

			//Manage Header Column Filters
			if(column.headerFilter){

				//select appropriate filter
				if(column.headerFilter === true){
					if(column.editor){
						var editor = column.editor;
					}else{
						var editor = self.editors[column.formatter] ? column.formatter: "input";
					}
				}else{
					var editor = column.headerFilter;
				}


				//build filter element from editor
				var editorFunc = typeof(editor) == "string" ? self.editors[editor] : editor;

				var filter = $("<div class='tabulator-header-filter'></div>");

				var cellEditor = editorFunc.call(self, filter, "");

				var typingTimer = false;

				filter.append(cellEditor);
				filter.children().attr("placeholder", self.options.headerFilterPlaceholder);

				//handle events
				cellEditor.on("click", function(e){
					e.stopPropagation();
					$(this).focus();
				});

				cellEditor.on("keyup", function(e){
					var element = $(this);

					if(typingTimer){
						clearTimeout(typingTimer);
					}

					typingTimer = setTimeout(function(){
						filter.trigger("editval", element.val())
					},300);
				});

				//special case for numeric inputs, ad additional binding incase increment buttons are used
				if(cellEditor.attr("type") == "number"){
					cellEditor.on("change", function(e){
						filter.trigger("editval", $(this).val())
					});
				}

				filter.on("editval editcancel", function(e, value){
					$(this).data("filter-val", value);
					updateFilter()
				});

				//add filter to column header
				colTitle.append(title);

				colContent.append(filter);

			}else{

				colTitle.html(title);
			}


			//added callback for custom header tooltips
			var tooltip = column.tooltipHeader ? column.tooltipHeader : (options.tooltipsHeader && column.tooltipHeader !== false ? true : false);

			if(tooltip === true){
				tooltip = title;
			}else if(typeof(tooltip) == "function"){
				tooltip = tooltip(column);
			}

			if(tooltip){
				col.attr("title", tooltip);
			}else{
				col.attr("title", "");
			}


			if(typeof(column.width) != "undefined"){
				column.width = isNaN(column.width) ? column.width : column.width + "px"; //format number

				col.data("width", column.width);

				col.css({width:column.width});
			}

			//sort tabl click binding
			if(column.sortable){
				col.on("click", function(){
					if(!self.mouseDragOut){ //prevent accidental trigger my mouseup on column drag
						self._sortClick(column, col); //trigger sort
					}
					self.mouseDragOut = false;
				})
			}

		}else{
			var col = $('<div class="tabulator-col tabulator-col-group" role="columngroup" aria-label="' + column.title + '"><div class="tabulator-col-content"><div class="tabulator-col-title">' + column.title + '</div></div><div class="tabulator-col-group-cols"></div></div>');
			self._colLayoutGroup(column.columns, $(".tabulator-col-group-cols", col));
		}
		col.data("column", column);
		container.append(col);
	});

},

	//layout columns on first render
	_colRender:function(fixedwidth, forceRedraw){
		var self = this;
		var options = self.options;
		var table = self.table;
		var header = self.header;
		var element = self.element;

		if(fixedwidth || !options.fitColumns){ //if columns have been resized and now data needs to match them
			if(options.responsiveLayout){
				self._renderResponsiveColumns();
			}

			//free sized table
			$.each(self.columnList, function(i, column){
				var colWidth = $(".tabulator-col[data-index='" + column.index + "']", element).outerWidth();
				var col = $(".tabulator-cell[data-index='" + column.index + "']", element);
				col.css({width:colWidth});
			});
		}else{

			if(options.fitColumns){
				//resize columns to fit in window

				//remove right edge border on table if fitting to width to prevent double border
				$(".tabulator-row .tabulator-cell:last-child, .tabulator-col:last", element).css("border-right","none");

				if(self.options.fitColumns){
					$(".tabulator-row", self.table).css({
						"width":"100%",
					});
				}

				var totWidth = options.movableRows ? self.element.innerWidth() - 30 : self.element.innerWidth();
				var colCount = 0;

				var widthIdeal = 0;
				var widthIdealCount = 0;
				var lastVariableCol = "";

				$.each(self.columnList, function(i, column){
					if(column.visible){

						colCount++;

						if(column.width || column.minWidth){

							var thisWidth = 0;

							var colWidth = 0;
							var minWidth =  parseInt(typeof column.minWidth === "undefined" ? options.colMinWidth : column.minWidth);

							if(typeof(column.width) == "string"){
								if(column.width.indexOf("%") > -1){
									colWidth = (totWidth / 100) * parseInt(column.width) ;
								}else{
									colWidth = parseInt(column.width);
								}

							}else{
								colWidth = column.width;
							}

							thisWidth = colWidth > minWidth ? colWidth : minWidth;

							widthIdeal += thisWidth;
							widthIdealCount++;
						}else{

							// widthIdeal +=options.colMinWidth;

							lastVariableCol = column.field;
						}
					}
				});

				var colWidth = totWidth / colCount;

				var proposedWidth = Math.floor((totWidth - widthIdeal) / (colCount - widthIdealCount));

				//prevent underflow on non integer width tables
				var gapFill = totWidth - widthIdeal - (proposedWidth * (colCount - widthIdealCount));
				gapFill = gapFill > 0 ? gapFill : 0;

				$.each(self.columnList, function(i, column){
					if(column.visible){

						var minWidth = parseInt(typeof column.minWidth === "undefined" ? options.colMinWidth : column.minWidth);

						var newWidth = proposedWidth;

						if(column.width){
							if(typeof(column.width) == "string"){
								if(column.width.indexOf("%") > -1){
									newWidth = (totWidth / 100) * parseInt(column.width) ;
								}else{
									newWidth = parseInt(column.width);
								}

							}else{
								newWidth = column.width;
							}
						}

						if(newWidth >= minWidth){

							var col = $(".tabulator-cell[data-index=" + column.index + "], .tabulator-col[data-index=" + column.index + "]", element);

							if(column.field == lastVariableCol){
								col.css({width:newWidth + gapFill});
							}else{
								if(newWidth < minWidth){
									col.css({"min-width":newWidth});
								}
								col.css({width:newWidth});

							}

						}else{
							var col = $(".tabulator-cell[data-index=" + column.index + "], .tabulator-col[data-index=" + column.index + "]", element);
							col.css({width:minWidth});
						}
					}
				});

				if(options.responsiveLayout){
					self._renderResponsiveColumns();
				}

			}else{

				//free sized table
				$.each(self.columnList, function(i, column){

					var col = $(".tabulator-cell[data-index=" + i + "], .tabulator-col[data-index=" + i+ "]", element);

					if(column.width){
						//reseize to match specified column width
						max = column.width;
					}else{
						//resize columns to widest element

						var max = 0;

						col.each(function(){
							max = $(this).outerWidth() > max ? $(this).outerWidth() : max;
						});

						if(options.colMinWidth || typeof column.minWidth !== "undefined"){

							var minWidth = parseInt(typeof column.minWidth === "undefined" ? options.colMinWidth : column.minWidth);

							max = max < minWidth ? minWidth : max;
						}

					}
					col.css({width:max});
				});

				if(options.responsiveLayout){
					self._renderResponsiveColumns();
				}

			}//
		}

		//vertically align headers
		self._vertAlignColHeaders();

		//handle frozen columns
		self._renderFrozenColumns();

		if(forceRedraw){
			self._renderTable();
		}
	},


	////////////////// Responsive Columns //////////////////

	//build the responsive columns list
	_buildResponsiveColumnsList:function(){
		var self = this;

		self.responsiveColumnList = [];
		self.responsiveColumnIndex = 0;

		self.columnList.forEach(function(col){
			if(typeof col.responsive === "undefined"){
				col.responsive = 1;
			}

			if(col.responsive){
				self.responsiveColumnList.push(col);
			}
		});


		self.responsiveColumnList = self.responsiveColumnList.reverse();
		self.responsiveColumnList = self.responsiveColumnList.sort(function(a,b){
			return b.responsive - a.responsive;
		});

	},

	//show and hide responsive columns
	_renderResponsiveColumns:function(){
		var self = this;

		var working = true;

		while(working){
			if(self.tableHolder.innerWidth() < self.tableHolder[0].scrollWidth){
				var col = self.responsiveColumnList[self.responsiveColumnIndex];
				if(col){
					var index = col.index;
					$(".tabulator-col[data-index=" + index + "], .tabulator-cell[data-index=" + index + "]", self.element).hide();

					self.responsiveColumnIndex++;
				}else{
					working = false;
				}
			}else{
				working = false;

				var col = self.responsiveColumnList[self.responsiveColumnIndex - 1];

				if(col){

					var diff = self.tableHolder.innerWidth() - self.table.outerWidth();

					if(diff > 0){

						var index = col.index;

						var first = parseInt($(".tabulator-cell[data-index=" + index + "]:first", self.element).css("width"));

						if(diff >= first){
							$(".tabulator-col[data-index=" + index + "], .tabulator-cell[data-index=" + index + "]", self.element).show();

							self.responsiveColumnIndex--;
						}else{
							working = false;
						}
					}

				}else{
					working = false;
				}
			}
		}
	},

	////////////////// Frozen Columns //////////////////


	_renderFrozenColumns:function(){
		var self = this;
		var rows;

		if(self.columnFrozenLeft.length || self.columnFrozenRight.length){

			rows = $(".tabulator-row", self.tableHolder);

			if(self.columnFrozenLeft.length){

				rows.each(function(){
					var row = $(this)
					var frozLeft;

					if(!$(".tabulator-frozen-left", row).length){
						frozLeft = $("<div class='tabulator-frozen tabulator-frozen-left'></div>");

						//handle movable rows
						frozLeft.append($(".tabulator-row-handle", row));

						row.prepend(frozLeft);
					}
				});

				self.columnFrozenLeft.forEach(function(column){
					rows.each(function(){
						var row = $(this);
						$(".tabulator-frozen-left",row).append($(".tabulator-cell[data-index=" + column.index + "]",row));
					});
				});

			}

			if(self.columnFrozenRight.length){

				rows.each(function(){
					var row = $(this)
					if(!$(".tabulator-frozen-right", row).length){
						row.append("<div class='tabulator-frozen tabulator-frozen-right'></div>");
					}
				});

				self.columnFrozenRight.forEach(function(column){
					rows.each(function(){
						var row = $(this);
						$(".tabulator-frozen-right",row).prepend($(".tabulator-cell[data-index=" + column.index + "]",row));
					});
				});

			}

			self._calcFrozenColumnsPos();
		}
	},

	_calcFrozenColumnsPos:function(hozAdjust){
		var self = this;
		var rows, left, width;

		if(self.columnFrozenLeft.length || self.columnFrozenRight.length){

			rows = $(".tabulator-row, .tabulator-header", self.element);
			left = self.tableHolder.scrollLeft()

			if(self.columnFrozenLeft.length){
				width = $(".tabulator-frozen-left", self.header).outerWidth();
				rows.css("padding-left", width);
				$(".tabulator-frozen-left", self.element).css("left", left);
			}

			if(self.columnFrozenRight.length){
				width = $(".tabulator-frozen-right", self.header).innerWidth();
				rows.css("padding-right", width)

				$(".tabulator-frozen-right", self.element).css("left",self.tableHolder.innerWidth() - width + left - (hozAdjust || 0));

			}
		}
	},



	////////////////// Row Styling //////////////////

	//style rows of the table
	_styleRows:function(minimal){
		var self = this;

		if(!minimal){
			//hover over rows
			if(self.options.selectable !== false){
				$(".tabulator-row", self.table).each(function(){
					var row = $(this);

					if(self.options.selectableCheck(row.data("data"), row)){
						row.addClass("tabulator-selectable");
					}else{
						row.addClass("tabulator-unselectable");
					}

				});
			}else{
				$(".tabulator-row", self.tableHolder).removeClass("tabulator-selectable");
			}

			//apply row formatter
			if(self.options.rowFormatter){
				$(".tabulator-row", self.table).each(function(){
					//allow row contents to be replaced with custom DOM elements
					var newRow = self.options.rowFormatter($(this), $(this).data("data"));

					if(newRow){
						$(this).html(newRow);
					}
				});
			}
		}

		//resize cells vertically to fit row contents
		if(self.element.is(":visible")){
			$(".tabulator-row", self.table).each(function(){
				$(".tabulator-cell, .tabulator-row-handle", $(this)).css({"height":$(this).innerHeight() + "px"});
			});
		}

		//trigger callbacks
		self.options.renderComplete();
	},

	//resize row to match contents
	_resizeRow:function(row){
		$(".tabulator-cell, .tabulator-row-handle", row).css({"height":""});
		$(".tabulator-cell, .tabulator-row-handle", row).css({"height":row.innerHeight() + "px"});
	},

	//format cell contents
	_formatCell:function(formatter, value, data, cell, row, formatterParams){
		var self = this;

		var formatter = typeof(formatter) == "undefined" ? "plaintext" : formatter;
		formatter = typeof(formatter) == "string" ? this.formatters[formatter] : formatter;

		return formatter.call(self, value, data, cell, row, this.options, formatterParams);
	},


	//////////////////// Row Selection Handlers ////////////////////

	//toggle row selection
	_rowSelect:function(row){
		var self = this;

		if(self.options.selectableCheck(row.data("data"), row)){
			if(row.hasClass("tabulator-selected")){
				self.deselectRow(row);
			}else{
				self.selectRow(row);
			}
		}

	},


	//clear all selected data
	_clearSelection:function(){
		var self = this;

		self.selectedRows = [];
		self.selecting = false;
		self.selectPrev = [];

	},

	//select row
	selectRow:function(row, silent){
		var self = this;
		var rowElement = $();
		var rowData = {};

		//handle select all situation
		if(typeof row === "undefined"){
			$(".tabulator-row:not(.tabulator-selected)", self.tableHolder).each(function(){
				self.selectRow($(this), true);
			})

			self._rowSelectionChanged();

			return true;
		}


		if(!isNaN(self.options.selectable) && self.options.selectable !== true){
			if(self.selectedRows.length >= self.options.selectable){

				if(self.options.selectableRollingSelection){
					self.deselectRow(self.selectedRows[0], true);
				}else{
					return false;
				}
			}
		}

		//handle different types of row input
		if(typeof row == "object"){

			if(row instanceof jQuery){

				//handle juery objects
				rowElement = row;
				rowData = rowElement.data("data");

			}else{

				//handle row data objects
				if(row[self.options.index]){
					rowElement = $(".tabulator-row[data-id=" + row[self.options.index] + "]", self.element)
				}else{
					var rowElements =  $(".tabulator-row[data-id=0]", self.element);

					rowElements.each(function(){
						var data = $(this).data("data");

						if(data === row){
							rowElement = $(this);
						}
					})
				}

				rowData = self._findRow(row);
			}

		}else{
			//handle index
			rowElement = $(".tabulator-row[data-id=" + row + "]", self.element)
			rowData = self._findRow(row);
		}

		self.selectedRows.push(rowData);

		if(rowElement.length){
			rowElement.addClass("tabulator-selected");

			if(!silent){
				self._rowSelectionChanged();
			}
		}else{
			return false;
		}

	},

	//deselect row
	deselectRow:function(row, silent){
		var self = this;
		var rowElement = $();
		var rowData = {};

		//handle deselect all situation
		if(typeof row === "undefined"){
			$(".tabulator-row.tabulator-selected", self.tableHolder).each(function(){
				self.deselectRow($(this), true);
			})

			self._rowSelectionChanged();

			return true;
		}


		//handle different types of row input
		if(typeof row == "object"){

			if(row instanceof jQuery){

				//handle juery objects
				rowElement = row;
				rowData = rowElement.data("data");

			}else{

				//handle row data objects
				if(row[self.options.index]){
					rowElement = $(".tabulator-row[data-id=" + row[self.options.index] + "]", self.element)
				}else{
					var rowElements =  $(".tabulator-row[data-id=0]", self.element);

					rowElements.each(function(){
						var data = $(this).data("data");

						if(data === row){
							rowElement = $(this);
						}
					})
				}

				rowData = self._findRow(row);
			}

		}else{
			//handle index
			rowElement = $(".tabulator-row[data-id=" + row + "]", self.element)
			rowData = self._findRow(row);
		}

		self.selectedRows.forEach(function(element, i){
			if(element === rowData){
				self.selectedRows.splice(i, 1);
			}
		});


		rowElement.removeClass("tabulator-selected");

		if(!silent){
			self._rowSelectionChanged();
		}

	},

	//return currently selected data
	getSelectedData:function(){
		var self = this;

		return self.selectedRows;
	},

	//handle change in row selection count
	_rowSelectionChanged:function(){
		var self = this;

		var rows = [];

		self.selectedRows.forEach(function(row){

			var rowElement = false;

			//handle row data objects
			if(row[self.options.index]){
				rowElement = $(".tabulator-row[data-id=" + row[self.options.index] + "]", self.element)
			}else{
				var rowElements =  $(".tabulator-row[data-id=0]", self.element);

				rowElements.each(function(){
					var data = $(this).data("data");

					if(data === row){
						rowElement = $(this);
					}
				})
			}

			rows.push(rowElement);
		});

		self.options.rowSelectionChanged(self.selectedRows, rows);
	},

	////////////////// Table Interaction Handlers //////////////////

	//carry out action on row click
	_rowClick: function(e, row, data){
		this.options.rowClick(e, row.data("id"), data, row);
	},

	//carry out action on row double click
	_rowDblClick: function(e, row, data){
		this.options.rowDblClick(e, row.data("id"), data, row);
	},

	//carry out action on row context
	_rowContext: function(e, row, data){
		this.options.rowContext(e, row.data("id"), data, row);
	},

	//carry out action on cell click
	_cellClick: function(e, cell){
		var self = this;
		var index = cell.data("index");

		var match = self._findColumn(function(column){
			return column.index == index;
		});

		if(match){
			match.column.onClick(e, cell, cell.data("value"), cell.closest(".tabulator-row").data("data"));
		}
	},

	//carry out action on cell double click
	_cellDblClick: function(e, cell){
		var self = this;
		var index = cell.data("index");

		var match = self._findColumn(function(column){
			return column.index == index;
		});

		if(match){
			match.column.onDblClick(e, cell, cell.data("value"), cell.closest(".tabulator-row").data("data"));
		}
	},

	//carry out action on cell context click
	_cellContext: function(e, cell){
		var self = this;
		var index = cell.data("index");

		var match = self._findColumn(function(column){
			return column.index == index;
		});

		if(match){
			match.column.onContext(e, cell, cell.data("value"), cell.closest(".tabulator-row").data("data"));
		}
	},

	//handle cell data change
	_cellDataChange: function(cell, value){
		var self = this;
		var row = cell.closest(".tabulator-row");

		cell.removeClass("tabulator-editing");

		//update row data
		var rowData = row.data("data");
		var hasChanged = rowData[cell.data("field")] != value;
		var oldVal = rowData[cell.data("field")];

		if(hasChanged){
			//handle cell mutation if needed
			var mutator = cell.data("mutator");

			if(mutator){
				value = mutator(value, "edit", rowData);
			}

			//update cell data value
			cell.data("value", value);

			rowData[cell.data("field")] = value;
			row.data("data", rowData);
		}

		//reformat cell data
		cell.html(self._formatCell(cell.data("formatter"), value, rowData, cell, row, cell.data("formatterParams")));

		if(hasChanged){
			//triger event
			self.options.cellEdited(rowData[self.options.index], cell.data("field"), value, oldVal, rowData, cell, row);
			self._generateTooltip(cell, rowData, self._findColumn(cell.data("field")).column.tooltip);
		}

		self._styleRows();

		self.options.dataEdited(self.data);
	},

	////////////////// Formatter/Sorter Helpers //////////////////

	//return escaped string for attribute
	_safeString: function(value){
		return String(value).replace(/'/g, "&#39;");
	},

	//format date for date comparison
	_formatDate:function(dateString){
		var format = this.options.dateFormat;

		var ypos = format.indexOf("yyyy");
		var mpos = format.indexOf("mm");
		var dpos = format.indexOf("dd");

		if(dateString){
			var formattedString = dateString.substring(ypos, ypos+4) + "-" + dateString.substring(mpos, mpos+2) + "-" + dateString.substring(dpos, dpos+2);

			var newDate = Date.parse(formattedString);
		}else{
			var newDate = 0;
		}

		return isNaN(newDate) ? 0 : newDate;
	},

	////////////////// Default Sorter/Formatter/Editor Elements //////////////////

	//custom data sorters
	sorters:{
		number:function(a, b){ //sort numbers
			return parseFloat(String(a).replace(",","")) - parseFloat(String(b).replace(",",""));
		},
		string:function(a, b){ //sort strings
			return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
		},
		date:function(a, b){ //sort dates
			var self = this;

			return self._formatDate(a) - self._formatDate(b);
		},
		boolean:function(a, b){ //sort booleans
			var el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;
			var el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;

			return el1 - el2;
		},
		alphanum:function(as, bs){//sort alpha numeric strings
			var a, b, a1, b1, i= 0, L, rx = /(\d+)|(\D+)/g, rd = /\d/;

			if(isFinite(as) && isFinite(bs)) return as - bs;
			a = String(as).toLowerCase();
			b = String(bs).toLowerCase();
			if(a === b) return 0;
			if(!(rd.test(a) && rd.test(b))) return a > b ? 1 : -1;
			a = a.match(rx);
			b = b.match(rx);
			L = a.length > b.length ? b.length : a.length;
			while(i < L){
				a1= a[i];
				b1= b[i++];
				if(a1 !== b1){
					if(isFinite(a1) && isFinite(b1)){
						if(a1.charAt(0) === "0") a1 = "." + a1;
						if(b1.charAt(0) === "0") b1 = "." + b1;
						return a1 - b1;
					}
					else return a1 > b1 ? 1 : -1;
				}
			}
			return a.length > b.length;
		},
		time:function(a, b){ //sort hh:mm formatted times
			a = a.split(":");
			b = b.split(":");

			a = (a[0]*60) + a[1];
			b = (b[0]*60) + b[1];
			return a > b;
		},
	},

	//custom data formatters
	formatters:{
		plaintext:function(value, data, cell, row, options, formatterParams){ //plain text value
			return value;
		},
		textarea:function(value, data, cell, row, options, formatterParams){ //multiline text area
			cell.css({"white-space":"pre-wrap"});
			return value;
		},
		money:function(value, data, cell, row, options, formatterParams){

			var floatVal = parseFloat(value);

			if(isNaN(floatVal)){
				return value;
			}

			var number = floatVal.toFixed(2);

			var number = number.split(".");

			var integer = number[0];
			var decimal = number.length > 1 ? "." + number[1] : "";

			var rgx = /(\d+)(\d{3})/;

			while (rgx.test(integer)){
				integer = integer.replace(rgx, "$1" + "," + "$2");
			}

			return integer + decimal;
		},
		email:function(value, data, cell, row, options, formatterParams){
			return "<a href='mailto:" + value + "'>" + value + "</a>";
		},
		link:function(value, data, cell, row, options, formatterParams){
			return "<a href='" + value + "'>" + value + "</a>";
		},
		tick:function(value, data, cell, row, options, formatterParams){
			var tick = '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';

			if(value === true || value === "true" || value === "True" || value === 1){
				cell.attr("aria-checked", true);
				return tick;
			}else{
				cell.attr("aria-checked", false);
				return "";
			}
		},
		tickCross:function(value, data, cell, row, options, formatterParams){
			var tick = '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
			var cross = '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

			if(value === true || value === "true" || value === "True" || value === 1){
				cell.attr("aria-checked", true);
				return tick;
			}else{
				cell.attr("aria-checked", false);
				return cross;
			}
		},
		star:function(value, data, cell, row, options, formatterParams){
			var maxStars = formatterParams && formatterParams.stars ? formatterParams.stars : 5;
			var stars=$("<span style='vertical-align:middle;'></span>");

			value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

			var starActive = $('<svg width="14" height="14" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');
			var starInactive = $('<svg width="14" height="14" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');

			for(var i=1;i<= maxStars;i++){

				var nextStar = i <= value ? starActive : starInactive;

				stars.append(nextStar.clone());
			}

			cell.css({
				"white-space": "nowrap",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
			});

			cell.attr("aria-label", value);

			return stars.html();
		},
		progress:function(value, data, cell, row, options, formatterParams){ //progress bar
			//set default parameters
			var max = formatterParams && formatterParams.max ? formatterParams.max : 100;
			var min = formatterParams && formatterParams.min ? formatterParams.min : 0;

			var color = formatterParams && formatterParams.color ? formatterParams.color : "#2DC214";

			//make sure value is in range
			value = parseFloat(value) <= max ? parseFloat(value) : max;
			value = parseFloat(value) >= min ? parseFloat(value) : min;

			//workout percentage
			var percent = (max - min) / 100;
			value = 100 - Math.round((value - min) / percent);

			cell.css({
				"min-width":"30px",
				"position":"relative",
			});

			cell.attr("aria-label", value);

			return "<div style='position:absolute; top:8px; bottom:8px; left:4px; right:" + value + "%; margin-right:4px; background-color:" + color + "; display:inline-block;' data-max='" + max + "' data-min='" + min + "'></div>";
		},
		color:function(value, data, cell, row, options, formatterParams){
			cell.css({"background-color":value});
			return "";
		},
		buttonTick:function(value, data, cell, row, options, formatterParams){
			return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
		},
		buttonCross:function(value, data, cell, row, options, formatterParams){
			return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
		},
		rownum:function(value, data, cell, row, options, formatterParams){
			var self = this;

			var rownum = $(".tabulator-row", self.table).length + 1;

			if(self.options.pagination){
				rownum = (self.options.paginationSize * (self.paginationCurrentPage-1)) + rownum;
			}

			return rownum;
		}
	},

	//custom data editors
	editors:{
		input:function(cell, value, data){
			//create and style input
			var input = $("<input type='text'/>");
			input.css({
				"padding":"4px",
				"width":"100%",
				"box-sizing":"border-box",
			})
			.val(value);

			if(cell.hasClass("tabulator-cell")){
				setTimeout(function(){
					input.focus();
				},100);
			}

			//submit new value on blur
			input.on("change blur", function(e){
				cell.trigger("editval", input.val());
			});

			//submit new value on enter
			input.on("keydown", function(e){
				if(e.keyCode == 13){
					cell.trigger("editval", input.val());
				}
			});

			return input;
		},
		textarea:function(cell, value, data){
			var self = this;

			var count = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1;
			var row = cell.closest(".tabulator-row")

            //create and style input
            var input = $("<textarea></textarea>");
            input.css({
            	"display":"block",
            	"height":"100%",
            	"width":"100%",
            	"padding":"2px",
            	"box-sizing":"border-box",
            	"white-space":"pre-wrap",
            	"resize": "none",
            })
            .val(value);

            if(cell.hasClass("tabulator-cell")){
            	setTimeout(function(){
            		input.focus();
            	},100);
            }

            //submit new value on blur
            input.on("change blur", function(e){
            	cell.trigger("editval", input.val());
            	setTimeout(function(){
            		self._resizeRow(row);
            	},300)
            });

            input.on("keyup", function(){
            	var value = $(this).val();
            	var newCount = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1;

            	if(newCount != count){
            		var line = input.innerHeight() / count;

            		input.css({"height": (line * newCount) + "px"});

            		self._resizeRow(row);

            		count = newCount;
            	}
            });

            return input;
        },
        number:function(cell, value, data){
			//create and style input
			var input = $("<input type='number'/>");
			input.css({
				"padding":"4px",
				"width":"100%",
				"box-sizing":"border-box",
			})
			.val(value);

			if(cell.hasClass("tabulator-cell")){
				setTimeout(function(){
					input.focus();
				},100);
			}

			//submit new value on blur
			input.on("blur", function(e){
				cell.trigger("editval", input.val());
			});

			//submit new value on enter
			input.on("keydown", function(e){
				if(e.keyCode == 13){
					cell.trigger("editval", input.val());
				}
			});

			return input;
		},
		star:function(cell, value, data){

			var maxStars = $("svg", cell).length;
			maxStars = maxStars ?maxStars : 5;

			var size = $("svg:first", cell).attr("width")
			size = size ? size : 14;

			var stars=$("<div style='vertical-align:middle; padding:4px; display:inline-block; vertical-align:middle;'></div>");

			value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

			var starActive = $('<svg width="' + size + '" height="' + size + '" class="tabulator-star-active" viewBox="0 0 512 512" xml:space="preserve" style="padding:0 1px;"><polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');
			var starInactive = $('<svg width="' + size + '" height="' + size + '" class="tabulator-star-inactive" viewBox="0 0 512 512" xml:space="preserve" style="padding:0 1px;"><polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');

			for(var i=1;i<= maxStars;i++){

				var nextStar = i <= value ? starActive : starInactive;
				stars.append(nextStar.clone());
			}

			//change number of active stars
			var starChange = function(element){
				if($(".tabulator-star-active", element.closest("div")).length != element.prevAll("svg").length + 1){
					element.prevAll("svg").replaceWith(starActive.clone());
					element.nextAll("svg").replaceWith(starInactive.clone());
					element.replaceWith(starActive.clone());
				}
			}

			stars.on("mouseover", "svg", function(e){
				e.stopPropagation();
				starChange($(this));
			});

			stars.on("mouseover", function(e){
				$("svg", $(this)).replaceWith(starInactive.clone());
			});

			stars.on("click", function(e){
				$(this).closest(".tabulator-cell").trigger("editval", 0);
			});

			stars.on("click", "svg", function(e){
				var val = $(this).prevAll("svg").length + 1;
				cell.trigger("editval", val);
			});

			cell.css({
				"white-space": "nowrap",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
			});

			cell.on("blur", function(){
				$(this).trigger("editcancel");
			});

			//allow key based navigation
			cell.on("keydown", function(e){
				switch(e.keyCode){
					case 39: //right arrow
					starChange($(".tabulator-star-inactive:first", stars));
					break;

					case 37: //left arrow
					var prevstar = $(".tabulator-star-active:last", stars).prev("svg");

					if(prevstar.length){
						starChange(prevstar);
					}else{
						$("svg", stars).replaceWith(starInactive.clone());
					}
					break;

					case 13: //enter
					cell.trigger("editval", $(".tabulator-star-active", stars).length);
					break;

				}
			});

			return stars;
		},
		progress:function(cell, value, data){
			//set default parameters
			var max = $("div", cell).data("max");
			var min = $("div", cell).data("min");

			//make sure value is in range
			value = parseFloat(value) <= max ? parseFloat(value) : max;
			value = parseFloat(value) >= min ? parseFloat(value) : min;

			//workout percentage
			var percent = (max - min) / 100;
			value = 100 - Math.round((value - min) / percent);

			cell.css({
				padding:"0 4px",
			});

			cell.attr("aria-valuemin", min).attr("aria-valuemax", max)


			var newVal = function(){
				var newval = (percent * Math.round(bar.outerWidth() / (cell.width()/100))) + min;
				cell.trigger("editval", newval);
				cell.attr("aria-valuenow", newval).attr("aria-label", value);
			}

			var bar = $("<div style='position:absolute; top:8px; bottom:8px; left:4px; right:" + value + "%; margin-right:4px; background-color:#488CE9; display:inline-block; max-width:100%; min-width:0%;' data-max='" + max + "' data-min='" + min + "'></div>");

			var handle = $("<div class='tabulator-progress-handle' style='position:absolute; right:0; top:0; bottom:0; width:5px;'></div>");

			bar.append(handle);

			handle.on("mousedown", function(e){
				bar.data("mouseDrag", e.screenX);
				bar.data("mouseDragWidth", bar.outerWidth());
			});

			handle.on("mouseover", function(){$(this).css({cursor:"ew-resize"})});

			cell.on("mousemove", function(e){
				if(bar.data("mouseDrag")){
					bar.css({width: bar.data("mouseDragWidth") + (e.screenX - bar.data("mouseDrag"))})
				}
			});

			cell.on("mouseup", function(e){
				if(bar.data("mouseDrag")){
					e.stopPropagation();
					e.stopImmediatePropagation();

					bar.data("mouseDragOut", true);
					bar.data("mouseDrag", false);
					bar.data("mouseDragWidth", false);

					newVal();

				}
			});

			//allow key based navigation
			cell.on("keydown", function(e){
				switch(e.keyCode){
					case 39: //right arrow
					bar.css({"width" : bar.width() + cell.width()/100});
					break;

					case 37: //left arrow
					bar.css({"width" : bar.width() - cell.width()/100});
					break;

					case 13: //enter
					newVal();
					break;

				}
			});

			cell.on("blur", function(){
				$(this).trigger("editcancel");
			});

			return bar;
		},

		tickCross:function(cell, value, data){
			//create and style input
			var input = $("<input type='checkbox'/>");
			input.css({
				"margin-top":"5px",
				"box-sizing":"border-box",
			})
			.val(value);

			if(cell.hasClass("tabulator-cell")){
				setTimeout(function(){
					input.focus();
				},100);
			}

			if(value === true || value === "true" || value === "True" || value === 1){
				input.prop("checked", true);
			}else{
				input.prop("checked", false);
			}

			//submit new value on blur
			input.on("change blur", function(e){
				cell.trigger("editval", input.is(":checked"));
			});

			//submit new value on enter
			input.on("keydown", function(e){
				if(e.keyCode == 13){
					cell.trigger("editval", input.is(":checked"));
				}
			});

			return input;
		},

		tick:function(cell, value, data){
			//create and style input
			var input = $("<input type='checkbox'/>");
			input.css({
				"margin-top":"5px",
				"box-sizing":"border-box",
			})
			.val(value);

			if(cell.hasClass("tabulator-cell")){
				setTimeout(function(){
					input.focus();
				},100);
			}

			if(value === true || value === "true" || value === "True" || value === 1){
				input.prop("checked", true);
			}else{
				input.prop("checked", false);
			}

			//submit new value on blur
			input.on("change blur", function(e){
				cell.trigger("editval", input.is(":checked"));
			});

			//submit new value on enter
			input.on("keydown", function(e){
				if(e.keyCode == 13){
					cell.trigger("editval", input.is(":checked"));
				}
			});

			return input;
		},
	},

	//custom mutators
	mutators:{},

	//custom accessors
	accessors:{},

	////////////////// Tabulator Desconstructor //////////////////

	//deconstructor
	_destroy: function(){
		var self = this;
		var element = self.element;

		element.empty();

		element.removeClass("tabulator");
	},

});

})();

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }


        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }

        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick',
                '*:not(.slick-arrow)', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            })
                .first().attr('aria-selected', 'true').end()
                .find('button').attr('role', 'button').end()
                .closest('div').attr('role', 'toolbar');
        }
        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            _.setPosition();

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .attr('aria-hidden', 'true');

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active')
                .attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));

function showBlock (id) {
    $('.form-group[data-block='+id+']').show();;
};
function hideBlock () {
    $('#add-product-form .form-group:nth-of-type(n+2)').hide();
};

function runToastmessage(text, type) {
    type = type || 'success';  // "notice", "success", "warning", "error"
    $().toastmessage('showToast', {
        text     : text,
        sticky   : false,
        inEffectDuration:  600,
        stayTime: 3000,
        position : 'top-right',
        type     : type,
    });
};


// $('#buyProduct').submit(function(eventObject){
//     $('.bayModal').modal('hide');
//     console.log(eventObject);
//     return false;
// });

$("#buyProduct").submit(function(e) {

    $('.bayModal').modal('hide');
    var url = "/neworder"; // the script where you handle the form input.
    $.ajax({
        type: "POST",
        url: url,
        data: $("#buyProduct").serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('.baySuccess').modal('show');
            console.log(data);
        },
        error: function(data)
        {
            $('.bayError').modal('show');
            console.log(data)
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.

});

$("#feedback").submit(function(e) {

    $('.feedbackModal').modal('hide');
    var url = "/newfeedback"; // the script where you handle the form input.
    $.ajax({
        type: "POST",
        url: url,
        data: $("#feedback").serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('.feedbackSuccess').modal('show');
            console.log(data);
        },
        error: function(data)
        {
            $('.feedbackError').modal('show');
            console.log(data)
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.

});

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        prices: [0,0,0]
    },
    actions: {},
    mutations: {
        savePrices(state, prices){
            state.prices = prices
        },
    },
    getters: {
        getPrices(state, getters){
            return state.prices;
        }
    },
    modules: {}
});


/*!
 * Lightbox v2.9.0
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */

// Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.lightbox = factory(root.jQuery);
    }
}(this, function ($) {

  function Lightbox(options) {
    this.album = [];
    this.currentImageIndex = void 0;
    this.init();

    // options
    this.options = $.extend({}, this.constructor.defaults);
    this.option(options);
  }

  // Descriptions of all options available on the demo site:
  // http://lokeshdhakar.com/projects/lightbox2/index.html#options
  Lightbox.defaults = {
    albumLabel: 'Image %1 of %2',
    alwaysShowNavOnTouchDevices: false,
    fadeDuration: 600,
    fitImagesInViewport: true,
    imageFadeDuration: 600,
    // maxWidth: 800,
    // maxHeight: 600,
    positionFromTop: 50,
    resizeDuration: 700,
    showImageNumberLabel: true,
    wrapAround: false,
    disableScrolling: false,
    /*
    Sanitize Title
    If the caption data is trusted, for example you are hardcoding it in, then leave this to false.
    This will free you to add html tags, such as links, in the caption.

    If the caption data is user submitted or from some other untrusted source, then set this to true
    to prevent xss and other injection attacks.
     */
    sanitizeTitle: false
  };

  Lightbox.prototype.option = function(options) {
    $.extend(this.options, options);
  };

  Lightbox.prototype.imageCountLabel = function(currentImageNum, totalImages) {
    return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
  };

  Lightbox.prototype.init = function() {
    var self = this;
    // Both enable and build methods require the body tag to be in the DOM.
    $(document).ready(function() {
      self.enable();
      self.build();
    });
  };

  // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
  // that contain 'lightbox'. When these are clicked, start lightbox.
  Lightbox.prototype.enable = function() {
    var self = this;
    $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
      self.start($(event.currentTarget));
      return false;
    });
  };

  // Build html for the lightbox and the overlay.
  // Attach event handlers to the new DOM elements. click click click
  Lightbox.prototype.build = function() {
    var self = this;
    $('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo($('body'));

    // Cache jQuery objects
    this.$lightbox       = $('#lightbox');
    this.$overlay        = $('#lightboxOverlay');
    this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
    this.$container      = this.$lightbox.find('.lb-container');
    this.$image          = this.$lightbox.find('.lb-image');
    this.$nav            = this.$lightbox.find('.lb-nav');

    // Store css values for future lookup
    this.containerPadding = {
      top: parseInt(this.$container.css('padding-top'), 10),
      right: parseInt(this.$container.css('padding-right'), 10),
      bottom: parseInt(this.$container.css('padding-bottom'), 10),
      left: parseInt(this.$container.css('padding-left'), 10)
    };

    this.imageBorderWidth = {
      top: parseInt(this.$image.css('border-top-width'), 10),
      right: parseInt(this.$image.css('border-right-width'), 10),
      bottom: parseInt(this.$image.css('border-bottom-width'), 10),
      left: parseInt(this.$image.css('border-left-width'), 10)
    };

    // Attach event handlers to the newly minted DOM elements
    this.$overlay.hide().on('click', function() {
      self.end();
      return false;
    });

    this.$lightbox.hide().on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
      return false;
    });

    this.$outerContainer.on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
      return false;
    });

    this.$lightbox.find('.lb-prev').on('click', function() {
      if (self.currentImageIndex === 0) {
        self.changeImage(self.album.length - 1);
      } else {
        self.changeImage(self.currentImageIndex - 1);
      }
      return false;
    });

    this.$lightbox.find('.lb-next').on('click', function() {
      if (self.currentImageIndex === self.album.length - 1) {
        self.changeImage(0);
      } else {
        self.changeImage(self.currentImageIndex + 1);
      }
      return false;
    });

    /*
      Show context menu for image on right-click

      There is a div containing the navigation that spans the entire image and lives above of it. If
      you right-click, you are right clicking this div and not the image. This prevents users from
      saving the image or using other context menu actions with the image.

      To fix this, when we detect the right mouse button is pressed down, but not yet clicked, we
      set pointer-events to none on the nav div. This is so that the upcoming right-click event on
      the next mouseup will bubble down to the image. Once the right-click/contextmenu event occurs
      we set the pointer events back to auto for the nav div so it can capture hover and left-click
      events as usual.
     */
    this.$nav.on('mousedown', function(event) {
      if (event.which === 3) {
        self.$nav.css('pointer-events', 'none');

        self.$lightbox.one('contextmenu', function() {
          setTimeout(function() {
              this.$nav.css('pointer-events', 'auto');
          }.bind(self), 0);
        });
      }
    });


    this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
      self.end();
      return false;
    });
  };

  // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
  Lightbox.prototype.start = function($link) {
    var self    = this;
    var $window = $(window);

    $window.on('resize', $.proxy(this.sizeOverlay, this));

    $('select, object, embed').css({
      visibility: 'hidden'
    });

    this.sizeOverlay();

    this.album = [];
    var imageNumber = 0;

    function addToAlbum($link) {
      self.album.push({
        link: $link.attr('href'),
        title: $link.attr('data-title') || $link.attr('title')
      });
    }

    // Support both data-lightbox attribute and rel attribute implementations
    var dataLightboxValue = $link.attr('data-lightbox');
    var $links;

    if (dataLightboxValue) {
      $links = $($link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]');
      for (var i = 0; i < $links.length; i = ++i) {
        addToAlbum($($links[i]));
        if ($links[i] === $link[0]) {
          imageNumber = i;
        }
      }
    } else {
      if ($link.attr('rel') === 'lightbox') {
        // If image is not part of a set
        addToAlbum($link);
      } else {
        // If image is part of a set
        $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
        for (var j = 0; j < $links.length; j = ++j) {
          addToAlbum($($links[j]));
          if ($links[j] === $link[0]) {
            imageNumber = j;
          }
        }
      }
    }

    // Position Lightbox
    var top  = $window.scrollTop() + this.options.positionFromTop;
    var left = $window.scrollLeft();
    this.$lightbox.css({
      top: top + 'px',
      left: left + 'px'
    }).fadeIn(this.options.fadeDuration);

    // Disable scrolling of the page while open
    if (this.options.disableScrolling) {
      $('body').addClass('lb-disable-scrolling');
    }

    this.changeImage(imageNumber);
  };

  // Hide most UI elements in preparation for the animated resizing of the lightbox.
  Lightbox.prototype.changeImage = function(imageNumber) {
    var self = this;

    this.disableKeyboardNav();
    var $image = this.$lightbox.find('.lb-image');

    this.$overlay.fadeIn(this.options.fadeDuration);

    $('.lb-loader').fadeIn('slow');
    this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();

    this.$outerContainer.addClass('animating');

    // When image to show is preloaded, we send the width and height to sizeContainer()
    var preloader = new Image();
    preloader.onload = function() {
      var $preloader;
      var imageHeight;
      var imageWidth;
      var maxImageHeight;
      var maxImageWidth;
      var windowHeight;
      var windowWidth;

      $image.attr('src', self.album[imageNumber].link);

      $preloader = $(preloader);

      $image.width(preloader.width);
      $image.height(preloader.height);

      if (self.options.fitImagesInViewport) {
        // Fit image inside the viewport.
        // Take into account the border around the image and an additional 10px gutter on each side.

        windowWidth    = $(window).width();
        windowHeight   = $(window).height();
        maxImageWidth  = windowWidth - self.containerPadding.left - self.containerPadding.right - self.imageBorderWidth.left - self.imageBorderWidth.right - 20;
        maxImageHeight = windowHeight - self.containerPadding.top - self.containerPadding.bottom - self.imageBorderWidth.top - self.imageBorderWidth.bottom - 120;

        // Check if image size is larger then maxWidth|maxHeight in settings
        if (self.options.maxWidth && self.options.maxWidth < maxImageWidth) {
          maxImageWidth = self.options.maxWidth;
        }
        if (self.options.maxHeight && self.options.maxHeight < maxImageWidth) {
          maxImageHeight = self.options.maxHeight;
        }

        // Is there a fitting issue?
        if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
          if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
            imageWidth  = maxImageWidth;
            imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
            $image.width(imageWidth);
            $image.height(imageHeight);
          } else {
            imageHeight = maxImageHeight;
            imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
            $image.width(imageWidth);
            $image.height(imageHeight);
          }
        }
      }
      self.sizeContainer($image.width(), $image.height());
    };

    preloader.src          = this.album[imageNumber].link;
    this.currentImageIndex = imageNumber;
  };

  // Stretch overlay to fit the viewport
  Lightbox.prototype.sizeOverlay = function() {
    this.$overlay
      .width($(document).width())
      .height($(document).height());
  };

  // Animate the size of the lightbox to fit the image we are showing
  Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
    var self = this;

    var oldWidth  = this.$outerContainer.outerWidth();
    var oldHeight = this.$outerContainer.outerHeight();
    var newWidth  = imageWidth + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right;
    var newHeight = imageHeight + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;

    function postResize() {
      self.$lightbox.find('.lb-dataContainer').width(newWidth);
      self.$lightbox.find('.lb-prevLink').height(newHeight);
      self.$lightbox.find('.lb-nextLink').height(newHeight);
      self.showImage();
    }

    if (oldWidth !== newWidth || oldHeight !== newHeight) {
      this.$outerContainer.animate({
        width: newWidth,
        height: newHeight
      }, this.options.resizeDuration, 'swing', function() {
        postResize();
      });
    } else {
      postResize();
    }
  };

  // Display the image and its details and begin preload neighboring images.
  Lightbox.prototype.showImage = function() {
    this.$lightbox.find('.lb-loader').stop(true).hide();
    this.$lightbox.find('.lb-image').fadeIn(this.options.imageFadeDuration);

    this.updateNav();
    this.updateDetails();
    this.preloadNeighboringImages();
    this.enableKeyboardNav();
  };

  // Display previous and next navigation if appropriate.
  Lightbox.prototype.updateNav = function() {
    // Check to see if the browser supports touch events. If so, we take the conservative approach
    // and assume that mouse hover events are not supported and always show prev/next navigation
    // arrows in image sets.
    var alwaysShowNav = false;
    try {
      document.createEvent('TouchEvent');
      alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
    } catch (e) {}

    this.$lightbox.find('.lb-nav').show();

    if (this.album.length > 1) {
      if (this.options.wrapAround) {
        if (alwaysShowNav) {
          this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
        }
        this.$lightbox.find('.lb-prev, .lb-next').show();
      } else {
        if (this.currentImageIndex > 0) {
          this.$lightbox.find('.lb-prev').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-prev').css('opacity', '1');
          }
        }
        if (this.currentImageIndex < this.album.length - 1) {
          this.$lightbox.find('.lb-next').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-next').css('opacity', '1');
          }
        }
      }
    }
  };

  // Display caption, image number, and closing button.
  Lightbox.prototype.updateDetails = function() {
    var self = this;

    // Enable anchor clicks in the injected caption html.
    // Thanks Nate Wright for the fix. @https://github.com/NateWr
    if (typeof this.album[this.currentImageIndex].title !== 'undefined' &&
      this.album[this.currentImageIndex].title !== '') {
      var $caption = this.$lightbox.find('.lb-caption');
      if (this.options.sanitizeTitle) {
        $caption.text(this.album[this.currentImageIndex].title);
      } else {
        $caption.html(this.album[this.currentImageIndex].title);
      }
      $caption.fadeIn('fast')
        .find('a').on('click', function(event) {
          if ($(this).attr('target') !== undefined) {
            window.open($(this).attr('href'), $(this).attr('target'));
          } else {
            location.href = $(this).attr('href');
          }
        });
    }

    if (this.album.length > 1 && this.options.showImageNumberLabel) {
      var labelText = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
      this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
    } else {
      this.$lightbox.find('.lb-number').hide();
    }

    this.$outerContainer.removeClass('animating');

    this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
      return self.sizeOverlay();
    });
  };

  // Preload previous and next images in set.
  Lightbox.prototype.preloadNeighboringImages = function() {
    if (this.album.length > this.currentImageIndex + 1) {
      var preloadNext = new Image();
      preloadNext.src = this.album[this.currentImageIndex + 1].link;
    }
    if (this.currentImageIndex > 0) {
      var preloadPrev = new Image();
      preloadPrev.src = this.album[this.currentImageIndex - 1].link;
    }
  };

  Lightbox.prototype.enableKeyboardNav = function() {
    $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
  };

  Lightbox.prototype.disableKeyboardNav = function() {
    $(document).off('.keyboard');
  };

  Lightbox.prototype.keyboardAction = function(event) {
    var KEYCODE_ESC        = 27;
    var KEYCODE_LEFTARROW  = 37;
    var KEYCODE_RIGHTARROW = 39;

    var keycode = event.keyCode;
    var key     = String.fromCharCode(keycode).toLowerCase();
    if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
      this.end();
    } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
      if (this.currentImageIndex !== 0) {
        this.changeImage(this.currentImageIndex - 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(this.album.length - 1);
      }
    } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
      if (this.currentImageIndex !== this.album.length - 1) {
        this.changeImage(this.currentImageIndex + 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(0);
      }
    }
  };

  // Closing time. :-(
  Lightbox.prototype.end = function() {
    this.disableKeyboardNav();
    $(window).off('resize', this.sizeOverlay);
    this.$lightbox.fadeOut(this.options.fadeDuration);
    this.$overlay.fadeOut(this.options.fadeDuration);
    $('select, object, embed').css({
      visibility: 'visible'
    });
    if (this.options.disableScrolling) {
      $('body').removeClass('lb-disable-scrolling');
    }
  };

  return new Lightbox();
}));
