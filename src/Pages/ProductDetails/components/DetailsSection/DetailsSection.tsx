import { Box, Typography } from "@mui/material"
import { ProductRating } from "./components/ProductRating"

export const DetailsSection = () => {



    return (
        <Box width={'50%'} display='flex' 
        flexDirection='column' 
        height='100%' 
        border={'1px solid yellow'}
        alignItems='start'
        gap={5}
        >
        <Typography variant='h4'>PRODUCT_NAME</Typography>
        <ProductRating/>
        <Typography variant='h3'>$200</Typography>
        {/*formularz skladajacy sie z:
        selecta z quantity
        oraz submit buttona z Add to basket
        */}
        </Box>
    )
}