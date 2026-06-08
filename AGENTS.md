# Repo Knowledge Base

## Build & Run
- Use the Maven wrapper: `./mvnw spring-boot:run` to start the Spring Boot service on port 8080.
- Run the automated tests with `./mvnw test`.

## Authentication
- JWT secret & expiration are configured via `application.properties` (`jwt.secret`, `jwt.expiration`).
- Demo credentials seeded on startup: `user`/`password` and `admin`/`admin123`.
- Obtain tokens via `POST /api/auth/login` and include `Authorization: Bearer <token>` for protected routes such as `/api/profile/me`.
