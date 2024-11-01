import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from "react";
import { useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';

const MENU_LIST = [
    {label: 'Add product', icon: <AddCircleOutlineIcon/>, url: '/add-product'},
    {label: 'Users data', icon: <GroupIcon/>, url: '/users'}
]

export const MenuList = () => {
    const navigate = useNavigate();
    return (
      
      <List>
        {MENU_LIST.map((item) => 
        <>
         <ListItem>
                <ListItemButton onClick={() => navigate(item.url)}> 
                     <ListItemIcon>
                     {item.icon}
                     </ListItemIcon>
                     <ListItemText primary={item.label} />       
            </ListItemButton>
        </ListItem> 
         <Divider/>
         </>
        )}
        </List>
)
}