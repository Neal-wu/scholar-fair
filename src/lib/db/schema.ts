import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  comments: Comment[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  post: Post;
  createdAt: Date;
  updatedAt: Date;
}

export default prisma; 