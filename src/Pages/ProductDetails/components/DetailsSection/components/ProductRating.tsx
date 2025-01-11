import { Box, Rating, Typography } from "@mui/material"


export const ProductRating = () => {

    return (
        <Box display='flex' gap={2} alignItems={'center'}>
            <Rating value={4} size="small"/>
            <Typography variant='subtitle1'>100 reviews</Typography>
        </Box>
    )
}