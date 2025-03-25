### Run

```
docker compose -f docker-compose-test.yml up --build
```

New terminal
```
docker compose -f docker-compose-test.yml exec backend bash
python manage.py makemigrations (should be 'No changes detected')
python manage.py migrate
```

Preferrably open Icognito window (avoid any extensions or cache interference)
Go to: http://localhost:5173/


### Design patterns or architectural choices

Check the [WorkLog file](WorkLog.md)
