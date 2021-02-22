import React from 'react'
import {Grid} from '@material-ui/core'
import Product from './Product/Product'
import useStyles from './styles'

// const products = [
// 	{id: 1, name: 'Shoes', description: 'Running shoes', price: '$5', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cushion-shoes-7659-1584132587.jpg?crop=0.954xw:1.00xh;0.0288xw,0&resize=640:*'},
// 	{id: 2, name: 'Macbook', description: 'Apple macbook', price: '$10', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1603332211000'},
// ]

const Products = ({products, onAddToCart}) => {
	const classes = useStyles()
	return ( 
		<main className={classes.content}>
			<div className={classes.toolbar}/>
			<Grid container justify="center" spacing={4}>
				{products.map(product => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={product} onAddToCart={onAddToCart}/>
					</Grid>
				))}
			</Grid>
		</main>
	 );
}
 
export default Products;