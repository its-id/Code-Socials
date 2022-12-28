const API_ROOT = process.env.REACT_APP_API_URL;

export const API_URLS = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  createPost: () => `${API_ROOT}/posts/create`,
  createFriendship: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  friends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  toggleLike: (itemId, itemType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemType}`, // itemType is 'Post'/'Comment'
  getLikes: (itemId, itemType) =>
    `${API_ROOT}/likes?likeable_id=${itemId}&likeable_type=${itemType}`,
  comment: () => `${API_ROOT}/comments`, // POST - create, GET - list of comments
  deleteComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`,
  editUser: () => `${API_ROOT}/users/edit`,
  userInfo: (userId) => `${API_ROOT}/users/${userId}`,
  searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
};

export const LOCALSTORAGE_TOKEN_KEY =
  process.env.REACT_APP_LOCALSTORAGE_TOKEN_KEY; //using this key, we will store the token when user logs in
