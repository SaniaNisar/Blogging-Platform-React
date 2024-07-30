// src/reduxStore/store.js

import { configureStore } from '@reduxjs/toolkit';
import { blogPostsApi } from '../features/api/blogPostsAPI'; // Adjust the import path if needed

// Create the Redux store with RTK Query middleware
const store = configureStore({
  reducer: {
    [blogPostsApi.reducerPath]: blogPostsApi.reducer, // Add the blogPostsApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogPostsApi.middleware), // Add RTK Query middleware
});

export default store; // Default export
