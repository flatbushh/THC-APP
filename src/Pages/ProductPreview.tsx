import React, { useEffect, useState } from 'react';
import {Card} from '@mui/material'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Product } from './ProductsList';
import { Spinner } from '../components/Spinner';

export const ProductPreview = () => {
    const {id} = useParams() //od razu destrukturyzujemy id
    // const params = useParams()
    // const id = params.id
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:4000/product/${id}`)
        .then((res) => {
            setProduct(res.data)
            setLoading(false)
            console.log(res.data)})
        .catch((err) => {
            setLoading(false)
            console.log(err)})
    }, [])

    if(loading) {
        return (<Spinner/>)
    }
    return (
        <Card>
            {/*
            Wyswietlic product
            inspo: https://dribbble.com/search/product-preview
             */}

        </Card>
    )
}