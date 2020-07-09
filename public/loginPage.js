'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.data);
        }
    });
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (Object.keys(response).length === 0) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.data);
        }
    });
};
