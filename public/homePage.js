'use strict';

//Выход из личного кабинета
const logOutButton = new LogoutButton();

logOutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

//Получение информации о пользователе
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function exchangeRate() {
    ApiConnector.getStocks(response => {
        if (response) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

setInterval(exchangeRate, 60000);

//Пополнение баланса
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Счёт пополнен.");
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
    });
};

//Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация выполнена.");
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
    });
};

//Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Трансфер выполнен.");
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
    });
};

//Начальный список избранного
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

//Добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь добавлен в адресную книгу."
            );
        } else {
            favoritesWidget.setMessage(!response.success, response.data);
        }
    });
};

//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удалён из адресной книги.");
        } else {
            favoritesWidget.setMessage(!response.success, response.data);
        }
    });
};
