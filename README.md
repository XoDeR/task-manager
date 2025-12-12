# task-manager

Simple Task Manager application. Laravel API, React frontend.

## How to run locally

#### Prerequisites

MySQL version 8 (tested with v8.0.30)

PHP (v8.4) with composer

Node.js (tested with v22.12.0)

#### DB

Create MySQL database with name: **task-manager**

user: **root**

password: [empty, no password]

These database credentials are used in .env.example

#### Backend

Install dependencies by running

```
composer install
```

in /backend directory

Copy .env.example to .env

Generate app key

```
php artisan key:generate
```

Run DB migrations and seeder. The seeder will create a test user and some test tasks

To login with test user use: email: john@example.com password: [password]

```
php artisan migrate --seed
```

Start Laravel API server

```
php artisan serve
```

You should see: ```Server running on [http://127.0.0.1:8000].```

#### Frontend

Go to /frontend

Install dependencies

```
npm install
```

Start frontend

```
npm run dev
```

Frontend should be available on ```http://localhost:5173/```

#### Login with test user

email: 

**john@example.com**

password: 

**password**
