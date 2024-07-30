import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreatePostMutation, useUpdatePostMutation, useGetPostByIdQuery } from '../features/api/blogPostsAPI';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const [createPost, { isSuccess: isCreateSuccess, error: createError }] = useCreatePostMutation();
  const [updatePost, { isSuccess: isUpdateSuccess, error: updateError }] = useUpdatePostMutation();
  
  // Fetch existing post details if editing
  const { data: post } = useGetPostByIdQuery(id, { skip: !id });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      navigate('/'); // Navigate to home or posts list after success
    }
  }, [isCreateSuccess, isUpdateSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Update post
      updatePost({ id, title, body }).catch((err) => setError(err.message));
    } else {
      // Create new post
      createPost({ title, body }).catch((err) => setError(err.message));
    }
  };

  return (
    <Container className="mt-4">
      <h1>{id ? 'Edit Blog Post' : 'Create Blog Post'}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBody">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? 'Update Post' : 'Create Post'}
        </Button>
      </Form>
    </Container>
  );
};

export default BlogForm;
