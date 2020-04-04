import { NextPageContext } from 'next';
import { Button } from '@chakra-ui/core';
import { Article } from '../types';

interface HomeProps {
  articles: Article[];
}

const Home = (props: HomeProps) => {
  console.log('props.articles', props.articles);

  return (
    <div className="container">
      <Button>Something</Button>
      <ul>
        {props.articles.map((article: Article) => {
          return <div>{article.fields.title}</div>;
        })}
      </ul>
    </div>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const { client } = require('../contentful/client');

  const entries = await client.getEntries({
    content_type: 'articulo',
  });

  return {
    props: {
      articles: entries.items,
    },
  };
}

export default Home;
