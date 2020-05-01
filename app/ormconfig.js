module.exports = {
  "type": "mysql",
  "host": "mysql",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "asisdminCIELO",
  "entities": [
    "src/**/**/*.entity{.ts,.js}"
  ],
  "migrations": [
    "src/database/migrations/*{.ts,.js}"
  ],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}