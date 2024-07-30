import React from 'react';
import { Link } from 'react-router-dom';
import { useGetPostsQuery } from '../features/api/blogPostsAPI';
import { Container, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';

const BlogList = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Blog Posts</h1>
      <Button variant="primary" href="/create" className="mb-3">Create New Post</Button>
      <ListGroup>
        {posts && posts.map((post) => (
          <ListGroup.Item key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default BlogList;
