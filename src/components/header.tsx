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
} from '@chakra-ui/core';
import { FaBriefcaseMedical, FaBars } from 'react-icons/fa';
import { useMedia } from 'react-use';
import { NavLink } from './nav-link';
import { getRouteProps } from '../utils/routes';
import { routesConfig } from '../config/routes';

const InlineMenu = () => {
  const allRoutes = React.useMemo(() => Object.keys(routesConfig), []);

  return (
    <Stack direction="row">
      {allRoutes.map((route: any) => {
        // @ts-ignore
        const name = routesConfig[route].name;

        if (name) {
          return <NavLink {...getRouteProps(route)}>{name}</NavLink>;
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
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const isWide = useMedia('(min-width: 800px)');

  return (
    <>
      <Box as="header" height={['60px', '80px']} shadow="sm" p="20px">
        <Stack direction="row" alignItems="center" height="100%">
          <Box>
            <NavLink {...getRouteProps('home')}>
              <FaBriefcaseMedical
                style={{
                  fill: theme.colors.green[500],
                  width: '30px',
                  height: '30px',
                }}
              />
            </NavLink>
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
