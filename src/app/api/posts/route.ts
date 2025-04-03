import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get real posts from database
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        comments: true,
        attachments: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { title, content, country, university, department, position, defendant, reporter, attachments } = json;
    
    // Create the post with all required fields
    const post = await prisma.post.create({
      data: {
        title,
        content,
        country,
        university,
        department,
        position,
        defendant,
        reporter: reporter || null,
        attachments: {
          connect: attachments?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        attachments: true,
        comments: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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