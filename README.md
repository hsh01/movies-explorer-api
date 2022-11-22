# Проект movies-explorer-api

## Директории

### возвращает информацию о пользователе (email и имя)
GET /users/me

### обновляет информацию о пользователе (email и имя)
PATCH /users/me

### возвращает все сохранённые текущим  пользователем фильмы
GET /movies

### создаёт фильм с переданными в теле
### country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
POST /movies

### удаляет сохранённый фильм по id
DELETE /movies/_id 

### создаёт пользователя с переданными в теле
### email, password и name
POST /signup

### проверяет переданные в теле почту и пароль
### и возвращает JWT
POST /signin 


## Запуск проекта
`docker-compose up -d`
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Путь
[https://api.movies-explorer.haydev.ru](https://api.movies-explorer.haydev.ru)

