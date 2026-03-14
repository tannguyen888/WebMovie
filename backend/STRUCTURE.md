# Backend Project Structure - Hướng dẫn chi tiết

## 📁 Cấu trúc hoàn chỉnh

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/movieapp/
│   │   │   ├── BackendApplication.java          ⭐ Main entry point
│   │   │   │
│   │   │   ├── config/                          🔧 Cấu hình
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── CorsConfig.java
│   │   │   │   ├── WebConfig.java
│   │   │   │   └── JacksonConfig.java
│   │   │   │
│   │   │   ├── controller/                      🌐 REST APIs
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── MovieController.java
│   │   │   │   ├── UserController.java
│   │   │   │   ├── FavoriteController.java
│   │   │   │   ├── GenreController.java
│   │   │   │   └── EpisodeController.java
│   │   │   │
│   │   │   ├── dto/                            📨 Data Transfer Objects
│   │   │   │   ├── request/
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   └── MovieRequest.java
│   │   │   │   └── response/
│   │   │   │       ├── AuthResponse.java
│   │   │   │       ├── MovieResponse.java
│   │   │   │       └── ErrorResponse.java
│   │   │   │
│   │   │   ├── exception/                      ⚠️ Custom Exceptions
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   ├── InvalidCredentialsException.java
│   │   │   │   ├── DuplicateUserException.java
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ValidationException.java
│   │   │   │
│   │   │   ├── model/                          📊 JPA Entities
│   │   │   │   ├── User.java
│   │   │   │   ├── Movie.java
│   │   │   │   ├── Episode.java
│   │   │   │   ├── Genre.java
│   │   │   │   ├── Favorite.java
│   │   │   │   └── BaseEntity.java (abstract)
│   │   │   │
│   │   │   ├── repository/                     💾 Data Access
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── MovieRepository.java
│   │   │   │   ├── FavoriteRepository.java
│   │   │   │   ├── GenreRepository.java
│   │   │   │   └── EpisodeRepository.java
│   │   │   │
│   │   │   ├── security/                       🔐 Security & JWT
│   │   │   │   ├── JwtService.java
│   │   │   │   ├── JwtAuthFilter.java
│   │   │   │   ├── CustomUserDetails.java
│   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   └── SecurityConfig.java
│   │   │   │
│   │   │   ├── service/                        🎯 Business Logic
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── UserService.java
│   │   │   │   ├── MovieService.java
│   │   │   │   ├── FavoriteService.java
│   │   │   │   ├── GenreService.java
│   │   │   │   ├── EpisodeService.java
│   │   │   │   └── FileUploadService.java
│   │   │   │
│   │   │   ├── util/                          🛠️ Utilities
│   │   │   │   ├── Constants.java
│   │   │   │   ├── DateUtils.java
│   │   │   │   ├── FileUtils.java
│   │   │   │   ├── ValidationUtils.java
│   │   │   │   └── ResponseUtils.java
│   │   │   │
│   │   │   └── listener/                       📢 Event Listeners
│   │   │       └── EntityAuditListener.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       ├── application-test.properties
│   │       ├── messages.properties
│   │       ├── messages_vi.properties
│   │       ├── db/
│   │       │   └── migration/
│   │       │       ├── V1__Initial_Schema.sql
│   │       │       ├── V2__Create_Users_Table.sql
│   │       │       ├── V3__Create_Movies_Table.sql
│   │       │       └── V4__Insert_Sample_Data.sql
│   │       └── static/
│   │           └── api-docs/
│   │
│   └── test/
│       └── java/com/movieapp/
│           ├── controller/
│           │   └── AuthControllerTest.java
│           ├── service/
│           │   └── MovieServiceTest.java
│           └── repository/
│               └── UserRepositoryTest.java
│
├── docs/
│   ├── API.md                     # API Documentation
│   ├── INSTALLATION.md            # Setup guide
│   ├── DATABASE.md                # Database Schema
│   └── SWAGGER.md                 # Swagger UI info
│
├── logs/                          # Application logs (gitignored)
│
├── pom.xml                        # Maven dependencies
├── .env.example                   # Environment variables example
├── .gitignore
├── README.md
├── STRUCTURE.md
└── docker-compose.yml             # Docker setup (optional)
```

## 🎯 Quy ước Đặt tên

### Controllers
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController { }
```

### Services
```java
@Service
public class MovieService { }
```

### Repositories
```java
@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> { }
```

### DTOs
```java
public class LoginRequest { }      // Request DTO
public class AuthResponse { }      // Response DTO
```

### Models (Entities)
```java
@Entity
@Table(name = "users")
public class User { }
```

## 📋 Quy trình Add Feature

### 1️⃣ Tạo Model (Entity)
```
backend/src/main/java/com/movieapp/model/Movie.java
```

### 2️⃣ Tạo Repository
```
backend/src/main/java/com/movieapp/repository/MovieRepository.java
```

### 3️⃣ Tạo DTO
```
backend/src/main/java/com/movieapp/dto/request/MovieRequest.java
backend/src/main/java/com/movieapp/dto/response/MovieResponse.java
```

### 4️⃣ Tạo Service
```
backend/src/main/java/com/movieapp/service/MovieService.java
```

### 5️⃣ Tạo Controller
```
backend/src/main/java/com/movieapp/controller/MovieController.java
```

### 6️⃣ Tạo Tests
```
backend/src/test/java/com/movieapp/controller/MovieControllerTest.java
```

## 🔄 Lifecycle Request

```
HTTP Request
    ↓
Controller (@RequestMapping, @GetMapping, etc)
    ↓
Service (Business Logic)
    ↓
Repository (Database Query)
    ↓
Model (Entity)
    ↓
HTTP Response (DTO)
```

## ✅ Best Practices

1. **Separation of Concerns**: Mỗi layer có trách nhiệm riêng
2. **DTOs cho API**: Không trả về Entity trực tiếp
3. **Exception Handling**: Sử dụng GlobalExceptionHandler
4. **Validation**: Dùng @Valid, @NotNull, @Pattern, etc
5. **Logging**: Sử dụng SLF4J
6. **Testing**: Viết unit tests cho services
7. **Security**: JWT tokens, CORS config
8. **Database Migration**: Sử dụng Flyway/Liquibase
