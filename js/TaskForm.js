/**
 * Created by KoicsD on 2016.05.24..
 */
(function (app) {
    (function (subapp) {
        subapp.validateTitle = validateTitle;
        subapp.validateDescription = validateDescription;

        var validity = {
            title: false,
            description: false
        };

        function validateTitle() {
            validateInput(function (input) {
                var regex = new RegExp('.+');
                input.value = input.value.trim();
                return regex.test(input.value);
            }, 'title', 'inpTitle', 'errInvalidTitle', 'Field \'Title\' cannot be empty!');
        }

        function validateDescription() {
            validateInput(function (input) {
                return input.value.length > 0;
            }, 'description', 'txtDesc', 'errInvalidDesc', 'Field \'Description\' cannot be empty!');
        }

        function validateInput(validatorFcn, name, inputId, errId, errMsg) {
            var input = document.getElementById(inputId);
            var lsErrors = document.getElementById('ulErrors');
            validity[name] = validatorFcn(input);
            var liErrMsg;
            if (validity[name]) {
                liErrMsg = document.getElementById(errId);
                if (!! liErrMsg)
                    lsErrors.removeChild(liErrMsg);
                input.classList.remove('invalid');
            } else {
                liErrMsg = document.createElement('li');
                liErrMsg.id = errId;
                liErrMsg.textContent = errMsg;
                lsErrors.appendChild(liErrMsg);
                input.classList.add('invalid');
            }
            refreshSavable();
        }
        
        function refreshSavable() {
            var button = document.getElementById('btnSaveTask');
            button.disabled = !(validity.title && validity.description);
        }
    })(app.task_form = app.task_form || {});
})(window.product_backlog = window.product_backlog || {});
