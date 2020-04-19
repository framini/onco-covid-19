import React from 'react';

interface EmbedYouTubeProps {
  uri: string;
}

export const EmbedYouTube = ({ uri }: EmbedYouTubeProps) => {
  const [id, setId] = React.useState(null);

  React.useEffect(() => {
    try {
      const url = new URL(uri);

      let id;
      // @ts-ignore
      for (const [key, value] of url.searchParams.entries()) {
        if (key === 'v') {
          id = value;
        }
      }

      if (id) {
        setId(id);
      }
    } catch (e) {}
  }, [uri]);

  if (!id) {
    return null;
  }

  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0,
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
      />
    </div>
  );
};
