import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, bgcolor: "#FAEBD7" }}>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: "1rem",
            }}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const ReactTab = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "#FAEBD7",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "#F5DEB3", boxShadow: "none" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { backgroundColor: "black" }, // Highlight bar color
          }}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
          }}
        >
          <Tab
            sx={{
              color: value === 0 ? "black" : "black",
              fontFamily: "'Poppins', sans-serif",
            }}
            label="Details"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              color: value === 1 ? "black" : "black",
              fontFamily: "'Poppins', sans-serif",
            }}
            label="Reviews"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.
      </TabPanel>
    </Box>
  );
};
