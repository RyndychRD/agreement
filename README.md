# agreement

## Предустановки

Необходимо иметь установленный node v14.18.0 и npm v6.14.15

## Для компиляции сервера

По старому с использованием библиотеки pkg. В package.json должны быть данные
<code>
"pkg": {
"scripts": [
"src/**/*.js",
],
"assets": [
"SSL/**/*"
]
},
</code>

Получаем agreementserver.exe. Копируем его с папкой SSL и .env в нужную директорию

## Для компиляции клиента

Скачиваем последнюю ветку. В .env клиента пишем текущий адрес сервера. Билдим с помощью команды npm run build. Копируем получившуюся папку build в нужное место, убеждаемся что была хотя бы раз запущена команда npm install -g serve, потом запускаем клиент с помощью npx serve -s build из папки клиента

### Ссылки

https://www.electronjs.org/ru/docs/latest/tutorial/quick-start
