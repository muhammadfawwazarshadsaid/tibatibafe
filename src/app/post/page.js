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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-black mt-20">
        Temukan <span className="text-[#F52E6A]">Trip Impian</span></h1>
      <h1 className="text-3x1 font-regular text-black mt-5">Trip ke mana aja di tempat kamu berada</h1>
      <div className="flex items-center justify-center w-[598px] h-[82px] bg-gradient-to-r from-transparent to-white rounded-2xl mt-2 border-solid border-[4px] border-white ">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ceritakan trip seperti apa yang kamu cari"
            className="w-[353px] h-[58px] bg-gradient-to-r from-[#F8FFFA] to-[#F6F7F6] border-solid border-[2px] border-[#ECEEED] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#F52E6A] placeholder-[#64726B] placeholder:text-sm font-semibold"
        />
        <button
            onClick={handleSearch}
            disabled={loading}
            className="ml-2 w-[213px] h-[56px] bg-[#F52E6A] text-white font-semibold rounded-xl hover:bg-pink-600 disabled:bg-pink-300"
        >
            {loading ? 'Mencari...' : 'Mulai dengan AI'}
        </button>
      </div>


      
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <ul className="mt-8 w-full max-w-4xl">
        {posts.map(post => (
          <li key={post.post_id} className="bg-white p-6 mb-6 shadow-md rounded-md">
            {post.place_photo && (
              <img
                src={`data:image/jpeg;base64,${post.place_photo}`}
                alt="Place photo"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold text-gray-800">{post.place_city}</h2>
            <p className="text-gray-600">{post.place_description}</p>
            <p className="text-gray-600 mt-2">{post.post_caption}</p>
            <p className="text-sm text-gray-500 mt-2">{post.post_date}</p>
            <p className="text-sm text-gray-700 mt-2 font-medium">Posted by: {post.user_name}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Comments:</h3>
              <ul className="mt-2 space-y-4">
                {post.comments.map(comment => (
                  <li key={comment.comment_id} className="border-t pt-4">
                    <p className="text-gray-700">{comment.comment_text}</p>
                    <p className="text-sm text-gray-500 mt-1">By: {comment.user_name}</p>
                    <p className="text-sm text-gray-500">Date: {comment.comment_date}</p>
                    <p className="text-sm text-gray-500">Likes: {comment.likes}</p>
                  </li>
                ))}
              </ul>
            </div>
            {post.trip && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Trip Details:</h3>
                <p className="text-gray-600">Type: {post.trip.trip_type}</p>
                <p className="text-gray-600">Name: {post.trip.trip_name}</p>
                <p className="text-gray-600">Description: {post.trip.trip_description}</p>
                <p className="text-gray-600">Start Date: {post.trip.trip_start_date}</p>
                <p className="text-gray-600">End Date: {post.trip.trip_end_date}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostPage;
