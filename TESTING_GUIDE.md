# Testing Guide - Movie App

## Servers Status
- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:5175
- **Database**: PostgreSQL (localhost:5432, database: movieapp)

## Features Fixed

### 1. Register & Login - FIXED ✅
**Frontend Updates:**
- Added error messages display
- Added password validation (min 6 characters)
- Added confirm password field
- Loading states on buttons
- Better error handling with response messages

**Backend Updates:**
- Fixed JWT key size (256+ bits for HS256)
- Fixed JwtService extractExpiration() method
- Added /api/auth/me endpoint to get current user
- Added CORS configuration

### 2. Add Favorites - FIXED ✅
**Changes:**
- Fixed FavoriteController to extract user from JWT token header
- Now properly handles Authorization header with "Bearer {token}" format
- Added @CrossOrigin annotation for CORS support

## Testing Instructions

### Step 1: Register New User
1. Navigate to http://localhost:5175
2. Click "Register"
3. Fill in:
   - Username: `testuser`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Register" button
5. Should redirect to home page (auto-login)

### Step 2: Login
1. If not logged in, click "Login"
2. Enter credentials:
   - Username: `testuser`
   - Password: `password123`
3. Click "Login" button
4. Should redirect to home page

### Step 3: Add to Favorites
1. On home page, hover over any movie
2. Click the heart icon (❤️ for added, 🤍 for not added)
3. Should add/remove from favorites
4. Go to "Favorites" page to view all added favorites
5. Can remove from favorites by clicking heart on Favorites page

## API Endpoints

### Authentication
- `POST /api/auth/register?username=X&password=Y` - Register new user
- `POST /api/auth/login?username=X&password=Y` - Login and get JWT token
- `GET /api/auth/me` - Get current user (requires Bearer token)

### Favorites
- `GET /api/favorites` - Get all user favorites (requires Bearer token)
- `POST /api/favorites?movieId=X&title=Y&posterPath=Z` - Add favorite (requires Bearer token)
- `DELETE /api/favorites?movieId=X` - Remove favorite (requires Bearer token)
- `GET /api/favorites/check?movieId=X` - Check if movie is favorite (requires Bearer token)

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/genres` - Get all genres

## JWT Token Format
All protected endpoints require Authorization header:
```
Authorization: Bearer <token>
```

Where `<token>` is obtained from login/register response.

## Database Tables
- `users` - User accounts
- `movies` - Movie information
- `genres` - Movie genres
- `favorites` - User's favorite movies
- `episodes` - Episode information

## Common Issues & Solutions

### Issue: Login fails with "Invalid credentials"
**Solution**: Ensure username and password are correct. Check if user exists in database.

### Issue: Can't add to favorites
**Solution**: Make sure you are logged in (token in localStorage). Check browser console for JWT errors.

### Issue: "Invalid token" error
**Solution**: Token might be expired. Login again to get new token.

### Issue: CORS errors
**Solution**: Backend has CORS enabled for localhost:*. Make sure frontend and backend are on same machine.

## Running Servers

### Backend
```bash
cd my-react-app/src/backend
mvn spring-boot:run
```

### Frontend
```bash
cd my-react-app
npm run dev
```

### Database
PostgreSQL should be running. Check:
```bash
Get-Service -Name postgresql*
```
