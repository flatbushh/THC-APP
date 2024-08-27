/* eslint-disable no-nested-ternary */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import BoltIcon from "@mui/icons-material/Bolt";
import GrassIcon from "@mui/icons-material/Grass";
import { Filter2Sharp, Filter2TwoTone } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FilterTypeKeys, FiltersType, Product } from "../Pages/ProductsList";
import { TerpenEnum } from "../types/Terpen";
import { switchTerpenIcon } from "../utils/switchTerpenIcon";
import { GeneticsEnum } from "../types/GeneticsEnum";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { geneticsFilters, terpenFilters } from "./checkboxFilterConfig";

const drawerWidth = 240;

const FILTER_NAMES = [
  TerpenEnum.CARIOPHILEN,
  TerpenEnum.LIMONEN,
  TerpenEnum.MIRCEN,
];

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 10,
    label: "10%",
  },
  {
    value: 20,
    label: "20%",
  },
  {
    value: 30,
    label: "30%",
  },
  {
    value: 40,
    label: "40%",
  },
];
function valuetext(value: number) {
  return `${value}%`;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type ProductDrawerType = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  selectedGenetics: GeneticsEnum | null;
  selectedTerpen: string | null;
  filterElements: (
    key: FilterTypeKeys,
    value: number | number[] | GeneticsEnum | string
  ) => void;
};

export const ProductDrawer: React.FC<ProductDrawerType> = ({
  filterElements,
  selectedGenetics,
  selectedTerpen,
  open,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const theme = useTheme();

  // const filterProducts = (terpen: TerpenEnum) => {
  //   const newList = products.filter((product) => product.terpen === terpen);
  //   /* tutaj wywolujemy klasyczny filter (wbudowana funkcja w js na arrayu) i spra+wdzamy czy terpen
  //   konkretnego produktu jest rowny terpenowi, ktory podalismy jako argument tej funkcji. Jesli tak to go zwracamy, jesli nie
  //   to jest usuwany z arraya */
  //   setProducts(newList);
  //   /* podajemy nowa liste produktow do funkcji setProducts, ktora jest przekazywana jako props do tego
  //   komponentu, a oryginalnie jest wzieta z useState wewnatrz ProductsList. Robimy to po to, zeby spelniac zasady
  //   modyfikacji propsow. (one way data flow) NIE ROZUMIEM */

  // };
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Filtry
          </Typography>
        </Toolbar>
        <Button variant="contained" onClick={() => navigate("/register")}>
          Register
        </Button>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          <ListItem>
            <FormGroup>
              {terpenFilters().map((filter) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) =>
                        filterElements(
                          "terpen",
                          event.target.value as TerpenEnum
                        )
                      }
                    />
                  }
                  label={switchTerpenIcon(filter.label)}
                  value={filter.value}
                  checked={selectedTerpen === filter.value}
                />
              ))}
            </FormGroup>
          </ListItem>
        </List>

        <List className="producent">
          <ListItem>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Producent"
                variant="outlined"
                onChange={(event) =>
                  filterElements("producentName", event.target.value)
                }
              />
            </Box>
          </ListItem>
        </List>

        <List className="genetyka">
          <ListItem>
            <FormGroup>
              {geneticsFilters().map((filter) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) =>
                        filterElements(
                          "genetics",
                          event.target.value as GeneticsEnum
                        )
                      }
                    />
                  }
                  label={filter.label}
                  value={filter.value}
                  checked={selectedGenetics === filter.value}
                />
              ))}
            </FormGroup>
          </ListItem>
        </List>

        <List className="thc level">
          <ListItem>
            <Box sx={{ width: 300 }}>
              <Slider
                min={0}
                max={40}
                getAriaLabel={() => "thcLevel"}
                defaultValue={[0, 40]}
                getAriaValueText={valuetext}
                step={5}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={(event, value) => filterElements("thcLevel", value)}
              />
            </Box>
          </ListItem>
        </List>

        <List className="cbd level">
          <ListItem>
            <Box sx={{ width: 300 }}>
              <Slider
                min={0}
                max={40}
                getAriaLabel={() => "cbdLevel"}
                defaultValue={[0, 40]}
                getAriaValueText={valuetext}
                step={5}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={(event, value) => filterElements("cbdLevel", value)}
              />
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};
