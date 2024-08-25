// src/app/post/page.js
"use client"
import { useState } from 'react';
import axios from 'axios';

const PostPage = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/search_posts/', {
        query: query
      });
      setPosts(response.data.posts);
    } catch (err) {
      setError('Failed to fetch posts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Posts</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.post_id}>
            <img src={`data:image/jpeg;base64,${post.place_photo}`} alt="Place photo" />
            <h2>{post.place_city}</h2>
            <p>{post.place_description}</p>
            <p>{post.post_caption}</p>
            <p>{post.post_date}</p>
            <p>Posted by: {post.user_name}</p>
            <div>
              <h3>Comments:</h3>
              <ul>
                {post.comments.map(comment => (
                  <li key={comment.comment_id}>
                    <p>{comment.comment_text}</p>
                    <p>By: {comment.user_name}</p>
                    <p>Date: {comment.comment_date}</p>
                    <p>Likes: {comment.likes}</p>
                  </li>
                ))}
              </ul>
            </div>
            {post.trip && (
              <div>
                <h3>Trip Details:</h3>
                <p>Type: {post.trip.trip_type}</p>
                <p>Name: {post.trip.trip_name}</p>
                <p>Description: {post.trip.trip_description}</p>
                <p>Start Date: {post.trip.trip_start_date}</p>
                <p>End Date: {post.trip.trip_end_date}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostPage;
