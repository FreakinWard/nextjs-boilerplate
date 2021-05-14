export interface Post {
  id: number;
  title: string;
}

export async function fetchPosts() {
  const url = 'http://my-json-server.typicode.com/typicode/demo/posts';
  const response = await fetch(url);
  return await response.json();
}
