/**
* @file jQuery plugin that creates the basic interactivity for an ARIA tooltip widget
* @desc this plugin is in early experimental status
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 0.0.2
* @requires jquery
* @requires jquery-stick
* @requires jquery-focusable
* @requires jquery-focus-exit
* @requires jquery-mouse-exit
*/
(function($) {
    /**
    * jQuery plugin that creates the basic interactivity for an ARIA tooltip widget
    *
    * @method "jQuery.fn.tooltip"
    * @param {Object} [options]
    * @param {boolean} [options.hideOnScroll]
    * @param {number} [options.alignY]
    * @param {number} [options.alignX]
    * @param {number} [options.offsetTop]
    * @param {number} [options.offsetLeft]
    * @param {boolean} [options.isFixedPosition]
    * @return {jQuery} chainable jQuery class
    */
    $.fn.tooltip = function(options) {
        options = $.extend({
            hideOnScroll: false,
            hideOnResize: false,
            alignX: 'start',
            alignY: 'bottom',
            offsetTop: 0,
            offsetLeft: 0,
            isFixedPosition: false
        }, options);

        return this.each(function onEach() {
            var $tooltipWidget = $(this);
            var $focusable = $tooltipWidget.focusable().first();
            var $overlay = $('#' + $focusable.attr('aria-describedby'));
            var $window = $(window);

            /**
            * Stick fixed position tooltip overlay to focusable element
            * @method stick
            * @return {jQuery} chainable jQuery class
            */
            function stick() {
                return $overlay.stick($tooltipWidget, options);
            }

            /**
            * Show the tooltip overlay
            * @method show
            * @return void
            * @fires 'tooltipShow'
            */
            function show() {
                if ($overlay.attr('aria-hidden') !== 'false') {
                    // update position of overlay
                    stick();

                    // aria-hidden triggers CSS display
                    $overlay.attr('aria-hidden', 'false');

                    if (options.hideOnScroll === true) {
                        $window.one('scroll', hide);
                    }

                    if (options.hideOnResize === true) {
                        $window.one('resize', hide);
                    }

                    // overlays with fixed position might need to be repositioned onscroll & onresize
                    if (options.isFixedPosition === true) {
                        if (options.hideOnScroll === false) {
                            $window.on('scroll', stick);
                        }
                        if (options.hideOnResize === false) {
                            $window.on('resize', stick);
                        }
                    }

                    $tooltipWidget.trigger('tooltipShow');
                }
            }

            /**
            * Hide the tooltip overlay
            * @method hide
            * @return void
            * @fires 'tooltipHide'
            */
            function hide() {
                if ($overlay.attr('aria-hidden') === 'false') {
                    $window.off('scroll resize', stick);
                    $window.off('scroll resize', hide);
                    $overlay.attr('aria-hidden', 'true');
                    $tooltipWidget.trigger('tooltipHide');
                }
            }

            // for natural tab order, we insert the overlay directly after interactive element
            $overlay.insertAfter($focusable);

            // show overlay when mouse enters the interactive element
            $focusable.not('input').on('mouseenter', show);

            // hide the overlay when the mouse exits the widget
            $tooltipWidget.not('.tooltip--input').mouseExit().on('mouseExit', hide);

            // show the overlay when keyboard focus is on the interactive element
            $focusable.on('focus', show);

            // hide the overlay when focus exits the widget
            $tooltipWidget.focusExit().on('focusExit', hide);

            // mark the widget as initialised
            $tooltipWidget.addClass('tooltip--js');
        });
    };
}(jQuery));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* tooltipShow event
*
* @event tooltipShow
* @type {object}
* @property {object} event - event object
*/

/**
* tooltipHide event
*
* @event tooltipHide
* @type {object}
* @property {object} event - event object
*/
