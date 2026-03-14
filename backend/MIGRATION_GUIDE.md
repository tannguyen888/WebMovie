# Backend Migration Guide

## 📋 Overview

Cấu trúc backend đã được tổ chức lại theo chuẩn Spring Boot architecture để dễ mở rộng (scalable) và bảo trì.

## 🔄 Thay đổi chính

### 1. **Package Structure**
```
Old: com.movieapp.backend.controller
New: com.movieapp.controller

Old: com.movieapp.backend.service
New: com.movieapp.service

Old: com.movieapp.backend.Repo
New: com.movieapp.repository
```

### 2. **DTOs (Data Transfer Objects)**
**Tạo mới các DTOs để tách biệt entity từ API response:**

```
NEW: com.movieapp.dto.request.AuthRequest
NEW: com.movieapp.dto.response.AuthResponse
NEW: com.movieapp.dto.response.FavoriteResponse
NEW: com.movieapp.dto.response.ErrorResponse
```

**Lợi ích:**
- Tránh lộ thông tin sensitive từ Entity
- Kiểm soát response format
- Dễ dàng validate input

### 3. **Exception Handling**
**Tạo mới GlobalExceptionHandler:**
```java
@RestControllerAdvice
public class GlobalExceptionHandler { }
```

**Custom Exceptions:**
- `ResourceNotFoundException`
- `InvalidCredentialsException`
- `DuplicateUserException`

### 4. **Security Improvements**
- Cập nhật package names
- Nâng cấp JWT handling
- CORS configuration trong SecurityConfig

### 5. **Config Folder**
**Tạo mới folder config:**
```
com/movieapp/config/
└── SecurityConfig.java
```

### 6. **Utility Classes**
**Tạo Constants class:**
```java
public class Constants {
    public static final String JWT_PREFIX = "Bearer ";
    public static final String ROLE_USER = "USER";
    // ... more constants
}
```

### 7. **Entity Enhancements**
**Cập nhật models với:**
- Lombok annotations (`@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`)
- JPA best practices
- Audit fields (`createdAt`, `updatedAt`)

### 8. **Properties Files**
```
application.properties (default/dev)
application-dev.properties (development)
application-prod.properties (production)
```

## 📊 So sánh Old vs New

| Aspect | Old | New |
|--------|-----|-----|
| Package Base | `com.movieapp.backend` | `com.movieapp` |
| Repository Folder | `Repo/` | `repository/` |
| DTOs | Embedded in Controllers | Separate `dto/` folder |
| Exception Handling | Try-catch | `GlobalExceptionHandler` |
| Config | Mixed | Separate `config/` folder |
| Utilities | Inline | `util/Constants.java` |
| Lombok | No | Yes |
| Response Format | Mixed | Standardized DTO |

## 🚀 Cách sử dụng

### 1. **Build Project**
```bash
cd backend
mvn clean install
```

### 2. **Run Application**
```bash
mvn spring-boot:run
```

### 3. **Run with Dev Profile**
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

## 📝 API Endpoints

### Auth
```
POST   /api/auth/register          - Đăng ký
POST   /api/auth/login             - Đăng nhập
GET    /api/auth/me                - Get current user
POST   /api/auth/validate          - Validate token
```

### Movies
```
GET    /api/movies                 - Danh sách phim
GET    /api/movies/{id}            - Chi tiết phim
GET    /api/movies/search           - Tìm kiếm
GET    /api/movies/genre/{genre}   - Theo thể loại
POST   /api/movies                 - Tạo phim (admin)
PUT    /api/movies/{id}            - Cập nhật phim (admin)
DELETE /api/movies/{id}            - Xóa phim (admin)
```

### Favorites
```
GET    /api/favorites              - Danh sách yêu thích
POST   /api/favorites              - Thêm yêu thích
DELETE /api/favorites              - Xóa yêu thích
GET    /api/favorites/check        - Kiểm tra yêu thích
GET    /api/favorites/count        - Đếm yêu thích
```

### Genres
```
GET    /api/genres                 - Danh sách thể loại
GET    /api/genres/{id}            - Chi tiết thể loại
POST   /api/genres                 - Tạo thể loại
PUT    /api/genres/{id}            - Cập nhật thể loại
DELETE /api/genres/{id}            - Xóa thể loại
```

## 🛠️ Development Workflow

### Thêm Feature Mới

**1. Create Entity (Model)**
```
backend/src/main/java/com/movieapp/model/YourModel.java
```

**2. Create Repository**
```
backend/src/main/java/com/movieapp/repository/YourRepository.java
```

**3. Create DTOs**
```
backend/src/main/java/com/movieapp/dto/request/YourRequest.java
backend/src/main/java/com/movieapp/dto/response/YourResponse.java
```

**4. Create Service**
```
backend/src/main/java/com/movieapp/service/YourService.java
```

**5. Create Controller**
```
backend/src/main/java/com/movieapp/controller/YourController.java
```

**6. Write Tests**
```
backend/src/test/java/com/movieapp/controller/YourControllerTest.java
```

## 📚 Best Practices

### 1. **Use DTOs**
```java
// ❌ Bad
@GetMapping
public List<User> getUsers() { }

// ✅ Good
@GetMapping
public List<UserResponse> getUsers() { }
```

### 2. **Exception Handling**
```java
// ❌ Bad
throw new RuntimeException("User not found");

// ✅ Good
throw new ResourceNotFoundException("User not found");
```

### 3. **Constants**
```java
// ❌ Bad
if (authHeader.startsWith("Bearer ")) { }

// ✅ Good
if (authHeader.startsWith(Constants.JWT_PREFIX)) { }
```

### 4. **Validation**
```java
// ✅ Good
@PostMapping
public ResponseEntity<UserResponse> create(@Valid @RequestBody UserRequest request) { }
```

## 🔒 Security Notes

- JWT token expiration: 1 day (86400000 ms)
- CORS enabled for all origins (configure in production)
- Passwords hashed with BCrypt
- Stateless session management

## 📦 Dependencies

- **Spring Boot 3.2.1**
- **Java 17**
- **PostgreSQL** (hoặc MySQL)
- **Spring Security + JWT**
- **Lombok**
- **Swagger/OpenAPI**

## 🆘 Troubleshooting

### Build Issues
```bash
# Clear Maven cache
mvn clean

# Re-download dependencies
mvn dependency:resolve
```

### Database Connection
```
Check application.properties:
- spring.datasource.url
- spring.datasource.username
- spring.datasource.password
```

### CORS Issues
```
Update SecurityConfig.corsConfigurationSource()
Whitelist your frontend origin
```

## 📖 References

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [REST API Guidelines](https://restfulapi.net/)
