import api from "./api";

// Get paginated posts feed
export const getPosts = async (page = 1, limit = 10, visibility = null) => {
  try {
    const params = { page, limit };
    if (visibility) params.visibility = visibility;

    const response = await api.get("/posts", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single post by ID
export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create new post (supports text and/or media)
export const createPost = async (formData) => {
  try {
    const response = await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update post (owner only)
export const updatePost = async (postId, data) => {
  try {
    const response = await api.put(`/posts/${postId}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete post (owner only)
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Toggle like on post
export const toggleLike = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Add comment to post
export const addComment = async (postId, content) => {
  try {
    const response = await api.post(`/posts/${postId}/comment`, { content });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete comment (owner only)
export const deleteComment = async (postId, commentId) => {
  try {
    const response = await api.delete(`/posts/${postId}/comment/${commentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Share/repost a post
export const sharePost = async (postId, content = "") => {
  try {
    const response = await api.post(`/posts/${postId}/share`, { content });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
