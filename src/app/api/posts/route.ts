import { NextResponse } from 'next/server';

export interface PostType {
  id: number;
  title: string;
}

export async function GET() {
  const url = 'https://my-json-server.typicode.com/typicode/demo/posts';

  const postsData = await fetch(url).then(res => res.json());

  return NextResponse.json(postsData);
}
