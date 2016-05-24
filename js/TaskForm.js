/**
 * Created by KoicsD on 2016.05.24..
 */
(function (app) {
    (function (subapp) {
        subapp.validateTitle = validateTitle;

        function validateTitle() {
            var input = document.getElementById('inpTitle');
            var lbError = document.getElementById('lbInvalidTitle');
            var regex = new RegExp('.+');
            input.value = input.value.trim();
            if (new RegExp('.+').test(input.value)) {
                lbError.textContent = '';
                input.classList.remove('invalid');
            }
            else {
                lbError.textContent = 'Field \'Title\' cannot be empty!';
                input.classList.add('invalid');
            }
        }    
    })(app.task_form = app.task_form || {});
})(window.product_backlog = window.product_backlog || {});
