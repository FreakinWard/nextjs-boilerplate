// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// TODO: create endpoint to get some async data to then load on the page, like promotions
export default async (req, res) => {
  const url = 'http://my-json-server.typicode.com/typicode/demo/posts';
  const response = await fetch(url);
  const posts = await response.json();

  res.status(200).json(posts);
};
