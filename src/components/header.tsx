import React from 'react';
import {
  Box,
  Stack,
  useTheme,
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
  Text,
} from '@chakra-ui/core';
import { FaBars } from 'react-icons/fa';
import { useMedia } from 'react-use';
import { NavLink } from './nav-link';
import { Link } from './link';
import { getRouteProps, isRouteActive } from '../utils/routes';
import { routesConfig } from '../config/routes';
import Logo from '../assets/svg/logo.svg';
import LogoText from '../assets/svg/logo-text.svg';
import { useRouter } from 'next/dist/client/router';

const InlineMenu = () => {
  const allRoutes = React.useMemo(() => Object.keys(routesConfig), []);
  const router = useRouter();

  return (
    <Stack direction="row" spacing={10}>
      {allRoutes.map((route: any) => {
        // @ts-ignore
        const name = routesConfig[route].name;
        const routeProps = getRouteProps(route);

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
}

const DrawerMenu = React.memo(
  ({ isOpen, onClose, finalFocusRef }: DrawerMenuProps) => {
    const allRoutes = React.useMemo(() => Object.keys(routesConfig), []);

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
              <List>
                {allRoutes.map((route: any) => {
                  // @ts-ignore
                  const name = routesConfig[route].name;

                  if (name) {
                    return (
                      <ListItem>
                        <NavLink {...getRouteProps(route)}>{name}</NavLink>
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

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const isWide = useMedia('(min-width: 800px)');

  return (
    <>
      <Box as="header" height={['60px', '80px']} shadow="sm" p="20px">
        <Stack direction="row" alignItems="center" height="100%">
          <Box>
            <Link {...getRouteProps('home')}>
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
              <InlineMenu></InlineMenu>
            </Stack>
          ) : (
            <Box marginLeft="auto">
              <Button
                leftIcon={FaBars}
                ref={btnRef}
                variantColor="teal"
                onClick={onOpen}
                variant="outline"
              >
                Menu
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
      {!isWide && (
        <DrawerMenu isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} />
      )}
    </>
  );
};
