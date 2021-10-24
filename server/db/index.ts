import { Post } from '../entities/Post';

let postId = 1;

const getId = (): string => {
  return String(postId++);
};

let posts = [
  {
    id: getId(),
    title: `First title`,
    createdAt: new Date(),
  },
  {
    id: getId(),
    title: `Second title`,
    createdAt: new Date(),
    description: 'Post description',
  },
  {
    id: getId(),
    title: 'Post title',
    createdAt: new Date(),
    description: 'Post description',
  },
  {
    id: getId(),
    title: 'Post title',
    createdAt: new Date(),
    description: 'Post description',
  },
  {
    id: getId(),
    title: 'Post title',
    createdAt: new Date(),
    description: 'Post description',
  },
];

export function getPosts(): Array<Post> {
  return posts;
}

export function getPostById(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

export function createPost(
  title: string,
  description: string | undefined = undefined
): Post {
  return {
    id: getId(),
    title,
    createdAt: new Date(),
    description,
  };
}

export function addPost(post: Post): void {
  posts.push(post);
}

export function updatePost(id: string, post: Post): void {
  const index = posts.findIndex((item) => item.id === id);

  if (index < 0) {
    return;
  }

  posts = [...posts.slice(0, index), post, ...posts.slice(index + 1)];
}

export function deletePost(id: string): boolean {
  const index = posts.findIndex((item) => item.id === id);

  if (index < 0) {
    return false;
  }

  posts = [...posts.slice(0, index), ...posts.slice(index + 1)];
  return true;
}
