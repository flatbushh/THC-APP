import {
    Box,
    FormControlLabel,
    FormGroup,
    Switch,
    useColorScheme,
  } from "@mui/material";
  
  export const ThemeSwitch = () => {
    const { mode, setMode } = useColorScheme();
    if (!mode) {
      return null;
    }
    console.log(mode);
    return (
      <Box
        sx={{
          width: 60,
          height: 60,
          border: '1px solid red'
        }}>
        <FormGroup>
          <FormControlLabel
            value={mode}
            sx={{ color: "text.primary" }}
            onChange={(event) =>
              setMode(
                (event.target as HTMLInputElement).checked ? "dark" : "light"
              )
            }
            control={<Switch checked={mode === "dark"} />}
            label={`${mode}`}
          />
        </FormGroup>
      </Box>
    );
  };