Fullstack Developer - Tasks
==========

------------

Opis wykonanego zadania

------------

### Backend - Symfony

1. Wykorzystałem wzorzec projektowy typu Repozytorium, aby odseparować logikę dostępu do danych od reszty aplikacji. Dzięki temu podejściu można w łatwy i czytelny sposób rozbudowywać filtrowanie, a jednocześnie pozostawić kod kontrolera czystym.
1. Wykorzystałem wzorzec typu DTO, aby uzyskać spójność danych które otrzymuje od NBP i zwracam za pomocą REST API. Dzięki DTO łatwo będzie w przyszłości rozszerzać obiekt o nowe dane jeśli takie się pojawią, bądź wykluczać określone dane.
1. Zastosowałem Cache który jest rewalidowany co godzinę. Dzięki temu serwer zostanie odciążony poprzez serwowanie wcześniej zachowanych danych, w tym również danych sparametryzowanych. Ponadto Cache stanowczo przyśpiesza odpowiedź z serwera, w lokalnym środowisku na odpowiedź nie zapisaną w pamięci podręcznej trzeba było czekać ~ 250ms, natomiast po zastosowaniu Cache ta sama odpowiedź jest zwracana w czasie ~ 20ms.
1. Zastosowałem dodatkowo "Middleware", a więc Listener w Symfony, dzięki któremu zabezpieczyłem REST API wyłącznie dla requestów które posiadają określony klucz API w nagłówkach żądania, w przeciwnym wypadku klient otrzyma błąd HTTP typu 419. Klucz API jest definowany w pliku .env, został on celowo nie zignorowany w repozytorium.
1. W pliku .evn należy zdefiniować klucz API, np. API_KEY=2Ii3oFObje5m8208nDygIVJh0pSn3eq4ay5dDuRHl5A0ETLJ6r

### Frontend - NextJS + TS

1. Frontend oparłem o framework NextJS,
1. Requesty wykonywane do serwisu Symfony wykonywane są za pomocą API NextJS tak aby nie uwydatniać klucza API oraz endpointów zachowanych w pliku .env
1. Starałem się stworzyć minimalistyczny front, z przejrzystym UI.
1. Frontend został zawarty bezpośrednio w projekcie Symfony, natomiast uważam, że lepszą techniką byłoby utworzenie osobnego repozytorium dla frontendu.
1. Deployment oparłbym o serwer Nginx, reverse proxy oraz PM2
1. W pliku .env należy zdefiniować API_URL - url API Symfony, API_KEY - klucz API przekazywany w requestach, NEXT_PUBLIC_FRONTEND_URL - URL frontendu


### Przykładowy kod bloku serwerowego Nginx dla REST API (Symfony)
  
  ```
    server {
      server_name api.telemedi-task.pl;
      root /var/www/api.telemedi-task.pl/html;

      http2 on;
  
      add_header X-Frame-Options "SAMEORIGIN";
      add_header X-Content-Type-Options "nosniff";
      
      index index.php;
  
      charset utf-8;
  
      location / {
          try_files $uri $uri/ /index.php?$query_string;
      }

      location = /favicon.ico { access_log off; log_not_found off; }
      location = /robots.txt  { access_log off; log_not_found off; }
  
      error_page 404 /index.php;
  
      location ~ \.php$ {
          fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
          fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
          include fastcgi_params;
      }
  
      location ~ /\.(?!well-known).* {
          deny all;
      }

      location ~* \.(jpg|jpeg|png|gif|ico|svg|webp|ttf|woff|woff2|otf)$ {
        expires 12M;
      }

      location ~* \.(css|js)$ {
        expires 12M;
      }

      listen 443 ssl; # managed by Certbot
      ssl_certificate /etc/letsencrypt/live/api.telemedi-task.pl/fullchain.pem; # managed by Certbot
      ssl_certificate_key /etc/letsencrypt/live/api.telemedi-task.pl/privkey.pem; # managed by Certbot
      include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
      ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    }

    server {
        if ($host = api.telemedi-task.pl) {
            return 301 https://$host$request_uri;
        } # managed by Certbot

        server_name api.telemedi-task.pl;
        listen 80;
        return 404; # managed by Certbot
    }
  ```

### Przykładowy kod bloku serwerowego Nginx dla Frontendu

```
    server {
      server_name telemedi-task.pl www.telemedi-task.pl;
      root /var/www/telemedi-task.pl/telemedi-task-frontend;

      http2 on;

      location /_next/static/ {
          alias /var/www/telemedi-task.pl/telemedi-task-frontend/.next/static/;
          expires 365d;
          access_log off;
      }

      location / {
          proxy_pass http://127.0.0.1:3000;
          proxy_read_timeout 60;
          proxy_connect_timeout 60;
          proxy_redirect off;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
          add_header Access-Control-Allow-Origin "http://localhost:3000";
          add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
          add_header Access-Control-Allow-Headers "X-API-KEY, Content-Type";
      }

      location ~* ^/assets/.*\.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|ttf)$ {
          proxy_ignore_headers Cache-Control;
          proxy_cache_valid 60m;
          proxy_pass http://127.0.0.1:3000;
      }

      listen 443 ssl; # managed by Certbot
      ssl_certificate /etc/letsencrypt/live/telemedi-task.pl-0001/fullchain.pem; # managed by Certbot
      ssl_certificate_key /etc/letsencrypt/live/telemedi-task.pl-0001/privkey.pem; # managed by Certbot
      include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
      ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
  }

  server {
      if ($host = www.telemedi-task.pl) {
          return 301 https://$host$request_uri;
      } # managed by Certbot


      if ($host = telemedi-task.pl) {
          return 301 https://$host$request_uri;
      } # managed by Certbot


      server_name telemedi-task.pl www.telemedi-task.pl;
      listen 80;
      return 404; # managed by Certbot
    }
  ```
  
### Deployment

Stworzoną aplikację można wdrożyć na serwer VPS, bądź bardziej rozbudowane rozwiązania chmurowe. W swojej pracy najczęściej wdrażam aplikacje na serwery VPS, oprócz kodu konfiguracyjnego dla Nginx należałoby utworzyć nowego użytkownika systemowego, który będzie przypisany do PHP-FPM oraz Nginx. Dodatkowo należy zmienić port SSH z domyślnego 22, wyłączyć logowanie za pomocą hasła, a udostępnić logowanie wyłącznie za pośrednictwem kluczy SSH. Wdrożenie usługi Cloudflare dodatkowo wzmocniłoby bezpieczeństwo serwera i udostępniło dodatkowe opcje optymalizacyjne. Oczywiście aplikacja powinna być zabezpieczona protokołem SSL, w moim przypadku konfiguracja Nginx wskazuje na wykorzystanie certbota dla generowania automatycznego certyfikatu typu self-signed.

### Czas poświęcony na wykonanie tego zadania to 8h

### Feedback

1. Zadanie było proste i zrozumiałe, nie napotkałem większych problemów przy jego realizacji.
1. Największym wyzwaniem było stworzenie miniamlistycznego i intuicyjnego UI.