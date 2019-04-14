jQuery(document).ready(function($) {

    // Добавляем маску для поля с номера телефона
    $('.phone_mask').mask('+7 (999) 999-99-99');

    // Проверяет отмечен ли чекбокс согласия
    // с обработкой персональных данных
    $('.check').on('click', function () {
        if ($(".check").prop("checked")) {
            $('.button_check').attr('disabled', false);
        } else {
            $('.button_check').attr('disabled', true);
        }
    });
});