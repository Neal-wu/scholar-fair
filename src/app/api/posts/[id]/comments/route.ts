import { NextResponse } from 'next/server';
import prisma from '@/lib/db/schema';

// Helper function to recursively include replies
const includeReplies = {
  include: {
    replies: {
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        replies: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            replies: true, // This will include up to 3 levels of replies
          },
        },
      },
    },
  },
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: params.id,
        parentId: null, // Only fetch top-level comments
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...includeReplies,
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        authorName: body.authorName || 'Anonymous',
        postId: params.id,
        parentId: body.parentId,
      },
      include: includeReplies.include,
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
} 