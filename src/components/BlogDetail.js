import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../features/api/blogPostsAPI';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

const BlogDetail = () => {
  const { id } = useParams();
  const { data: post, error, isLoading } = useGetPostByIdQuery(id);

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
      {post && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default BlogDetail;
