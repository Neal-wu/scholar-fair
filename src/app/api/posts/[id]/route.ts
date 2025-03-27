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
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
      include: {
        comments: {
          where: {
            parentId: null, // Only fetch top-level comments
          },
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            replies: {
              include: {
                replies: {
                  include: {
                    replies: true
                  }
                }
              },
              orderBy: {
                createdAt: 'asc'
              }
            }
          }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch post', 
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 