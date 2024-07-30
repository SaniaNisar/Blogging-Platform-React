import React, { useState } from 'react';
import { useGetPostsQuery } from '../features/api/blogPostsAPI';
import { Container, Form, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { data: posts, error, isLoading } = useGetPostsQuery();

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.query.value.toLowerCase());
  };

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(query)
  );

  return (
    <Container className="mt-4">
      <h1>Search Blog Posts</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            name="query"
            placeholder="Search by title"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Search
        </Button>
      </Form>

      {isLoading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">Error: {error.message}</Alert>}
      {filteredPosts && (
        <ListGroup>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <ListGroup.Item key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No posts found</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </Container>
  );
};

export default SearchBar;
