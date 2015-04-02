/**
 * @author Anton Drobot <me@antondrobot.ru>
 * @version 1.0.0
 */

(function ($, document, window, undefined) {
    $(document).ready(function () {
        $('input, textarea').placeholder();

        $('.form__checkbox_styled, .form__radio_styled').after('<span class="form__control-styled"></span>');

        $('.form__file_styled').wrap('<span class="form__file-styled-wrapper"></span>').after('<span class="form__file-styled">Выберите файл...</span>');
    });
})($, document, window);