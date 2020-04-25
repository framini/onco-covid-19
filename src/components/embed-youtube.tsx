import React, { ReactNode } from 'react';
import { CircularProgress, Box, useTheme } from '@chakra-ui/core';
import { FaPlayCircle } from 'react-icons/fa';
import { LazyEmbed } from '@framini/react-lazy-embed';

interface EmbedOverlayProps {
  children: ReactNode;
}

const EmbedOverlay = (props: EmbedOverlayProps) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(33, 150, 243, 0.25)"
    >
      {props.children}
    </Box>
  );
};

const getVideoId = (tentativeUrl: string): string => {
  try {
    const url = new URL(tentativeUrl);

    let id;
    // @ts-ignore
    for (const [key, value] of url.searchParams.entries()) {
      if (key === 'v') {
        id = value;
      }
    }

    return id;
  } catch (e) {
    return '';
  }
};

interface EmbedYouTubeProps {
  uri: string;
}

export const EmbedYouTube = ({ uri }: EmbedYouTubeProps) => {
  const id = getVideoId(uri);
  const theme = useTheme();

  if (!id) {
    return null;
  }

  return (
    <LazyEmbed id={id}>
      {({ status, onActivate, iframe, thumbnail }) => {
        const showThumb = status === 'visible' || status === 'load';
        const showIframe = status === 'load' || status === 'loaded';

        return (
          <Box
            borderRadius="4px"
            overflow="hidden"
            backgroundColor="#000"
            style={
              showThumb
                ? {
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                  }
                : {}
            }
          >
            {showThumb && (
              <>
                <picture>
                  <source srcSet={thumbnail.webp} type="image/webp" />
                  <img src={thumbnail.jpg} />
                </picture>

                <EmbedOverlay>
                  {status === 'load' ? (
                    <CircularProgress
                      isIndeterminate
                      color="blue"
                    ></CircularProgress>
                  ) : (
                    <button onClick={onActivate}>
                      <FaPlayCircle
                        style={{
                          width: 60,
                          height: 60,
                          color: theme.colors.white,
                        }}
                      />
                    </button>
                  )}
                </EmbedOverlay>
              </>
            )}

            {showIframe && (
              <div
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
                  {...iframe}
                />
              </div>
            )}
          </Box>
        );
      }}
    </LazyEmbed>
  );
};
