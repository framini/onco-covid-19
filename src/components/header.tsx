import React from 'react';
import {
  Box,
  Stack,
  Drawer,
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  List,
  ListItem,
} from '@chakra-ui/core';
import { FaBars } from 'react-icons/fa';
import { useRouter } from 'next/router';

import { NavLink } from './nav-link';
import { Link } from './link';
import {
  getRouteProps,
  isRouteActive,
  getRoutePropsFromRouteDef,
} from '../utils/routes';
import Logo from '../assets/svg/logo.svg';
import LogoText from '../assets/svg/logo-text.svg';
import { useIsWide } from '../hooks/use-is-wide';
import { EntryLink } from '../types';

interface InlineMenuProps {
  items: EntryLink[];
}

const InlineMenu = (props: InlineMenuProps) => {
  const router = useRouter();

  return (
    <Stack direction="row" spacing={10}>
      {props.items.map((item: EntryLink) => {
        const name = item.fields.title;
        const routeProps = getRoutePropsFromRouteDef(item.fields.content);

        if (name) {
          return (
            <NavLink
              isActive={isRouteActive(routeProps, router.asPath)}
              {...routeProps}
            >
              {name}
            </NavLink>
          );
        }

        return null;
      })}
    </Stack>
  );
};

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  finalFocusRef: React.MutableRefObject<null>;
  items: EntryLink[];
}

const DrawerMenu = React.memo(
  ({ isOpen, onClose, finalFocusRef, items }: DrawerMenuProps) => {
    return (
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={finalFocusRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Stack as="nav">
              <List spacing={4}>
                {items.map((item: EntryLink) => {
                  const name = item.fields.title;

                  if (name) {
                    return (
                      <ListItem>
                        <NavLink
                          {...getRoutePropsFromRouteDef(item.fields.content)}
                        >
                          {name}
                        </NavLink>
                      </ListItem>
                    );
                  }

                  return null;
                })}
              </List>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  },
);

DrawerMenu.displayName = 'MobileMenu';

interface HeaderProps {
  menu?: EntryLink[];
}

export const Header = (props: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const isWide = useIsWide();

  return (
    <>
      <Box
        as="header"
        height={['60px', '80px']}
        shadow="sm"
        p="20px"
        position="relative"
        zIndex={1}
      >
        <Stack direction="row" alignItems="center" height="100%">
          <Box position="relative">
            <Link
              css={{ '&:focus': { boxShadow: 'none' } }}
              {...getRouteProps('home')}
            >
              <Stack
                as="span"
                spacing={isWide ? 4 : 2}
                direction="row"
                align="center"
              >
                <Box as="span">
                  <Logo
                    style={
                      isWide
                        ? {
                            width: '35px',
                          }
                        : {
                            width: '25px',
                          }
                    }
                  />
                </Box>
                <LogoText
                  style={
                    isWide
                      ? {
                          width: '140px',
                        }
                      : {
                          width: '100px',
                        }
                  }
                />
              </Stack>
            </Link>
          </Box>
          {isWide ? (
            <Stack alignItems="center" flexGrow={1}>
              {props.menu && <InlineMenu items={props.menu} />}
            </Stack>
          ) : (
            <Box marginLeft="auto">
              <Button
                leftIcon={FaBars}
                ref={btnRef}
                variantColor="gray"
                onClick={onOpen}
                variant="outline"
              >
                Menu
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
      {!isWide && props.menu && (
        <DrawerMenu
          items={props.menu}
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
        />
      )}
    </>
  );
};
