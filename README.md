# Setup Laravel

```
composer install
php artisan sail:install
./vendor/bin/sail up
./vendor/bin/sail php artisan migrate
./vendor/bin/sail mysql -u username -p database_name < backup.sql
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```
