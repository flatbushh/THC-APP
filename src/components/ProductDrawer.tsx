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
import { FC, useState } from "react";
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
import { useAuthContext } from "../context/AuthContext";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ThemeSwitch } from "./ThemeSwitch/ThemeSwitch";

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
    marginRight: `${drawerWidth}px`,
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
  selectedGenetics: string | null;
  selectedTerpen: string | null;
  filterElements: (
    key: FilterTypeKeys,
    value: number | number[] | GeneticsEnum | string
  ) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const ProductDrawer: FC<ProductDrawerType> = ({
  filterElements,
  selectedGenetics,
  open,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const theme = useTheme();

  /* tutaj wywolujemy klasyczny filter (wbudowana funkcja w js na arrayu) i spra+wdzamy czy terpen
  //   konkretnego produktu jest rowny terpenowi, ktory podalismy jako argument tej funkcji. Jesli tak to go zwracamy, jesli nie
  //   to jest usuwany z arraya */

  //   /* podajemy nowa liste produktow do funkcji setProducts, ktora jest przekazywana jako props do tego
  //   komponentu, a oryginalnie jest wzieta z useState wewnatrz ProductsList. Robimy to po to, zeby spelniac zasady
  //   modyfikacji propsow. (one way data flow)*/

  // };

  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const userRole = localStorage.getItem("userRole");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: "flex", // Enable flexbox
            justifyContent: "flex-end", // Space between left and right items
            alignItems: "center", // Center items vertically
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
          <ThemeSwitch/>

            {/* Conditional rendering for Login and Register buttons */}
            {!localStorage.getItem("userId") &&
              !localStorage.getItem("token") && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </>
              )}

            {/* Conditional rendering for Admin Dashboard button */}
            {userRole === "ADMIN" && (
              <Button
                variant="contained"
                color="info"
                onClick={() => navigate("/dashboard")}
              >
                Admin Dashboard
              </Button>
            )}

            {/* Conditional rendering for Logout button */}
            {localStorage.getItem("userId") &&
              localStorage.getItem("token") && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
          </Box>

          {/* Move the drawer icon to the end of the toolbar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="end"
              sx={{ ml: 2 }}
            >
              <FilterAltIcon />
            </IconButton>
          </Box>
        </Toolbar>
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
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          {FILTER_NAMES.map((filter, index) => (
            <ListItem key={index}>
              <ListItemIcon>{switchTerpenIcon(filter)}</ListItemIcon>
              <Box sx={{ flexGrow: 1 }}></Box>
              {<Checkbox onChange={() => filterElements("terpen", filter)} />}
            </ListItem>
          ))}
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
                label="Indica"
                value={GeneticsEnum.INDICA}
                checked={selectedGenetics === GeneticsEnum.INDICA}
              />
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
                label="Sativa"
                value={GeneticsEnum.SATIVA}
                checked={selectedGenetics === GeneticsEnum.SATIVA}
              />
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
