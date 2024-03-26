/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import BoltIcon from '@mui/icons-material/Bolt';
import GrassIcon from '@mui/icons-material/Grass';
import { Filter2Sharp, Filter2TwoTone } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Product } from './ProductsList';
import { TerpenEnum } from '../types/Terpen';
import { switchTerpenIcon } from '../utils/switchTerpenIcon';

const drawerWidth = 240;

const FILTER_NAMES = [TerpenEnum.CARIOPHILEN, TerpenEnum.LIMONEN, TerpenEnum.MIRCEN];

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 10,
    label: '10%',
  },
  {
    value: 20,
    label: '20%',
  },
  {
    value: 30,
    label: '30%',
  },
  {
    value: 40,
    label: '40%',
  },
];
function valuetext(value: number) {
  return `${value}%`;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type ProductDrawerType = {
    open: boolean,
    handleDrawerOpen:() => void,
    handleDrawerClose: () => void,
    products: Product[],
    setProducts: (products: Product[]) => void
}
export const ProductDrawer:React.FC<ProductDrawerType> =
({ open, handleDrawerOpen, handleDrawerClose, products, setProducts }) => {
  const theme = useTheme();

  const filterProducts = (terpen: TerpenEnum) => {
    const newList = products.filter((product) => product.terpen === terpen);
    /* tutaj wywolujemy klasyczny filter (wbudowana funkcja w js na arrayu) i spra+wdzamy czy terpen
    konkretnego produktu jest rowny terpenowi, ktory podalismy jako argument tej funkcji. Jesli tak to go zwracamy, jesli nie
    to jest usuwany z arraya */
    setProducts(newList); // DLACZEGO TU KORZYSTAMY Z SETPRODUCTS SKORO NIE MA TU USESTATE W TYM PLIKU ? PROPS
    /* podajemy nowa liste produktow do funkcji setProducts, ktora jest przekazywana jako props do tego
    komponentu, a oryginalnie jest wzieta z useState wewnatrz ProductsList. Robimy to po to, zeby spelniac zasady
    modyfikacji propsow. (one way data flow) NIE ROZUMIEM */
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Filtry
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {FILTER_NAMES.map((filter) =>
            <ListItem>
              <ListItemIcon>{switchTerpenIcon(filter)}</ListItemIcon>
              <ListItemText>{filter}</ListItemText>
              {/* w tym miejscu wywolujemy wbudowana funkcje map na arrayu
              FILTER_NAMES. Zwracamy sobie JSX.Element (html). Na Chekboxie wykorzystujac
              jego wbudowane propsy, wywolujemy nasza funkcje filterProducts na onChange i podajemy do niego nasz filter
              ktory jest tak na prawde nazwa terpenu jako argument */}
              <Checkbox onChange={() => filterProducts(filter)}/>
              {/* PRACA DOMOWA
              1. Zmienilismy lsay FILTER_NAMES, wiec przestala dzialac funkcja switchIcon - trzeba ja naprawic DONE

              2. Obecnie dziala filtrowanie produktow jak zaznaczynym checkbox, ale jak odznaczymy to nie wraca do stanu pierwotnego
              Musimy rozwinac funkcje filterProducts i dac jakis warunek, ktory bedzie nam sprawdzal czy zaznaczamy czy odznaczamy
              i jesli odznaczamy to przywrocic liste. Co moze byc pomocne:
              - mozemy filtorwac zawsze po STATIC_PRODUCTS, ale nadal jakos musimy przekminic czy odznaczylismy czy zaznaczylismy
              - moze byc pomocne array.every()
              - mozemy zrobic useState na filtry i odpalac funkcje filterProducts np w useEffecie jak zmieni sie filtr ***
              */}
            </ListItem>
          )}

        </List>

        <List className='producent'>

          <ListItem>
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField id="outlined-basic" label="Producent" variant="outlined" />

            </Box>
          </ListItem>
        </List>

        <List className='genetyka'>
          <ListItem>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Indica" />
              <FormControlLabel control={<Checkbox />} label="Sativa" />

            </FormGroup>
          </ListItem>
        </List>

        <List className='thc level'>
          <ListItem>
            <Box sx={{ width: 300 }}>
              <Slider min={0} max={40}

                aria-label="Custom marks"
                defaultValue={20}
                getAriaValueText={valuetext}
                step={5}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </Box>
          </ListItem>
        </List>

        <List className='cbd level'>
          <ListItem>
            <Box sx={{ width: 300 }}>
              <Slider min={0} max={40}

                aria-label="Custom marks"
                defaultValue={20}
                getAriaValueText={valuetext}
                step={5}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </Box>
          </ListItem>
        </List>

        {/*
        Tutaj mozesz zrobic drugi list z filtrami dotyczacymi np po: (DONE)
        - genetics
        - thc level (tu moze byc slider z MUI https://mui.com/material-ui/react-slider/)
        - cbd level (tu tez slider)
        - producent (tu zwykly textowy input moze byc)

        - learn git branching: https://learngitbranching.js.org/?locale=pl
        - zalozyc konto na github (DONE)
        - zainstalowac git lokalnie https://git-scm.com/download/mac (DONE)
        */}
      </Drawer>

    </Box>
  );
};