import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Drawer } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from "react";
import { useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';

export const Dashboard = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      
      <List>
        <ListItem>
                <ListItemButton onClick={() => navigate("/add-product")}> 
                     <ListItemIcon>
                     <AddCircleOutlineIcon/>
                     </ListItemIcon>
                     <ListItemText primary="Add Product" />       
            </ListItemButton>
        </ListItem>

        <Divider/>
      
        <ListItem>    
                <ListItemButton onClick={() => navigate("/users")}> 
                     <ListItemIcon>
                     <GroupIcon/>
                     </ListItemIcon>
                     <ListItemText primary="Users data"/>
                </ListItemButton>
        </ListItem>
      </List>

      <Divider/>      
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}