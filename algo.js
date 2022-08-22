curl --location --request POST "http://localhost:8001/services" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "name=dco-svc-dev-add-whitelist" \
--data-urlencode "url=http://atestacion.devdicio.net:8010/dev/AddListaBlanca" \
--data-urlencode "connect_timeout=900000" \
--data-urlencode "write_timeout=900000" \
--data-urlencode "read_timeout=900000"

curl --location --request PATCH "http://localhost:8001/services/dco-svc-dev-add-whitelist" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "url=http://atestacion.devdicio.net:8010/dev/AddListaBlanca" 

curl --location --request POST "http://localhost:8001/services/dco-svc-dev-add-whitelist/routes" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "name=dco-rte-dev-add_whitelist" \
--data-urlencode "paths[]=/v1/add_whitelist" \
--data-urlencode "methods[]=POST" \
--data-urlencode "methods[]=OPTIONS" \
--data-urlencode "hosts[]=api.devdicio.net" \
--data-urlencode "hosts[]=localhost" \
--data-urlencode "hosts[]=169.57.44.49"

curl --location --request PATCH "http://localhost:8001/routes/dco-svc-dev-add-whitelist" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "name=dco-rte-dev-add_whitelist" \
--data-urlencode "paths[]=/v1/add_whitelist" \
--data-urlencode "methods[]=POST" \
--data-urlencode "methods[]=OPTIONS" \
--data-urlencode "hosts[]=api.devdicio.net" \
--data-urlencode "hosts[]=localhost" \
--data-urlencode "hosts[]=169.57.44.49"

curl --location --request POST "http://localhost:8001/routes/dco-rte-dev-add-whitelist/plugins/" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "name=cors" \
--data-urlencode "config.origins=*" \
--data-urlencode "config.headers=*" \
--data-urlencode "config.credentials=false" \
--data-urlencode "config.max_age=3600"

{
    "data": [
        {
            "enabled": true,
            "name": "dco-svc-dev-find-by-id",
            "tags": null,
            "ca_certificates": null,
            "protocol": "http",
            "port": 8010,
            "client_certificate": null,
            "tls_verify": null,
            "tls_verify_depth": null,
            "connect_timeout": 900000,
            "read_timeout": 900000,
            "updated_at": 1655756361,
            "retries": 5,
            "path": "/dev/searchByID",
            "write_timeout": 900000,
            "id": "2f945c9b-6df2-4151-99d9-1ad79e7d68de",
            "host": "atestacion.devdicio.net",
            "created_at": 1655756361
        },
        {
            "enabled": true,
            "name": "dco-svc-dev-atestacion",
            "tags": null,
            "ca_certificates": null,
            "protocol": "http",
            "port": 8010,
            "client_certificate": null,
            "tls_verify": null,
            "tls_verify_depth": null,
            "connect_timeout": 900000,
            "read_timeout": 900000,
            "updated_at": 1654810798,
            "retries": 5,
            "path": "/dev/atestacion",
            "write_timeout": 900000,
            "id": "32bf0dfb-a14b-49b7-a266-c3bf74e48b36",
            "host": "atestacion.devdicio.net",
            "created_at": 1654810334
        },
        {
            "enabled": true,
            "name": "dco-svc-dev-gestor",
            "tags": null,
            "ca_certificates": null,
            "protocol": "http",
            "port": 5678,
            "client_certificate": null,
            "tls_verify": null,
            "tls_verify_depth": null,
            "connect_timeout": 900000,
            "read_timeout": 900000,
            "updated_at": 1644426338,
            "retries": 5,
            "path": null,
            "write_timeout": 900000,
            "id": "9bf2d78e-9732-4b45-b091-f124d554ffd9",
            "host": "gestor.devdicio.net",
            "created_at": 1644426338
        },
        {
            "enabled": true,
            "name": "metadata-endpoint",
            "tags": null,
            "ca_certificates": null,
            "protocol": "http",
            "port": 80,
            "client_certificate": null,
            "tls_verify": null,
            "tls_verify_depth": null,
            "connect_timeout": 60000,
            "read_timeout": 60000,
            "updated_at": 1657630589,
            "retries": 5,
            "path": null,
            "write_timeout": 60000,
            "id": "c7fcf563-a523-4b22-bf61-67372b2d6ece",
            "host": "169.254.169.254",
            "created_at": 1657630589
        },
        {
            "enabled": true,
            "name": "dco-svc-dev-atestacion_full",
            "tags": null,
            "ca_certificates": null,
            "protocol": "http",
            "port": 8010,
            "client_certificate": null,
            "tls_verify": null,
            "tls_verify_depth": null,
            "connect_timeout": 900000,
            "read_timeout": 900000,
            "updated_at": 1660842664,
            "retries": 5,
            "path": "/dev/atestacion_full",
            "write_timeout": 900000,
            "id": "cfb863f4-5f32-4e78-9d79-72dddc24e62a",
            "host": "atestacion.devdicio.net",
            "created_at": 1660842664
        },
        {
            "enabled": true,
            "name": "dco-svc-dev-find-by-curp",
            "tags": null,
            "ca_certificates": null,
            "protocol": "http",
            "port": 8010,
            "client_certificate": null,
            "tls_verify": null,
            "tls_verify_depth": null,
            "connect_timeout": 900000,
            "read_timeout": 900000,
            "updated_at": 1655756274,
            "retries": 5,
            "path": "/dev/searchByCurp",
            "write_timeout": 900000,
            "id": "fef64eb8-8106-441a-8bb4-33c77af40d1e",
            "host": "atestacion.devdicio.net",
            "created_at": 1655756274
        }
    ]