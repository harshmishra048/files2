# LegacySphere Post System API - Postman Test Checklist

## Base URL
```
http://localhost:5000
```

## Prerequisites
1. MongoDB must be running
2. Server must be running (`cd server && node server.js`)
3. You need a registered user and valid JWT token

---

## 1. Authentication Setup (Get Token First)

### Register a Test User
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student",
    "university": "Harvard University",
    "department": "Computer Science"
  }
  ```
- **Expected Response:** 201 Created
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { ... }
  }
  ```

### Login
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:** 200 OK
- **Action:** Copy the `token` value for next requests

---

## 2. Post CRUD Operations

### A. Create Text-Only Post
- **Method:** POST
- **URL:** `http://localhost:5000/api/posts`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body (raw JSON):**
  ```json
  {
    "content": "This is my first post on LegacySphere! 🎉",
    "visibility": "public"
  }
  ```
- **Expected Response:** 201 Created
- **Verify:**
  - ✅ `success: true`
  - ✅ Post has `_id`, `author`, `content`, `createdAt`
  - ✅ Author fields populated (fullName, avatar, role, university)

### B. Create Post with Media Upload
- **Method:** POST
- **URL:** `http://localhost:5000/api/posts`
- **Headers:**
  ```
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body (form-data):**
  ```
  content: "Check out this amazing photo! 📸"
  visibility: public
  media: [Upload 1-10 image/video/document files]
  ```
- **Expected Response:** 201 Created
- **Verify:**
  - ✅ `media` array contains objects with `url`, `type`, `filename`
  - ✅ `type` is one of: `image`, `video`, `document`

### C. Get Paginated Feed
- **Method:** GET
- **URL:** `http://localhost:5000/api/posts?page=1&limit=10`
- **Headers:**
  ```
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Expected Response:** 200 OK
- **Verify:**
  - ✅ `data` array of posts
  - ✅ `pagination` object with `currentPage`, `totalPages`, `hasMore`, `totalPosts`
  - ✅ Posts sorted by `createdAt` descending (newest first)
  - ✅ Author details populated

### D. Get Single Post
- **Method:** GET
- **URL:** `http://localhost:5000/api/posts/:postId`
- **Headers:**
  ```
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Expected Response:** 200 OK
- **Verify:**
  - ✅ Single post object with all details
  - ✅ Comments populated (if any)
  - ✅ 404 if post doesn't exist

### E. Update Post (Owner Only)
- **Method:** PUT
- **URL:** `http://localhost:5000/api/posts/:postId`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body (raw JSON):**
  ```json
  {
    "content": "Updated content for my post",
    "visibility": "university-only"
  }
  ```
- **Expected Response:** 200 OK
- **Verify:**
  - ✅ Content updated successfully
  - ✅ 403 if trying to update someone else's post

### F. Delete Post (Owner Only)
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/posts/:postId`
- **Headers:**
  ```
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Expected Response:** 200 OK
- **Verify:**
  - ✅ `message: "Post deleted successfully"`
  - ✅ Associated comments also deleted
  - ✅ Media files removed from uploads folder
  - ✅ 403 if trying to delete someone else's post

---

## 3. Post Interactions

### A. Toggle Like
- **Method:** POST
- **URL:** `http://localhost:5000/api/posts/:postId/like`
- **Headers:**
  ```
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Expected Response:** 200 OK
  ```json
  {
    "success": true,
    "data": {
      "liked": true,
      "likeCount": 1
    }
  }
  ```
- **Test Scenarios:**
  - ✅ First call: `liked: true`, count increases
  - ✅ Second call: `liked: false`, count decreases
  - ✅ Same user cannot like twice (toggle behavior)

### B. Add Comment
- **Method:** POST
- **URL:** `http://localhost:5000/api/posts/:postId/comment`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body (raw JSON):**
  ```json
  {
    "content": "Great post! I totally agree with this."
  }
  ```
- **Expected Response:** 201 Created
- **Verify:**
  - ✅ Comment created with `_id`, `author`, `content`, `createdAt`
  - ✅ Author details populated (fullName, avatar)
  - ✅ Comment reference added to post's `comments` array

### C. Delete Comment (Owner Only)
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/posts/:postId/comment/:commentId`
- **Headers:**
  ```
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Expected Response:** 200 OK
- **Verify:**
  - ✅ `message: "Comment deleted successfully"`
  - ✅ Comment removed from post's comments array
  - ✅ 403 if trying to delete someone else's comment

### D. Share/Repost
- **Method:** POST
- **URL:** `http://localhost:5000/api/posts/:postId/share`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Body (raw JSON - optional comment):**
  ```json
  {
    "content": "This is amazing! Everyone should see this."
  }
  ```
- **Expected Response:** 201 Created
- **Verify:**
  - ✅ New post created with `sharedFrom` pointing to original post
  - ✅ Original post's `shares` array includes current user
  - ✅ `sharedFrom` post is fully populated
  - ✅ Cannot share the same post twice (400 error)

---

## 4. Error Handling Tests

### A. Missing Token
- **Test:** Any protected route without `Authorization` header
- **Expected Response:** 401 Unauthorized
  ```json
  {
    "success": false,
    "message": "Unauthorized"
  }
  ```

### B. Invalid Token
- **Test:** Use `Authorization: Bearer invalid_token`
- **Expected Response:** 401 Unauthorized
  ```json
  {
    "success": false,
    "message": "Invalid Token"
  }
  ```

### C. Create Post Without Content or Media
- **Test:** POST `/api/posts` with empty body
- **Expected Response:** 400 Bad Request
  ```json
  {
    "success": false,
    "message": "Post must have either content or media"
  }
  ```

### D. Invalid File Type Upload
- **Test:** Upload .exe or unsupported file
- **Expected Response:** 400 Bad Request
  ```json
  {
    "success": false,
    "message": "Invalid file type. Only images, videos, and documents are allowed."
  }
  ```

### E. Post Not Found
- **Test:** GET `/api/posts/000000000000000000000000`
- **Expected Response:** 404 Not Found
  ```json
  {
    "success": false,
    "message": "Post not found"
  }
  ```

---

## 5. Advanced Test Scenarios

### A. Pagination Test
1. Create 15 posts
2. GET `/api/posts?page=1&limit=10` → Should return 10 posts, `hasMore: true`
3. GET `/api/posts?page=2&limit=10` → Should return 5 posts, `hasMore: false`

### B. Visibility Filter
1. Create posts with different visibilities
2. GET `/api/posts?visibility=public` → Only public posts
3. GET `/api/posts?visibility=university-only` → Only university posts

### C. Shared Post Rendering
1. Create original post (Post A)
2. Share Post A (creates Post B with `sharedFrom: Post A`)
3. GET Post B → Verify `sharedFrom` is fully populated with Post A's content and author

### D. Comment Cascade Delete
1. Create post
2. Add 3 comments
3. Delete the post
4. Verify all 3 comments are also deleted from database

---

## 6. Static File Access Test

### A. Access Uploaded Media
- **Method:** GET
- **URL:** `http://localhost:5000/uploads/filename-123456789.jpg`
- **Expected Response:** Image file served
- **Verify:**
  - ✅ File is accessible via browser or Postman
  - ✅ Correct Content-Type header

---

## Test Completion Checklist

- [ ] All 6 auth endpoints work (register, login, getMe)
- [ ] Create post (text only)
- [ ] Create post (with media upload)
- [ ] Get paginated feed
- [ ] Get single post
- [ ] Update post (owner only)
- [ ] Delete post (owner only)
- [ ] Toggle like (like/unlike)
- [ ] Add comment
- [ ] Delete comment (owner only)
- [ ] Share post (creates repost)
- [ ] Cannot share same post twice
- [ ] Pagination works correctly
- [ ] Visibility filter works
- [ ] 401 errors for missing/invalid tokens
- [ ] 403 errors for unauthorized actions
- [ ] 404 errors for non-existent resources
- [ ] Media files accessible via /uploads route
- [ ] Comment cascade delete works

---

## Notes

1. **Token Management:** In Postman, create an Environment variable `token` and update it after login:
   - In the login request's Tests tab, add:
     ```javascript
     pm.environment.set("token", pm.response.json().token);
     ```
   - Then use `{{token}}` in Authorization headers

2. **File Upload:** In Postman, select `form-data` body type, add key `media`, hover over the key and select `File` type from dropdown, then choose files.

3. **MongoDB Compass:** Use MongoDB Compass to visually verify data in `posts` and `comments` collections.

4. **Server Logs:** Monitor server console for detailed error messages and debug info.
