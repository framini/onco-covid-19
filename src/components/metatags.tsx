import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type MetatagsProps = {
  title: string;
  description: string;
  url?: string;
  image?: string;
};

export const Metatags = ({
  article = false,
  ...props
}: MetatagsProps & { article?: boolean }) => {
  const router = useRouter();
  const ogType = article ? 'article' : 'website';
  const url = props.url || router.asPath;
  const img = props.image || '/default.png';

  return (
    <Head>
      <title>{props.title}</title>
      <link href={url} rel="canonical"></link>
      <meta name="description" content={props.description}></meta>
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={img} />
    </Head>
  );
};
