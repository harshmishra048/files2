# LegacySphere Feed System - Testing Guide

## 🚀 Quick Start Testing

### Prerequisites
- Backend server running on http://localhost:5001 ✅
- Frontend client running on http://localhost:5173 ✅
- MongoDB connected ✅
- At least one registered user account

---

## 📝 Complete Test Flow

### Step 1: Login
1. Open http://localhost:5173
2. Navigate to Login page
3. Login with your credentials
4. Verify redirect to Home page

**Expected Result:**
- ✅ Redirected to `/home`
- ✅ Navbar visible with your avatar
- ✅ CreatePostCard visible
- ✅ Feed loading or showing empty state

---

### Step 2: Create Text-Only Post

1. In the CreatePostCard, type some text:
   ```
   Hello LegacySphere! This is my first post. 🎉
   ```

2. Select visibility: "Public"

3. Click "Post" button

**Expected Result:**
- ✅ Loading state shows "Posting..."
- ✅ Post appears at the top of the feed immediately
- ✅ Input clears after posting
- ✅ Post shows your avatar, name, role, university
- ✅ Timestamp shows "Just now"
- ✅ Like/Comment/Share buttons visible
- ✅ Stats show "0 likes, 0 comments, 0 shares"

---

### Step 3: Create Post with Image

1. Click the green **Image icon** (camera icon)
2. Select an image file (jpg, png, gif, webp)
3. Verify image preview appears
4. Add text: "Check out this amazing photo! 📸"
5. Click "Post"

**Expected Result:**
- ✅ Image preview shows before posting
- ✅ Post appears with both text and image
- ✅ Image displays properly in the feed
- ✅ Image can be clicked/viewed

---

### Step 4: Create Post with Video

1. Click the red **Video icon**
2. Select a video file (mp4, webm, mov)
3. Add text: "Watch this cool video!"
4. Click "Post"

**Expected Result:**
- ✅ Video preview shows (may show file icon before upload)
- ✅ Post appears with video player
- ✅ Video controls (play/pause) work
- ✅ Video plays when clicked

---

### Step 5: Create Post with Document

1. Click the blue **Document icon**
2. Select a PDF or document file
3. Add text: "Important document attached"
4. Click "Post"

**Expected Result:**
- ✅ Document shows as file icon with filename
- ✅ Post appears with document link
- ✅ Clicking document opens in new tab

---

### Step 6: Create Post with Multiple Media

1. Click Image icon, select 2-3 images
2. Verify all previews show
3. Remove one image using the X button
4. Add text: "Gallery post with multiple images"
5. Click "Post"

**Expected Result:**
- ✅ Multiple images show in grid layout
- ✅ Remove button works
- ✅ Post displays images in 2-column grid
- ✅ All images render properly

---

### Step 7: Like a Post

1. Find any post in the feed
2. Click the **Like** button (heart icon)

**Expected Result:**
- ✅ Heart icon fills with red color immediately (optimistic update)
- ✅ Like count increases by 1
- ✅ Button text/background changes to show "liked" state
- ✅ Clicking again unlikes (heart becomes outline)
- ✅ Like count decreases

---

### Step 8: Add Comment

1. Find any post
2. Click the **Comment** button
3. Comment section expands
4. Type in the comment input: "Great post! I totally agree."
5. Click the Send button (paper plane icon)

**Expected Result:**
- ✅ Comment section expands smoothly
- ✅ Comment input and send button visible
- ✅ After sending, comment appears immediately
- ✅ Comment shows your avatar and name
- ✅ Timestamp shows "Just now"
- ✅ Input clears after sending
- ✅ Comment count on post increases

---

### Step 9: Add Multiple Comments

1. Add 3-4 more comments to the same post
2. Verify all comments appear

**Expected Result:**
- ✅ All comments display in chronological order
- ✅ Each comment has proper styling
- ✅ Avatars render correctly
- ✅ Comment count updates correctly

---

### Step 10: Delete Own Comment

1. Hover over one of YOUR comments
2. Red trash icon should appear
3. Click the trash icon
4. Confirm deletion in the alert

**Expected Result:**
- ✅ Trash icon visible on hover (only for your own comments)
- ✅ Confirmation dialog appears
- ✅ Comment disappears after confirmation
- ✅ Comment count decreases
- ✅ Other users' comments don't show delete button

---

### Step 11: Character Counter

1. Open comment input on any post
2. Start typing a long comment
3. Watch the character counter

**Expected Result:**
- ✅ Counter shows "X/500" while typing
- ✅ Counter visible below input
- ✅ Max 500 characters enforced

---

### Step 12: Delete Own Post

1. Find one of YOUR posts
2. Click the **three dots menu** (⋮) in top right
3. Click "Delete Post"
4. Confirm deletion

**Expected Result:**
- ✅ Menu appears on click (only on your posts)
- ✅ "Delete Post" option shows
- ✅ Confirmation dialog appears
- ✅ Post disappears from feed immediately
- ✅ All comments associated with post are deleted
- ✅ Menu doesn't show on other users' posts

---

### Step 13: Test Pagination / Load More

1. Create 10+ posts (can be quick text posts)
2. Scroll to bottom of feed
3. Click "Load More" button

**Expected Result:**
- ✅ "Load More" button appears after initial posts
- ✅ Button shows "Loading..." when clicked
- ✅ More posts load and append to feed
- ✅ No duplicate posts
- ✅ When all posts loaded, shows "You've reached the end"

---

### Step 14: Test Empty State

**Method 1 - New User:**
1. Create a new user account
2. Login with new account
3. View home feed

**Method 2 - Delete All Posts:**
1. Delete all your posts
2. Refresh page

**Expected Result:**
- ✅ Shows empty state message
- ✅ Icon displays
- ✅ Message says "No posts yet"
- ✅ Suggests creating first post
- ✅ CreatePostCard still visible

---

### Step 15: Test Loading Skeletons

1. Clear browser cache or use incognito
2. Login
3. Observe feed while loading

**Expected Result:**
- ✅ Gray animated skeleton cards appear
- ✅ 3 skeleton cards show
- ✅ Skeletons have pulsing animation
- ✅ Skeletons replaced by actual posts when loaded

---

### Step 16: Test Responsive Design

**Mobile View (375px):**
1. Open DevTools (F12)
2. Toggle device toolbar
3. Select iPhone SE or similar
4. Test all features

**Expected Result:**
- ✅ Single column layout
- ✅ Left/right sidebars hidden
- ✅ CreatePostCard fits perfectly
- ✅ Posts display correctly
- ✅ Media images scale properly
- ✅ Comment section works
- ✅ No horizontal scroll

**Tablet View (768px):**
1. Select iPad or similar device
2. Test all features

**Expected Result:**
- ✅ Still single column (right sidebar hidden)
- ✅ Left sidebar may appear
- ✅ Everything functional

**Desktop View (1440px):**
1. Resize to large desktop
2. Test all features

**Expected Result:**
- ✅ Three column layout visible
- ✅ Left sidebar: user profile
- ✅ Center: feed
- ✅ Right sidebar: suggestions/trending

---

### Step 17: Test Dark Mode

1. Click the **Moon icon** in navbar
2. Verify everything switches to dark mode
3. Click **Sun icon** to switch back

**Expected Result:**
- ✅ Entire UI switches to dark theme
- ✅ All components have proper dark mode colors
- ✅ Text remains readable
- ✅ Images/media not affected
- ✅ Switches back to light mode smoothly
- ✅ Toggle icon changes (Moon ↔ Sun)

---

### Step 18: Test Logout

1. Click "Logout" button in navbar
2. Verify redirect

**Expected Result:**
- ✅ Redirected to login page
- ✅ Token removed from localStorage
- ✅ Cannot access /home without logging in
- ✅ Trying to access /home redirects to login

---

### Step 19: Test Protected Routes

1. Logout
2. Try to manually navigate to http://localhost:5173/home

**Expected Result:**
- ✅ Immediately redirected to /login
- ✅ Cannot access protected content without auth

---

### Step 20: Test Real-time Features

**Optimistic Updates:**
1. Like a post with slow network
2. Verify like appears instantly
3. If request fails, should rollback

**Expected Result:**
- ✅ Like shows immediately (optimistic)
- ✅ Works even with network delay
- ✅ Rollback on error (though rare)

---

## 🐛 Error Scenarios to Test

### Test 1: Empty Post
1. Try to post with no text and no media
2. Should show error

**Expected:** ❌ "Post must have either content or media"

### Test 2: File Too Large
1. Try to upload file > 50MB
2. Should show error

**Expected:** ❌ "File is too large. Max 50MB per file."

### Test 3: Too Many Files
1. Try to upload 11+ files
2. Should show error

**Expected:** ❌ "Maximum 10 files allowed"

### Test 4: Invalid File Type
1. Try to upload .exe or other invalid file
2. Should fail on backend

**Expected:** ❌ Backend rejects invalid file type

### Test 5: Network Error
1. Stop backend server
2. Try to create post
3. Should show error

**Expected:** ❌ Error message displays

### Test 6: Expired Token
1. Manually edit localStorage token to invalid value
2. Try to create post
3. Should redirect to login

**Expected:** ✅ Redirected to /login (401 handled)

---

## ✅ Feature Checklist

### Feed Display
- [ ] Posts load on page mount
- [ ] Posts show author info (avatar, name, role, university)
- [ ] Posts show relative timestamps
- [ ] Posts show content with proper formatting
- [ ] Posts show media (images/videos/documents)
- [ ] Posts show like/comment/share counts
- [ ] Empty state displays correctly
- [ ] Loading skeletons appear

### Create Post
- [ ] Text input expands on focus
- [ ] Media upload icons work
- [ ] Image preview shows
- [ ] Video preview shows
- [ ] Document preview shows
- [ ] Multiple files can be selected
- [ ] Files can be removed before posting
- [ ] Visibility selector works
- [ ] Validation works (empty post)
- [ ] Post button shows loading state
- [ ] Success: post appears at top
- [ ] Form clears after success

### Post Interactions
- [ ] Like button works (optimistic update)
- [ ] Unlike works (toggle)
- [ ] Like count updates correctly
- [ ] Heart fills/unfills on like/unlike
- [ ] Comment button expands comment section
- [ ] Share button present (ready for Phase 3C)

### Comments
- [ ] Comment section expands
- [ ] Comment input visible
- [ ] Can type and send comments
- [ ] Comments appear immediately
- [ ] Comment shows author info
- [ ] Comment shows timestamp
- [ ] Own comments have delete button
- [ ] Delete works with confirmation
- [ ] Comment count updates
- [ ] Character counter works (500 max)

### Post Management
- [ ] Own posts show menu (three dots)
- [ ] Delete option visible in menu
- [ ] Delete confirmation appears
- [ ] Post deletes successfully
- [ ] Post removed from feed
- [ ] Other users' posts don't show menu

### Pagination
- [ ] Initial posts load (10 default)
- [ ] "Load More" button appears
- [ ] Clicking loads more posts
- [ ] Loading state shows on button
- [ ] No duplicate posts
- [ ] "End of feed" message when done

### Responsive Design
- [ ] Mobile (375px): Single column, no sidebars
- [ ] Tablet (768px): Two columns max
- [ ] Desktop (1024px): Three columns
- [ ] Desktop (1440px): Full layout with all sidebars
- [ ] No horizontal scroll on any size
- [ ] Touch-friendly on mobile

### Dark Mode
- [ ] Toggle works
- [ ] All components switch themes
- [ ] Icons change (Moon ↔ Sun)
- [ ] Readable in both modes
- [ ] Persists across page views

### Authentication
- [ ] JWT token added to requests
- [ ] 401 errors handled (redirect to login)
- [ ] Logout works
- [ ] Protected routes work
- [ ] Can't access /home without auth

---

## 🎯 Performance Checks

- [ ] Images load without blocking UI
- [ ] Pagination smooth (no lag)
- [ ] Like/comment instant (optimistic)
- [ ] No memory leaks on navigation
- [ ] Smooth animations (skeletons, transitions)
- [ ] No console errors
- [ ] Fast initial page load

---

## 📊 Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 🎉 Success Criteria

All of the following should work flawlessly:

✅ Create posts with text, images, videos, documents
✅ View paginated feed
✅ Like/unlike posts (instant feedback)
✅ Add/delete comments
✅ Delete own posts
✅ Load more posts
✅ Responsive design (mobile/tablet/desktop)
✅ Dark mode toggle
✅ Empty state displays
✅ Loading states work
✅ Error handling works
✅ Protected routes work
✅ Logout works

---

## 🐛 Known Limitations (Phase 3C will add)

- Share functionality (button exists but not implemented yet)
- @mentions in comments (basic text only for now)
- Like count shows "You and X others" detail
- Repost rendering enhancements

---

## 📝 Notes

- All images must be < 50MB
- Max 10 files per post
- Comments max 500 characters
- Posts paginate 10 at a time
- Timestamps use relative format (e.g., "2m ago")
- Media URLs are served from http://localhost:5001/uploads/

---

**Ready to test!** Open http://localhost:5173 and go through the checklist! 🚀
