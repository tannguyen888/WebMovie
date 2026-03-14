# 🎬 Movie App Backend - Scalable Architecture

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=flat-square)
![Version](https://img.shields.io/badge/Version-0.0.1--SNAPSHOT-blue?style=flat-square)
![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen?style=flat-square)

Backend REST API cho ứng dụng quản lý phim Movie App, xây dựng theo kiến trúc layered architecture, hỗ trợ JWT authentication, và được tối ưu cho scalability.

## 🌟 Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - User and Admin roles
- ✅ **Scalable Architecture** - Layered design for easy expansion
- ✅ **RESTful API** - 20+ endpoints
- ✅ **Global Exception Handling** - Standardized error responses
- ✅ **Database** - PostgreSQL with JPA/Hibernate
- ✅ **API Documentation** - Comprehensive guides included
- ✅ **Environment Configuration** - Dev, Test, Production profiles
- ✅ **CORS Support** - Cross-origin requests enabled
- ✅ **Data Validation** - Input validation and sanitization

## 📁 Project Structure

```
backend/
├── src/main/
│   ├── java/com/movieapp/
│   │   ├── controller/        - REST API endpoints
│   │   ├── service/           - Business logic
│   │   ├── repository/        - Data access layer
│   │   ├── model/             - JPA entities
│   │   ├── dto/               - Request/Response objects
│   │   ├── security/          - JWT & authentication
│   │   ├── exception/         - Custom exceptions
│   │   ├── config/            - Application configuration
│   │   ├── util/              - Utility classes
│   │   └── BackendApplication.java
│   └── resources/
│       ├── application.properties
│       ├── application-dev.properties
│       ├── application-prod.properties
│       └── db/migration/V1__Initial_Schema.sql
├── pom.xml                    - Maven configuration
├── .env.example               - Environment variables template
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.8.1+
- PostgreSQL 12+

### Installation

1. **Clone and navigate**
```bash
cd backend
```

2. **Setup database**
```bash
# Create PostgreSQL database
createdb movieapp
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Build and run**
```bash
# Build
mvn clean install

# Run
mvn spring-boot:run
```

5. **Verify**
```bash
curl http://localhost:8080/api/movies
```

## 📚 API Endpoints

### Authentication (4)
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login
GET    /api/auth/me             - Get current user
POST   /api/auth/validate       - Validate token
```

### Movies (7)
```
GET    /api/movies              - List all movies
GET    /api/movies/{id}         - Get movie details
GET    /api/movies/search       - Search movies
GET    /api/movies/genre/{g}    - Filter by genre
GET    /api/movies/year/{y}     - Filter by year
POST   /api/movies              - Create movie
PUT    /api/movies/{id}         - Update movie
DELETE /api/movies/{id}         - Delete movie
```

### Favorites (5)
```
GET    /api/favorites           - Get user favorites
POST   /api/favorites           - Add to favorites
DELETE /api/favorites           - Remove from favorites
GET    /api/favorites/check     - Check if favorite
GET    /api/favorites/count     - Count favorites
```

### Genres (6)
```
GET    /api/genres              - List all genres
GET    /api/genres/{id}         - Get genre details
GET    /api/genres/name/{n}     - Get by name
POST   /api/genres              - Create genre
PUT    /api/genres/{id}         - Update genre
DELETE /api/genres/{id}         - Delete genre
```

### Users (5)
```
GET    /api/users/{id}          - Get user details
GET    /api/users/username/{u}  - Get by username
GET    /api/users               - List all users
PUT    /api/users/{id}          - Update user
DELETE /api/users/{id}          - Delete user
```

## 🔐 Authentication

Use JWT token in Authorization header:
```bash
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/favorites
```

## 📖 Documentation

| File | Content |
|------|---------|
| [SETUP.md](./SETUP.md) | Detailed setup instructions |
| [API_TESTING.md](./API_TESTING.md) | API endpoints & examples |
| [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) | Detailed migration info |
| [STRUCTURE.md](./STRUCTURE.md) | Project structure details |
| [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md) | Frontend integration guide |
| [SUMMARY.md](./SUMMARY.md) | Quick project summary |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [CHECKLIST.md](./CHECKLIST.md) | Implementation checklist |

## 🛠️ Technology Stack

- **Framework:** Spring Boot 3.2.1
- **Language:** Java 17
- **Database:** PostgreSQL 12+
- **Authentication:** JWT (jjwt 0.11.5)
- **ORM:** Hibernate/JPA
- **Build Tool:** Maven
- **Code Generation:** Lombok
- **Documentation:** SpringDoc OpenAPI

## 🔄 Development

### Build Project
```bash
mvn clean install
```

### Run with Dev Profile
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

### Run Tests
```bash
mvn test
```

### Package for Production
```bash
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## 🐳 Docker

### Run with Docker Compose
```bash
docker-compose up --build
```

Backend will be available at `http://localhost:8080`

## 📊 Database Schema

### Users
```sql
id (BIGSERIAL), username (VARCHAR, UNIQUE), password (VARCHAR)
email (VARCHAR, UNIQUE), role (VARCHAR), status (VARCHAR)
```

### Movies
```sql
id (BIGSERIAL), title (VARCHAR), genre (VARCHAR)
description (TEXT), posterPath (VARCHAR), year (VARCHAR)
```

### Favorites
```sql
id (BIGSERIAL), user_id (BIGINT, FK)
movieId (VARCHAR), title (VARCHAR), posterPath (VARCHAR)
```

## 🔒 Security Features

- JWT token authentication
- BCrypt password hashing
- CORS configuration
- Role-based access control
- Stateless session management
- Global exception handling
- Input validation

## 🆘 Troubleshooting

### Database Connection Failed
```bash
# Start PostgreSQL
pg_ctl -D /usr/local/var/postgres start
```

### Port 8080 Already in Use
```bash
# Find and kill process
lsof -i :8080
kill -9 <PID>
```

### Build Failure
```bash
# Clear Maven cache
rm -rf ~/.m2/repository
mvn clean install
```

## 📝 Configuration

Edit `application.properties` to configure:
```properties
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/movieapp
spring.datasource.username=postgres
spring.datasource.password=lab
spring.jpa.hibernate.ddl-auto=update
```

## 🚀 Performance Tips

1. **Database Indexing** - Automatically created on important columns
2. **Connection Pooling** - Configured in Spring Boot
3. **Lazy Loading** - For better performance
4. **Pagination** - Ready to implement
5. **Caching** - Structure ready for Redis integration

## 📈 Scalability

✅ Horizontal scaling ready  
✅ Stateless architecture  
✅ Environment-based configuration  
✅ Microservice-ready design  
✅ Load balancer compatible  

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit: `git commit -am 'Add feature'`
3. Push: `git push origin feature/your-feature`
4. Submit PR

## 📞 Support

For issues or questions:
1. Check documentation in `docs/` folder
2. Review [API_TESTING.md](./API_TESTING.md)
3. Check console logs in `logs/` folder
4. Review error response details

## 📄 License

This project is part of Movie Web App.

## 🎯 Next Steps

1. ✅ Setup and run backend
2. ✅ Test API endpoints
3. ✅ Update frontend integration
4. ✅ Deploy to production

## 📊 Statistics

- **Total API Endpoints:** 20+
- **Total Services:** 5
- **Total Repositories:** 5
- **Total Models:** 5
- **Total Controllers:** 5
- **Code Lines:** 3,000+

---

**Built with ❤️ for scalable movie application**

### Resources
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [REST API Guidelines](https://restfulapi.net/)

