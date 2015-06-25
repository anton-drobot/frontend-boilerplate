/**
 * @author Anton Drobot <me@antondrobot.ru>
 * @version 1.0.0
 */

(function ($, document, window, undefined) {
    'use strict';

    var preparePage = function () {
        var bodyClasses = [];

        if (!Modernizr.svg) {
            bodyClasses.push('no-svg')
        }

        if (!Modernizr.inlinesvg) {
            bodyClasses.push('no-inlinesvg')
        }

        $('html').addClass(bodyClasses.join(' '));
    };

    $(function () {
        preparePage();

        $('input, textarea').placeholder();

        $('.form__checkbox--pretty, .form__radio--pretty').after('<span class="form__control-indicator"></span>');
    });
})(jQuery, document, window);
