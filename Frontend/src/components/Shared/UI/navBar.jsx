import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, RecentActors as UserIcon, ShoppingBag as ProductIcon, AutoAwesomeMotion as CategoryIcon, Assessment as ReportIcon, Upload as UploadIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

const mainIcons  = [UserIcon, ProductIcon, CategoryIcon];
const secondaryIcons = [ReportIcon, UploadIcon];

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              { marginRight: 5 },
              open && { display: 'none' }
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component={Link} to='/' sx={{ color: 'inherit', textDecoration: 'none' }}>
            Full Stack(PERN) : CRUD | Bulk Upload | Generate Report 
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
            {['User', 'Category', 'Product'].map((text, index) => {
                const IconComp = mainIcons[index]; 
                const whereTo = `/${text.toLowerCase()}`;
                return (
                <ListItem key={text} disablePadding sx={{ display: 'block', color: 'inherit', textDecoration: 'none'}} component={Link} to={whereTo}>
                    <ListItemButton
                    sx={[
                        { minHeight: 48, px: 2.5 },
                        open ? { justifyContent: 'initial' } : { justifyContent: 'center' }
                    ]}
                    >
                    <ListItemIcon
                        sx={[
                        { minWidth: 0, justifyContent: 'center' },
                        open ? { mr: 3 } : { mr: 'auto' }
                        ]}
                    >
                        <IconComp />
                    </ListItemIcon>
                    <ListItemText primary={text} sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
                    </ListItemButton>
                </ListItem>
                );
            })}
        </List>

        <Divider />
        <List>
          {['Bulk Upload', 'Report Generation'].map((text, index) => {
            const IconComp = secondaryIcons[index]; 
            const whereTo = '/' + text.split(' ').map((word, index) => {
                    return index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }).join(''); 

            return (
            <ListItem key={text} disablePadding sx={{ display: 'block', color: 'inherit', textDecoration: 'none' }} component={Link} to={whereTo}>
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open ? { justifyContent: 'initial' } : { justifyContent: 'center' }
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 3 } : { mr: 'auto' }
                  ]}
                >
                  <IconComp />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}