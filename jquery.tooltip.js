/**
* @file jQuery plugin that creates the basic interactivity for an ARIA tooltip widget
* @desc this plugin is in early experimental status
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 0.2.1
* @requires jquery
* @requires jquery-hover-flyout
* @requires jquery-focus-flyout
*/
(function($) {
    /**
    * jQuery plugin that creates the basic interactivity for an ARIA tooltip widget
    *
    * @method "jQuery.fn.tooltip"
    * @param {Object} [options]
    * @param {string} [options.triggerSelector] - selector for trigger element
    * (default: '.tooltip__trigger, [role=tooltip]')
    * @param {string} [options.overlaySelector] - selector for overlay element
    * (default: '.tooltip__overlay, [aria-describedby]')
    * @fires {object} flyoutExpand - the tooltip flyout has expanded
    * @fires {object} flyoutCollapse - the tooltip flyout has collapsed
    * @return {jQuery} chainable jQuery class
    */
    $.fn.tooltip = function(options) {
        options = $.extend({
            overlaySelector: '.tooltip__overlay, [role=tooltip]',
            triggerSelector: '.tooltip__trigger, [aria-describedby]'
        }, options);

        return this.each(function onEach() {
            var $widget = $(this);

            var flyoutOptions = {
                expandedClass: 'tooltip--expanded',
                triggerSelector: options.triggerSelector,
                overlaySelector: options.overlaySelector
            };

            // use plugins for hover and focus behaviour
            $widget.hoverFlyout(flyoutOptions).focusFlyout(flyoutOptions);

            // add hook for progressive enhancement
            $widget.addClass('tooltip--js');
        });
    };
}(jQuery));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* flyoutExpand event
*
* @event flyoutExpand
* @type {object}
* @property {object} event - event object
*/

/**
* flyoutCollapse event
*
* @event flyoutCollapse
* @type {object}
* @property {object} event - event object
*/
