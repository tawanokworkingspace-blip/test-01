# Spring JWT Login Demo

This project is a minimal Spring Boot 3.3 application that demonstrates how to issue and validate JSON Web Tokens (JWT) for protecting REST APIs. It ships with an in-memory H2 database, seeds a couple of demo users, and exposes a small set of authentication and profile endpoints.

## Prerequisites

- Java 21+
- Maven 3.9+ (or use the provided `./mvnw` wrapper)

The repository already includes the Maven wrapper and an embedded H2 database, so no external services are required.

## Running the application

```bash
./mvnw spring-boot:run
```

The service starts on `http://localhost:8080`. The H2 console is also available at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:authdb`).

### Default users

| Username | Password  | Role  |
|----------|-----------|-------|
| `user`   | `password`| USER  |
| `admin`  | `admin123`| ADMIN |

These accounts are created automatically every time the application boots.

### Public hello endpoint

`GET /api/hello` is an unauthenticated health-style endpoint that returns a simple JSON greeting.

## Authentication flow

1. **Obtain a token**
   ```bash
   curl -X POST http://localhost:8080/api/auth/login \
        -H 'Content-Type: application/json' \
        -d '{"username":"user","password":"password"}'
   ```
   Response:
   ```json
   {
     "accessToken": "<JWT>",
     "expiresIn": 3600000,
     "tokenType": "Bearer"
   }
   ```

2. **Call protected endpoints** (include the `Authorization: Bearer <JWT>` header)
   ```bash
   TOKEN="$(curl -s -X POST http://localhost:8080/api/auth/login \
        -H 'Content-Type: application/json' \
        -d '{"username":"user","password":"password"}' | jq -r '.accessToken')"

   curl http://localhost:8080/api/profile/me -H "Authorization: Bearer ${TOKEN}"
   curl http://localhost:8080/api/profile/greeting -H "Authorization: Bearer ${TOKEN}"
   ```

- `GET /api/profile/me` returns the persisted profile for the authenticated user.
- `GET /api/profile/greeting` returns a simple personalized greeting, useful for smoke-testing JWT validation.

## Running tests

```bash
./mvnw test
```

Tests include a MockMvc integration test that exercises the `/api/auth/login` endpoint to ensure a JWT is issued end-to-end.
