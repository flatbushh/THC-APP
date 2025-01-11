import { Tab, Tabs } from "@mui/material"
import { useState } from "react"


const TABS = [
    {id: 0, name: 'Details', element: <div>details</div>},
    {id: 1, name: 'Reviews', element: <div>reviews</div>},
    {id: 2, name: 'Description', element: <div>description</div>}
]

export const TabsSection = () => {

    const [selectedTab, setSelectedTab] = useState(TABS[0].id)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
      };
    return (
        <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
        {TABS.map((tab) => 
            <Tab label={tab.name} value={tab.name}/>
        )}
        </Tabs> 
    
    )
}