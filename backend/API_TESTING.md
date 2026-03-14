# API Testing Guide

## 🧪 Testing Backend APIs

### Prerequisites
- Postman hoặc REST Client
- Backend running on `http://localhost:8080`
- Database configured

## 📝 Authentication Endpoints

### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "Test@123",
  "email": "test@example.com"
}

Response: 201 Created
{
  "token": "eyJhbGc...",
  "message": "Registration successful",
  "username": "testuser",
  "userId": 1
}
```

### 2. Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "Test@123"
}

Response: 200 OK
{
  "token": "eyJhbGc...",
  "message": "Login successful",
  "username": "testuser",
  "userId": 1
}
```

### 3. Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: 200 OK
"testuser"
```

### 4. Validate Token
```
POST /api/auth/validate
Authorization: Bearer <token>

Response: 200 OK
true
```

## 🎬 Movie Endpoints

### 1. Get All Movies
```
GET /api/movies

Response: 200 OK
[
  {
    "id": 1,
    "title": "The Matrix",
    "genre": "Science Fiction",
    "description": "A computer programmer discovers...",
    "posterPath": "https://...",
    "year": "1999"
  }
]
```

### 2. Get Movie by ID
```
GET /api/movies/1

Response: 200 OK
{
  "id": 1,
  "title": "The Matrix",
  "genre": "Science Fiction",
  "description": "A computer programmer discovers...",
  "posterPath": "https://...",
  "year": "1999"
}
```

### 3. Search Movies
```
GET /api/movies/search?keyword=matrix

Response: 200 OK
[
  {
    "id": 1,
    "title": "The Matrix",
    ...
  }
]
```

### 4. Get Movies by Genre
```
GET /api/movies/genre/Science%20Fiction

Response: 200 OK
[...]
```

### 5. Create Movie (Admin)
```
POST /api/movies
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "New Movie",
  "genre": "Action",
  "description": "Movie description",
  "posterPath": "https://...",
  "year": "2024"
}

Response: 200 OK
{
  "id": 5,
  "title": "New Movie",
  ...
}
```

### 6. Update Movie
```
PUT /api/movies/1
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Updated Title",
  "genre": "Action"
}

Response: 200 OK
{
  "id": 1,
  "title": "Updated Title",
  ...
}
```

### 7. Delete Movie
```
DELETE /api/movies/1
Authorization: Bearer <token>

Response: 204 No Content
```

## 💖 Favorites Endpoints

### 1. Get User Favorites
```
GET /api/favorites
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": 1,
    "movieId": "550",
    "title": "Fight Club",
    "posterPath": "https://..."
  }
]
```

### 2. Add to Favorites
```
POST /api/favorites?movieId=550&title=Fight%20Club&posterPath=https://...
Authorization: Bearer <token>

Response: 201 Created
{
  "id": 1,
  "movieId": "550",
  "title": "Fight Club",
  "posterPath": "https://..."
}
```

### 3. Remove from Favorites
```
DELETE /api/favorites?movieId=550
Authorization: Bearer <token>

Response: 204 No Content
```

### 4. Check if Movie is Favorite
```
GET /api/favorites/check?movieId=550
Authorization: Bearer <token>

Response: 200 OK
true
```

### 5. Count Favorites
```
GET /api/favorites/count
Authorization: Bearer <token>

Response: 200 OK
5
```

## 📂 Genre Endpoints

### 1. Get All Genres
```
GET /api/genres

Response: 200 OK
[
  {"id": 1, "name": "Action"},
  {"id": 2, "name": "Comedy"},
  ...
]
```

### 2. Get Genre by ID
```
GET /api/genres/1

Response: 200 OK
{"id": 1, "name": "Action"}
```

### 3. Get Genre by Name
```
GET /api/genres/name/Action

Response: 200 OK
{"id": 1, "name": "Action"}
```

### 4. Create Genre (Admin)
```
POST /api/genres
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "New Genre"
}

Response: 201 Created
{"id": 20, "name": "New Genre"}
```

## 👤 User Endpoints

### 1. Get User by ID
```
GET /api/users/1
Authorization: Bearer <token>

Response: 200 OK
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "role": "USER",
  "status": "active"
}
```

### 2. Get User by Username
```
GET /api/users/username/testuser
Authorization: Bearer <token>

Response: 200 OK
{
  "id": 1,
  "username": "testuser",
  ...
}
```

### 3. Get All Users (Admin)
```
GET /api/users
Authorization: Bearer <token>

Response: 200 OK
[...]
```

### 4. Update User
```
PUT /api/users/1
Content-Type: application/json
Authorization: Bearer <token>

{
  "email": "newemail@example.com",
  "role": "USER"
}

Response: 200 OK
{...}
```

### 5. Delete User
```
DELETE /api/users/1
Authorization: Bearer <token>

Response: 204 No Content
```

## 🐛 Error Handling

### Common Error Responses

**400 Bad Request**
```json
{
  "status": 400,
  "message": "Invalid request",
  "error": "Bad Request",
  "timestamp": "2024-03-12T10:30:00",
  "path": "/api/auth/register"
}
```

**401 Unauthorized**
```json
{
  "status": 401,
  "message": "Invalid username or password",
  "error": "Invalid Credentials",
  "timestamp": "2024-03-12T10:30:00",
  "path": "/api/auth/login"
}
```

**404 Not Found**
```json
{
  "status": 404,
  "message": "Movie not found with id: 999",
  "error": "Resource Not Found",
  "timestamp": "2024-03-12T10:30:00",
  "path": "/api/movies/999"
}
```

**409 Conflict**
```json
{
  "status": 409,
  "message": "Username already exists",
  "error": "Duplicate User",
  "timestamp": "2024-03-12T10:30:00",
  "path": "/api/auth/register"
}
```

## 🚀 Quick Testing with cURL

### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"Test@123","email":"test@example.com"}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"Test@123"}'
```

### Get Movies with Token
```bash
curl -X GET http://localhost:8080/api/movies \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 Testing Checklist

- [ ] User Registration
- [ ] User Login
- [ ] Get Current User
- [ ] Token Validation
- [ ] Get All Movies
- [ ] Search Movies
- [ ] Get Movies by Genre
- [ ] Add to Favorites
- [ ] Remove from Favorites
- [ ] Check if Favorite
- [ ] Get All Genres
- [ ] Error Handling (401, 404, 409)
- [ ] CORS Headers
