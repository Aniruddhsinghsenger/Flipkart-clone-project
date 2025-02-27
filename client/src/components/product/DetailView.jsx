import { Box, makeStyles, Typography, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from '../../redux/actions/productActions';
import  { LocalOffer as Badge } from '@material-ui/icons';
import clsx from 'clsx';

//component
import ActionItems from './ActionItems';

const useStyle = makeStyles({
    component: {
          marginTop: 55,
          background: '#f2f2f2'
    },
    container:{
        margin: '0 80px',
        background: '#fff',
        display: 'flex'
    },
    rightcontainer:{
        marginTop: 50,
        '& > *': {
            marginTop: 10
        }
    },
    smallText: {
        fontSize: 14,
        verticalAlign: 'baseline',
        '& > *': {
            fontSize: 14,
            marginTop: 10
        }
    },
    greyTextcolor: {
        color: '#878787'
    },
    price: {
        fontSize: 28
    },
    badge: {
        fontSize: 14,
        marginRight: 10,
        color: '#00CC00'
    }
})

const DetailView = ({ match }) => {
    const classes = useStyle();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    const sellerURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';

    const { product } = useSelector(state => state.getProductDetails);

    const date = new Date (new Date().getTime() + (5* 24* 60* 60* 1000));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetails(match.params.id));
    }, [dispatch])

    return (
     <Box className={classes.component}>
         { product && Object.keys(product).length &&
       <Box className={classes.container}>
           <Box style={{minWidth: '40%'}}>
            <ActionItems product={product} />
           </Box>
           <Box className={classes.rightcontainer}>
        <Typography>{product.title.longTitle}</Typography>
        <Typography className={clsx(classes.smallText, classes.greyTextcolor)}>8 Ratings & 1 Review
        <span><img src={fassured} style={{ width: 77, marginLeft: 20}} alt="" /></span>
        </Typography>
        <Typography>
            <span className={classes.price}>₹{product.price.cost}</span> &nbsp;&nbsp;&nbsp;
            <span className={classes.greyTextcolor}><strike>₹{product.price.mrp}</strike></span> &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{color: '#388E3C'}}>{product.price.discount} off</span> 
        </Typography>
        <Typography style={{marginTop: 20, fontWeight: 600}}>Available Offers</Typography>
            <Box className={classes.smallText}>
            <Typography><Badge className={classes.badge} />Special PriceGet extra 10% off (price inclusive of discount)</Typography>  
            <Typography><Badge className={classes.badge} />Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Typography> 
            <Typography><Badge className={classes.badge} />Bank offerFlat ₹100 off first Flipkart Pay Later order of ₹500 and above</Typography> 
            <Typography><Badge className={classes.badge} />Combo OfferBuy 2 items save 5%;Buy 3 or more save 10% See all products </Typography> 
            </Box>
            <Table>
                <TableBody>
                    <TableRow className={classes.smallText}>
                        <TableCell className={classes.greyTextcolor}>Delivery</TableCell>
                        <TableCell style={{fontWeight: 600}}>{date.toDateString()} | ₹100 </TableCell>
                    </TableRow>
                    <TableRow className={classes.smallText}>
                        <TableCell className={classes.greyTextcolor}>Warranty</TableCell>
                        <TableCell>No Warranty</TableCell>
                    </TableRow>
                    <TableRow className={classes.smallText}>
                        <TableCell className={classes.greyTextcolor}>Seller</TableCell>
                        <TableCell className={classes.smallText}>
                            <span style={{color: '#2874f0'}}>SuperComNet</span>
                            <Typography>GST invoice Available</Typography>
                            <Typography>14 Days Return Policy</Typography>
                            <Typography>View more sellers starting from ₹300</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colspan={2}><img src={sellerURL} style={{ width: 390}} alt="" /></TableCell>
                    </TableRow>
                    <TableRow className={classes.smallText}>
                        <TableCell className={classes.greyTextcolor}>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
           </Box> 
       </Box>
       }
    </Box>
    )
}

export default DetailView;