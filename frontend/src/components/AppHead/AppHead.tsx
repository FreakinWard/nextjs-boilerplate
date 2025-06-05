import Head from 'next/head';

interface Props {
  title: string;
}

export default function AppHead({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
