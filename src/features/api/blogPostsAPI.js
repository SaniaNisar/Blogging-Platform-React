import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL for the API
const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

// Create an API slice using RTK Query
export const blogPostsApi = createApi({
  reducerPath: 'blogPostsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Endpoint to fetch all blog posts
    getPosts: builder.query({
      query: () => '',
    }),
    // Endpoint to fetch a single blog post by ID
    getPostById: builder.query({
      query: (id) => `/${id}`,
    }),
    // Endpoint to create a new blog post
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '',
        method: 'POST',
        body: newPost,
      }),
    }),
    // Endpoint to update an existing blog post
    updatePost: builder.mutation({
      query: (updatedPost) => ({
        url: `/${updatedPost.id}`,
        method: 'PUT',
        body: updatedPost,
      }),
    }),
    // Endpoint to delete a blog post by ID
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export the auto-generated hooks for each endpoint
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = blogPostsApi;

// Export the reducer to be included in the store
export default blogPostsApi.reducer;
