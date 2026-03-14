# API Testing Script

$baseUrl = "http://localhost:8080"

Write-Host "=== Testing Movie App APIs ===" -ForegroundColor Yellow

# 1. Test Register
Write-Host "`n1. Testing Register..." -ForegroundColor Green
$registerResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register?username=testuser123&password=password123" `
    -Method POST `
    -ErrorAction SilentlyContinue

if ($registerResponse) {
    Write-Host "✓ Register successful"
    Write-Host "Token: $($registerResponse.substring(0, 50))..."
    $token = $registerResponse
} else {
    Write-Host "✗ Register failed"
}

# 2. Test Login (if register failed)
if (-not $token) {
    Write-Host "`n2. Testing Login..." -ForegroundColor Green
    try {
        $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login?username=testuser123&password=password123" `
            -Method POST
        
        if ($loginResponse.token) {
            Write-Host "✓ Login successful"
            Write-Host "Token: $($loginResponse.token.substring(0, 50))..."
            $token = $loginResponse.token
        }
    } catch {
        Write-Host "✗ Login failed: $_"
    }
}

# 3. Test Get Movies (public endpoint)
Write-Host "`n3. Testing Get Movies (public)..." -ForegroundColor Green
try {
    $moviesResponse = Invoke-RestMethod -Uri "$baseUrl/api/movies" -Method GET
    Write-Host "✓ Get movies successful: $($moviesResponse.Count) movies"
} catch {
    Write-Host "✗ Get movies failed: $_"
}

# 4. Test Get Genres (public endpoint)
Write-Host "`n4. Testing Get Genres (public)..." -ForegroundColor Green
try {
    $genresResponse = Invoke-RestMethod -Uri "$baseUrl/api/movies/genres" -Method GET
    Write-Host "✓ Get genres successful: $($genresResponse.Count) genres"
} catch {
    Write-Host "✗ Get genres failed: $_"
}

# 5. Test Get Favorites (protected endpoint)
if ($token) {
    Write-Host "`n5. Testing Get Favorites (protected)..." -ForegroundColor Green
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
        }
        $favResponse = Invoke-RestMethod -Uri "$baseUrl/api/favorites" -Method GET -Headers $headers
        Write-Host "✓ Get favorites successful: $($favResponse.Count) favorites"
    } catch {
        Write-Host "✗ Get favorites failed: $($_.Exception.Response.StatusCode) - $_"
    }
} else {
    Write-Host "`n5. Skipping Get Favorites (no token)" -ForegroundColor Yellow
}

# 6. Test Add Favorite (protected endpoint)
if ($token) {
    Write-Host "`n6. Testing Add Favorite (protected)..." -ForegroundColor Green
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
        }
        $addFavResponse = Invoke-RestMethod -Uri "$baseUrl/api/favorites?movieId=550&title=Fight%20Club&posterPath=/test.jpg" `
            -Method POST `
            -Headers $headers
        Write-Host "✓ Add favorite successful"
    } catch {
        Write-Host "✗ Add favorite failed: $($_.Exception.Response.StatusCode) - $_"
    }
} else {
    Write-Host "`n6. Skipping Add Favorite (no token)" -ForegroundColor Yellow
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Yellow
