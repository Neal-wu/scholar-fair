'use client';
import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  content: string;
  authorName: string | null;
  createdAt: string;
  replies?: Comment[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  country: string;
  university: string;
  department: string;
  defendant: string;
  reporter: string | null;
  createdAt: string;
  comments: Comment[];
}

interface CommentFormProps {
  onSubmit: (content: string, parentId?: string) => Promise<void>;
  parentId?: string;
  onCancel?: () => void;
}

function CommentForm({ onSubmit, parentId, onCancel }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim(), parentId);
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder={parentId ? "Write a reply..." : "Write a comment..."}
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : parentId ? 'Reply' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
}

function CommentThread({ comment, onReply }: { comment: Comment; onReply: (content: string, parentId: string) => Promise<void> }) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="space-y-4">
      <div className="border-b pb-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{comment.authorName || 'Anonymous'}</span>
          <span className="mx-2">•</span>
          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-700">{comment.content}</p>
        <button
          onClick={() => setIsReplying(true)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Reply
        </button>
      </div>

      {isReplying && (
        <div className="ml-8">
          <CommentForm
            onSubmit={async (content) => {
              await onReply(content, comment.id);
              setIsReplying(false);
            }}
            parentId={comment.id}
            onCancel={() => setIsReplying(false)}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 space-y-4">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    }
  };

  const handleCommentSubmit = async (content: string, parentId?: string) => {
    try {
      const response = await fetch(`/api/posts/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          authorName: 'Anonymous',
          parentId,
        }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const comment = await response.json();
      
      // Fetch the updated post to get the correct comment structure
      await fetchPost();
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Failed to post comment');
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-gray-600"><span className="font-medium">Country:</span> {post.country}</p>
              <p className="text-gray-600"><span className="font-medium">University:</span> {post.university}</p>
              <p className="text-gray-600"><span className="font-medium">Department:</span> {post.department}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600"><span className="font-medium">Defendant:</span> {post.defendant}</p>
              {post.reporter && (
                <p className="text-gray-600"><span className="font-medium">Reporter:</span> {post.reporter}</p>
              )}
              <p className="text-gray-600"><span className="font-medium">Posted on:</span> {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Comments</h2>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span>{post.comments?.length || 0} comments</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Share your thoughts</h3>
            <CommentForm onSubmit={handleCommentSubmit} />
          </div>

          <div className="space-y-6">
            {post.comments?.map((comment) => (
              <CommentThread
                key={comment.id}
                comment={comment}
                onReply={handleCommentSubmit}
              />
            ))}
            {post.comments?.length === 0 && (
              <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 