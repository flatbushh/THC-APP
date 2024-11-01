import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Spinner = () => {
    //// SPINNER ON TOP, higher z-index value will appear in front of an element with a lower z-index value
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 999, position: 'fixed'}}>
        <CircularProgress size={50}/>
      </Box>
    )
}