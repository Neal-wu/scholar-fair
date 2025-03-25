'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  country: string;
  university: string;
  department: string;
  position: string;
  defendant: string;
  reporter: string | null;
  createdAt: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  authorName: string | null;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch posts from API
    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search query
    const query = searchQuery.toLowerCase();
    const filtered = posts.filter(post => 
      post.country.toLowerCase().includes(query) ||
      post.university.toLowerCase().includes(query) ||
      post.department.toLowerCase().includes(query) ||
      post.defendant.toLowerCase().includes(query) ||
      (post.reporter && post.reporter.toLowerCase().includes(query)) ||
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12 relative">
          <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg transform -skew-y-2"></div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 relative">Scholar Fair</h1>
          <p className="text-gray-600 text-lg mb-2 relative">A Platform to Share Experience and Keep Scholar Fair</p>
          <p className="text-sm text-gray-500 relative">Your privacy and safety are our top priorities. All posts can be made anonymously.</p>
        </div>

        <div className="flex justify-end mb-8">
          <Link 
            href="/create-post" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-lg"
          >
            Share Your Experience
          </Link>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by country, university, department, defendant, or reporter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              {error}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No posts found. Try adjusting your search criteria.</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 mb-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                  <Link 
                    href={`/posts/${post.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    title="View and add comments"
                  >
                    <span className="inline-flex items-center space-x-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <span className="text-sm">{post.comments?.length || 0}</span>
                    </span>
                  </Link>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex items-center space-x-4 text-blue-700">
                    <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span className="font-medium">Defendant:</span> {post.defendant}
                    </span>
                    {post.reporter && (
                      <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span className="font-medium">Reporter:</span> {post.reporter}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-gray-500 space-x-2">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                      </svg>
                      {post.country}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      {post.university}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21h-14a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
                      </svg>
                      {post.department}
                    </span>
                  </div>
                </div>
                <time className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {new Date(post.createdAt).toLocaleDateString()}
                </time>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex items-center justify-end text-sm text-gray-500 border-t pt-4 mt-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                    {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
