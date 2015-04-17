/**
 * @author Anton Drobot <me@antondrobot.ru>
 * @version 1.0.0
 */

(function ($, document, window, undefined) {
    'use strict';

    $(function () {
        $('input, textarea').placeholder();

        $('.form__checkbox--pretty, .form__radio--pretty').after('<span class="form__control-indicator"></span>');
    });
})(jQuery, document, window);
