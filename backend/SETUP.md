# Backend Setup & Installation Guide

## 🔧 Prerequisites

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:

### Required
- **Java 17** or higher: [Download](https://www.oracle.com/java/technologies/downloads/#java17)
- **Maven 3.8.1** or higher: [Download](https://maven.apache.org/download.cgi)
- **PostgreSQL 12** or higher: [Download](https://www.postgresql.org/download/)
- **Git**: [Download](https://git-scm.com/)

### Optional
- **Docker & Docker Compose** (for containerized setup)
- **Postman** (for API testing)
- **VS Code** or **IntelliJ IDEA** (IDE)

## 📥 Installation Steps

### 1. Clone Repository
```bash
git clone <repository-url>
cd webMovieReact/backend
```

### 2. Verify Prerequisites
```bash
# Check Java version
java -version
# Output: openjdk version "17.x.x"

# Check Maven version
mvn -version
# Output: Apache Maven 3.8.x

# Check PostgreSQL version
psql --version
# Output: psql (PostgreSQL) 12.x
```

### 3. Setup Database

#### Option A: Using PostgreSQL Client
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE movieapp;

# Exit
\q
```

#### Option B: Using pgAdmin GUI
1. Open pgAdmin
2. Right-click on "Databases" → Create → Database
3. Set name to `movieapp`
4. Click Save

### 4. Configure Environment Variables

```bash
# Copy template
cp .env.example .env

# Edit .env file with your values
vi .env
```

**Edit these variables:**
```properties
DB_URL=jdbc:postgresql://localhost:5432/movieapp
DB_USERNAME=postgres
DB_PASSWORD=lab
```

### 5. Build Project
```bash
# Build with Maven
mvn clean install

# Build output should end with:
# [INFO] BUILD SUCCESS
```

### 6. Run Application

#### Option A: Using Maven
```bash
# Run with default profile
mvn spring-boot:run

# Or with dev profile
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

#### Option B: Using JAR File
```bash
# Build JAR
mvn clean package

# Run JAR
java -jar target/backend-0.0.1-SNAPSHOT.jar

# Or with profile
java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

### 7. Verify Server is Running

```bash
# Check if server is running
curl http://localhost:8080/api/auth/validate

# Expected response: Authorization header missing, but server responds
```

## 🐳 Docker Setup (Optional)

### Using Docker Compose

1. **Install Docker & Docker Compose:**
   - [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Create docker-compose.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: movieapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: lab
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: .
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/movieapp
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: lab
    ports:
      - "8080:8080"

volumes:
  postgres_data:
```

3. **Run docker-compose:**
```bash
docker-compose up --build
```

## 📝 Configuration Files

### application.properties
Default configuration file
```properties
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/movieapp
```

### application-dev.properties
Development configuration
```properties
spring.jpa.hibernate.ddl-auto=create-drop
logging.level.com.movieapp=DEBUG
```

### application-prod.properties
Production configuration
```properties
spring.jpa.hibernate.ddl-auto=validate
logging.level.root=WARN
```

## 🗄️ Database Setup

### Automatic Schema Creation
When application starts, Hibernate automatically creates:
- `users` table
- `movies` table
- `genres` table
- `episodes` table
- `favorites` table

### Manual Schema Creation (if needed)
```bash
# Run SQL migration
psql -U postgres -d movieapp < src/main/resources/db/migration/V1__Initial_Schema.sql
```

### Verify Database
```bash
# Connect to database
psql -U postgres -d movieapp

# List tables
\dt

# Query data
SELECT * FROM users;
```

## ✅ Health Check

Once server is running, test these endpoints:

### 1. Server Health
```bash
curl http://localhost:8080/actuator/health
```

### 2. List Movies
```bash
curl http://localhost:8080/api/movies
```

### 3. List Genres
```bash
curl http://localhost:8080/api/genres
```

## 🛠️ Maven Commands

```bash
# Clean build artifacts
mvn clean

# Compile code
mvn compile

# Run tests
mvn test

# Build JAR file
mvn package

# Install locally
mvn install

# Build with specific profile
mvn clean package -Pprod

# Skip tests during build
mvn clean install -DskipTests

# View dependency tree
mvn dependency:tree

# Download sources
mvn dependency:sources
```

## 🐛 Troubleshooting

### Issue: Database Connection Failed
**Error:** `org.postgresql.util.PSQLException: Connection refused`

**Solution:**
```bash
# Check PostgreSQL is running
# On Windows (if using service)
net start postgresql-x64-12

# On macOS
brew services start postgresql

# On Linux
sudo systemctl start postgresql

# Verify connection
psql -U postgres -d movieapp
```

### Issue: Port 8080 Already in Use
**Error:** `Address already in use`

**Solution:**
```bash
# Find process using port 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :8080
kill -9 <PID>

# Or change port in application.properties
server.port=8081
```

### Issue: Build Failure - Missing Dependencies
**Error:** `Downloading from central: ...`

**Solution:**
```bash
# Clear Maven cache
rm -rf ~/.m2/repository

# Re-download dependencies
mvn dependency:resolve
```

### Issue: Java Version Mismatch
**Error:** `java.lang.UnsupportedClassVersionError`

**Solution:**
```bash
# Check Java version
java -version

# Set correct Java version or update JAVA_HOME
export JAVA_HOME=/path/to/java17
```

## 📚 Next Steps

1. **Review Structure**: See [STRUCTURE.md](STRUCTURE.md)
2. **Test APIs**: Follow [API_TESTING.md](API_TESTING.md)
3. **Read Migration Guide**: Check [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
4. **Understand Code**: Review code with IDE

## 🚀 Development Workflow

### Daily Development
```bash
# Start development server
mvn spring-boot:run

# In another terminal, run frontend
cd ../my-react-app
npm start

# Access application at http://localhost:3000
```

### Making Changes
```bash
# Files auto-reload with devtools
# Edit code and save
# Changes applied automatically

# If auto-reload fails, restart:
<Ctrl+C> to stop
mvn spring-boot:run
```

### Running Tests
```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=AuthControllerTest

# Run with coverage report
mvn test jacoco:report
```

## 📊 Useful Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Maven Documentation](https://maven.apache.org/guides/)
- [REST API Design Guidelines](https://restfulapi.net/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit pull request

## 📞 Support

If you encounter issues:
1. Check [Troubleshooting](#-troubleshooting) section
2. Review [logs](logs/) directory
3. Check server console output
4. Create GitHub issue with error details
