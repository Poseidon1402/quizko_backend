# Setup Laravel

```
composer install
./vendor/bin/sail up
./vendor/bin/sail php artisan migrate
docker exec -i quizko_backend-mysql-1 mysqldump --no-tablespaces -u USERNAME -p DB_NAME > backup.sql
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```
