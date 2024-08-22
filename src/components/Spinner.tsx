import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Spinner = () => {
    // zrob spinner tak, aby wygladal w ten sposob: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYdyfu7KxY-qTcZK9OkDzWoEmJJftokvmLZQ&s
    // nie musi byc wyszarzony, ale zeby byl na srodku nad kontentem strony 
    //// SPINNER ON TOP, higher z-index value will appear in front of an element with a lower z-index value
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 999, position: 'fixed'}}>
        <CircularProgress size={50}/>
      </Box>
    )
}