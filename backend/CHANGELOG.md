# CHANGELOG

## [0.0.1-SNAPSHOT] - 2024-03-12

### 🆕 Added
- Complete backend restructuring with scalable architecture
- Package reorganization from `com.movieapp.backend` to `com.movieapp`
- DTOs (Data Transfer Objects) for request/response handling
- Global exception handler with custom exceptions:
  - `ResourceNotFoundException`
  - `InvalidCredentialsException`
  - `DuplicateUserException`
- Enhanced security configuration with CORS support
- Constants utility class for centralized configuration
- Response and Validation utility classes
- Multiple environment files (dev, prod, test)
- Database migration scripts
- Comprehensive documentation:
  - SETUP.md - Installation guide
  - API_TESTING.md - API endpoint documentation
  - MIGRATION_GUIDE.md - Migration details
  - STRUCTURE.md - Project structure

### 🔄 Changed
- Improved models with Lombok annotations (`@Data`, `@NoArgsConstructor`)
- Enhanced repositories with better query methods
- Refactored services with better error handling
- Updated controllers with proper HTTP status codes
- Improved JWT handling in security layer
- Added database constraints and indexes

### 🐛 Fixed
- Fixed package naming inconsistencies
- Corrected controller routing annotations
- Improved exception handling in all layers
- Fixed CORS configuration

### 📦 Dependencies
- Spring Boot 3.2.1
- Java 17
- PostgreSQL driver
- JWT (jjwt) 0.11.5
- Lombok (code generation)
- SpringDoc OpenAPI (Swagger)

### 📚 Documentation
- API_TESTING.md - Complete API endpoint testing guide
- SETUP.md - Installation and configuration guide
- MIGRATION_GUIDE.md - Detailed migration from old structure
- README.md - Project overview

### 🏗️ Architecture
- Layered architecture: Controller → Service → Repository → Model
- Separation of concerns with DTOs
- Centralized exception handling
- Configuration-driven setup
- Environment-based profiles

## Security Features
- JWT token-based authentication
- BCrypt password encryption
- CORS configuration
- CSRF protection disabled (stateless)
- Role-based access control placeholder

## API Endpoints
### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user
- POST `/api/auth/validate` - Validate token

### Movies
- GET `/api/movies` - List all movies
- GET `/api/movies/{id}` - Get movie details
- GET `/api/movies/search` - Search movies
- GET `/api/movies/genre/{genre}` - Filter by genre
- GET `/api/movies/year/{year}` - Filter by year
- POST `/api/movies` - Create movie (admin)
- PUT `/api/movies/{id}` - Update movie (admin)
- DELETE `/api/movies/{id}` - Delete movie (admin)

### Favorites
- GET `/api/favorites` - Get user favorites
- POST `/api/favorites` - Add to favorites
- DELETE `/api/favorites` - Remove from favorites
- GET `/api/favorites/check` - Check if favorite
- GET `/api/favorites/count` - Count favorites

### Genres
- GET `/api/genres` - List all genres
- GET `/api/genres/{id}` - Get genre details
- GET `/api/genres/name/{name}` - Get by name
- POST `/api/genres` - Create genre (admin)
- PUT `/api/genres/{id}` - Update genre (admin)
- DELETE `/api/genres/{id}` - Delete genre (admin)

### Users
- GET `/api/users/{id}` - Get user details
- GET `/api/users/username/{username}` - Get by username
- GET `/api/users` - List all users (admin)
- PUT `/api/users/{id}` - Update user profile
- DELETE `/api/users/{id}` - Delete user

## Database Schema
- **users** - User account information
- **movies** - Movie catalog
- **genres** - Movie genres/categories
- **episodes** - TV series episodes
- **favorites** - User favorite movies

## Environment Configuration
- `application.properties` - Default configuration
- `application-dev.properties` - Development settings
- `application-prod.properties` - Production settings
- `.env` - Environment variables

## Next Steps
1. Update frontend API calls to use new endpoint format
2. Implement role-based access control
3. Add Swagger/OpenAPI documentation UI
4. Implement pagination for list endpoints
5. Add caching layer for performance
6. Implement file upload service
7. Add comprehensive test suite
8. Deploy to cloud platform
