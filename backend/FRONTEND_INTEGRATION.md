# Frontend Integration Guide

## 🔗 Backend Endpoint Configuration

### Update Your Frontend API Configuration

#### 1. Update API Base URL

**File:** `my-react-app/src/api/axios.js`

```javascript
// Before
const API_URL = "http://localhost:8000/api";

// After
const API_URL = "http://localhost:8080/api";
```

#### 2. Update Environment Variables

**File:** `my-react-app/.env` (create if not exists)

```env
# Backend API Configuration
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_AUTH_TIMEOUT=3600000
```

## 🔄 API Changes

### Authentication Endpoints

#### Before
```javascript
POST /api/auth/register
// Response: { token: "...", message: "..." }
```

#### After
```javascript
POST /api/auth/register
// Response: {
//   token: "...",
//   message: "Registration successful",
//   username: "testuser",
//   userId: 1
// }
```

**Update Code:**
```javascript
const handleRegister = async (userData) => {
  const response = await axios.post('/auth/register', {
    username: userData.username,
    password: userData.password,
    email: userData.email  // Now supports email
  });
  
  const { token, userId } = response.data;
  // Use both token and userId
};
```

### Movie Endpoints

#### New Endpoints
```javascript
// Get movie by ID
GET /api/movies/1

// Search movies
GET /api/movies/search?keyword=matrix

// Filter by genre
GET /api/movies/genre/Action

// Filter by year
GET /api/movies/year/2020

// Create movie (admin)
POST /api/movies
```

**Update Code:**
```javascript
// Search movies
const searchMovies = async (keyword) => {
  const response = await axios.get(`/movies/search?keyword=${keyword}`);
  return response.data;
};

// Get movie by genre
const getMoviesByGenre = async (genre) => {
  const response = await axios.get(`/movies/genre/${genre}`);
  return response.data;
};
```

### Favorites Endpoints

#### Updated Parameters
```javascript
// Before
POST /api/favorites?movieId=550&title=Fight%20Club&posterPath=https://...

// After - Same, but response includes userId info
POST /api/favorites?movieId=550&title=Fight%20Club&posterPath=https://...
// Response includes: { id, movieId, title, posterPath }
```

**New Endpoints:**
```javascript
// Check if favorite
GET /api/favorites/check?movieId=550
// Response: true/false

// Count total favorites
GET /api/favorites/count
// Response: 5
```

**Update Code:**
```javascript
// Add to favorites with error handling
const addToFavorites = async (movieId, title, posterPath) => {
  try {
    const response = await axios.post(
      '/favorites',
      null,
      {
        params: { movieId, title, posterPath },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      console.log('Already in favorites');
    }
    throw error;
  }
};

// Check if movie is favorite
const isFavorite = async (movieId) => {
  const response = await axios.get(
    `/favorites/check?movieId=${movieId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; // Returns boolean
};

// Get favorite count
const getFavoriteCount = async () => {
  const response = await axios.get(
    '/favorites/count',
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; // Returns number
};
```

## 🛡️ Error Handling

### New Error Response Format

All errors now return standardized format:
```json
{
  "status": 400,
  "message": "Detailed error message",
  "error": "Error Type",
  "timestamp": "2024-03-12T10:30:00",
  "path": "/api/endpoint"
}
```

**Update Error Handling:**
```javascript
// Before
catch (error) {
  console.log(error.response.data);
}

// After
catch (error) {
  const errorData = error.response?.data;
  console.log(errorData?.message); // "Detailed error message"
  console.log(errorData?.error);   // "Invalid Credentials"
  console.log(errorData?.status);  // 401
}
```

## 🔐 Authentication Flow

### Updated Token Validation

```javascript
// New validation endpoint
const validateToken = async (token) => {
  const response = await axios.post(
    '/auth/validate',
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; // Returns boolean
};

// Updated login flow
const handleLogin = async (username, password) => {
  try {
    const response = await axios.post('/auth/login', {
      username,
      password
    });
    
    const { token, userId, username: returnedUsername } = response.data;
    
    // Store in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', returnedUsername);
    
    // Set default authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return { token, userId, username: returnedUsername };
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid username or password');
    }
    throw error;
  }
};
```

## 📱 Update Components

### Example: LoginPage Component

```javascript
// Before
const handleLogin = async () => {
  const response = await authService.login(username, password);
  const { token } = response;
  localStorage.setItem('token', token);
  // Navigate to dashboard
};

// After
const handleLogin = async () => {
  const response = await authService.login(username, password);
  const { token, userId, username: returnedUsername } = response;
  
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('username', returnedUsername);
  
  // Store in context
  setUser({ userId, username: returnedUsername, token });
  
  // Navigate to dashboard
};
```

### Example: MovieSearch Component

```javascript
// Before
const searchMovies = async (keyword) => {
  const response = await movieService.search(keyword);
  setMovies(response);
};

// After
const searchMovies = async (keyword) => {
  try {
    const response = await axios.get(
      `/api/movies/search?keyword=${keyword}`
    );
    setMovies(response.data);
  } catch (error) {
    console.error('Search failed:', error.response?.data?.message);
    setError(error.response?.data?.message || 'Failed to search movies');
  }
};
```

### Example: Favorites Component

```javascript
// Before
const addFavorite = async (movieId) => {
  await favoriteService.addFavorite(movieId, title, posterPath);
  // Refresh favorites
};

// After
const addFavorite = async (movieId, title, posterPath) => {
  try {
    const response = await axios.post(
      '/api/favorites',
      null,
      {
        params: { movieId, title, posterPath },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    // Add to local state
    setFavorites([...favorites, response.data]);
    setNotification('Added to favorites');
  } catch (error) {
    if (error.response?.status === 409) {
      setError('Already in your favorites');
    } else {
      setError(error.response?.data?.message || 'Failed to add favorite');
    }
  }
};

// Check if favorite when movie loads
useEffect(() => {
  const check = async () => {
    const isFav = await axios.get(
      `/api/favorites/check?movieId=${movieId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setIsFavorite(isFav.data);
  };
  check();
}, [movieId, token]);
```

## 🔄 Migration Checklist

- [ ] Update `API_URL` in axios configuration
- [ ] Update `.env` file with new backend URL
- [ ] Update login response handling
- [ ] Update registration response handling
- [ ] Update error handling throughout app
- [ ] Update favorites endpoints
- [ ] Update movie search endpoints
- [ ] Add userId to context/state management
- [ ] Update header/auth interceptor
- [ ] Test all API endpoints
- [ ] Remove old API calls if any
- [ ] Update error messages for users

## 🚀 Testing Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Test@123",
    "email": "test@example.com"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Test@123"
  }'

# Get movies (no auth needed)
curl -X GET http://localhost:8080/api/movies

# Search movies
curl -X GET "http://localhost:8080/api/movies/search?keyword=matrix"

# Add to favorites (requires token)
curl -X POST "http://localhost:8080/api/favorites?movieId=550&title=Fight%20Club" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. **Create collection:** Movie App API
2. **Add environment variables:**
   - `base_url`: http://localhost:8080/api
   - `token`: (will be set after login)
3. **Create requests:**
   - POST /auth/login → Pre-request script to save token
   - GET /movies
   - POST /favorites with token

### Using JavaScript/Fetch

```javascript
// Login and save token
const login = async () => {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'testuser',
      password: 'Test@123'
    })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};

// Get movies
const getMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies');
  return response.json();
};
```

## 📚 Resources

- [Migration Guide](./MIGRATION_GUIDE.md) - Backend changes
- [API Testing](./API_TESTING.md) - API documentation
- [Setup Guide](./SETUP.md) - Backend setup
- [Summary](./SUMMARY.md) - Project summary

## 🆘 Common Issues

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Backend is configured for CORS. Ensure:
- Backend is running on port 8080
- Frontend URL matches CORS configuration
- Credentials are included in requests

### 401 Unauthorized
```
"Invalid token"
```
**Solution:** 
- Check token is being sent in Authorization header
- Format: `Bearer <token>`
- Token might be expired

### 404 Not Found
```
"Resource not found"
```
**Solution:**
- Check API endpoint URL is correct
- Verify request parameters
- Check backend is running

## 📞 Support

For issues during integration:
1. Check [API_TESTING.md](./API_TESTING.md) for endpoint details
2. Review error response in browser DevTools
3. Verify backend is running: `curl http://localhost:8080/api/movies`
4. Check console logs for detailed errors
