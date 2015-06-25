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

    var onClick = {};

    var onSubmit = {};

    $(function () {
        preparePage();

        $('input, textarea').placeholder();

        $('.form__checkbox--pretty, .form__radio--pretty').after('<span class="form__control-indicator"></span>');

        $(document).on('click', '.js-click', function (event) {
            var action = $(this).data('action');

            if (onClick[action] !== undefined) {
                onClick[action].call(this, event);
            }
        });

        $(document).on('submit', '.js-form', function (event) {
            var action = $(this).data('action');

            if (onSubmit[action] !== undefined) {
                onSubmit[action].call(this, event);
            }
        });
    });
})(jQuery, document, window);
