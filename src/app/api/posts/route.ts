import { NextResponse } from 'next/server';
import prisma from '@/lib/db/schema';

export async function GET() {
  try {
    // Get real posts from database
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        comments: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create the post with all required fields
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        country: body.country,
        university: body.university,
        department: body.department,
        position: body.position || 'Not Specified',
        defendant: body.defendant,
        reporter: body.reporter || null,
        tags: [], // Initialize with empty array
      },
      include: {
        comments: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // First delete all comments
    await prisma.comment.deleteMany({});
    // Then delete all posts
    await prisma.post.deleteMany({});
    
    return NextResponse.json({ message: 'All posts and comments deleted successfully' });
  } catch (error) {
    console.error('Error deleting posts:', error);
    return NextResponse.json({ error: 'Failed to delete posts' }, { status: 500 });
  }
} 