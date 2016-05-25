/**
 * Created by KoicsD on 2016.05.24..
 */
(function (app) {
    app.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    app.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    app.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    app.db_name = 'backlog_items';
    app.db_version = 1;

    if (!app.indexedDB) {
        alert("Your browser doesn't support a stable version of IndexedDB.");
    } else {
        (function openDB() {
            console.log('opening DB...');
            var req = indexedDB.open(app.db_name, app.db_version);
            req.onsuccess = function (event) {
                console.log('DB opened successfully.');
                app.db = req.result;
            };
            req.onerror = function (event) {
                console.log('Error while opening database. Error code: ' + event.target.errorCode);
                alert(':( Sorry, an error has occurred while opening database. Error code: ' + event.target.errorCode);
            };
        })();
    }

    (function (subapp) {
        subapp.store_name = 'blabla';
        subapp.validateTitle = validateTitle;
        subapp.validateDescription = validateDescription;
        subapp.saveTask = saveTask;
        subapp.discardForm = discardForm;

        // initializing indexed-DB:
        (function () {
            if (!!app.db && !app.db.objectStoreNames.contains(subapp.store_name)) {
                try {
                    console.log('Creating object-store...');
                    app.db.createObjecStore(subapp.store_name);
                    console.log('Object-store created successfully.')
                } catch (error) {
                    console.log('Error while creating object-store:\n' + error.toString());
                    alert(':( Sorry, an error occurred while creating object-store. See console.');
                }
            }
        })();

        // validation-logic:
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

        // save and cancel:
        function saveTask() {
            var title = document.getElementById('inpTitle').value;
            var description = document.getElementById('txtDesc').value;
            if (!app.db.objectStoreNames.contains(subapp.store_name)) {
                console.log('Object-store cannot be found in indexedDB when saving Task.');
                alert(':( Sorry, object-store cannot be found!');
            } else {
                try {
                    console.log('Saving Task from form...');
                    var transaction = app.db.transaction(subapp.store_name, 'readwrite');
                    var objectStore = transaction.objectStore(subapp.store_name);
                    var request = objectStore.add({title: title, description: description});
                    request.onsuccess = function (event) {
                        console.log('Task saved from form successfully.');
                        alert(';) Task has been saved successfully:\n'
                            + '{\n'
                            + '\ttitle: ' + title + '\n'
                            + '\tdescription: ' + description + '\n'
                            + '}');
                    };
                    request.onerror = function (event) {
                        console.log('Error when saving Task from form. Error code: ' + event.target.errorCode);
                        alert(':( An error has occurred when saving Task from form. Error code: '
                            + event.target.errorCode);
                    }
                } catch (error) {
                    console.log('Error while saving Task from form:\n' + error.toString());
                    alert(':( Sorry, an error occurred while creating object-store. See console.');
                }
            }
        }

        function discardForm() {
            document.getElementById('inpTitle').value = '';
            document.getElementById('txtDesc').value = '';
            validity.title = false;
            validity.description = false;
            refreshSavable();
        }
    })(app.task_form = app.task_form || {});
})(window.product_backlog = window.product_backlog || {});
