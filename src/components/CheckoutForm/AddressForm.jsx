import React, { useState, useEffect } from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography, Input} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from './CustomTextField' 
import {commerce} from '../../lib/commerce'

const AddressForm = ({checkoutToken}) => {
	const [shippingCountries, setShippingCountries] = useState([])
	const [shippingCountry, setShippingCountry] = useState('')
	const [shippingSubDivisions, setShippingSubDivisions] = useState([])
	const [shippingSubDivision, setShippingSubDivision] = useState('')
	const [shippingOptions, setShippingOptions] = useState([])
	const [shippingOption, setShippingOption] = useState('')
	const methods = useForm()
	
	const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
	const subdivisions = Object.entries(shippingSubDivisions).map(([code, name]) => ({id: code, label: name}))
	const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))


	const fetchShippingCountries = async (checkoutTokenId) => {
		const  {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
		console.log(countries)
		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0])
	  };

	const fetchSubdivisions = async (countrycode) => {
		const {subdivisions} = await commerce.services.localeListSubdivisions(countrycode)

		setShippingSubDivisions(subdivisions)
		setShippingSubDivision(Object.keys(subdivisions)[0])
	}

	const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})

		setShippingOptions(options)
		setShippingOption(options[0].id)
	}

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id)
	}, []);

	useEffect(() => {
		if(shippingCountry) fetchSubdivisions(shippingCountry)
	}, [shippingCountry])

	useEffect(() => {
		if(shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision)
	}, [shippingSubDivision])

	return (
		<>
			<Typography variant="h6" gutterBottom>Shipping Address</Typography>
			<FormProvider {...methods}>
				<form action="" >
					<Grid container spacing="3">
						<FormInput required name='firstName' label='First Name'/>
						<FormInput required name='lastName' label='Last Name'/>
						<FormInput required name='address' label='Address'/>
						<FormInput required name='email' label='Email'/>
						<FormInput required name='city' label='City'/>
						<FormInput required name='zip' label='ZIP / Postal code'/>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
								{countries.map((country) => (
									<MenuItem key={country.id} value={country.id}>
										{country.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivisions</InputLabel>
							<Select value={shippingSubDivision} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)}>
								{subdivisions.map((subdivision) => (
									<MenuItem key={subdivision.id} value={subdivision.id}>
										{subdivision.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
								{options.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
				</form>
			</FormProvider>
		</>
	);
}

export default AddressForm;
