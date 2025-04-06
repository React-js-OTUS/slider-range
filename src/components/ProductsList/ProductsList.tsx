import { FC, useCallback, useEffect, useState } from 'react'
import RangeSlider from '../RangeSlider/RangeSlider'
import './ProductsList.css'

interface IProduct {
	id: number
	title: string
	price: number
}

const ProductsList: FC = () => {
	const [products, setProducts] = useState([])
	const [filterProducts, setFilterProducts] = useState([])
	const [sliderRange, setSliderRange] = useState({ min: 0, max: 100 })

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://jsonplaceholder.typicode.com/posts')
			const data = await response.json()

			const products = data.map((product: IProduct) => ({
				id: product.id,
				title: product.title,
				price: product.id,
			}))
			setProducts(products)
			setFilterProducts(products)
		}
		fetchData()
	}, [])

	const handleValueChange = useCallback((value: { min: number; max: number }) => {
		setSliderRange(value)
	},[setSliderRange])
	useEffect(() => {
		const filtered = products.filter((product: IProduct) => {
			return (
				product.price >= sliderRange.min && product.price <= sliderRange.max
			)
		})
		setFilterProducts(filtered)
	}, [sliderRange, products])
	return (
		<div className='main'>
			<RangeSlider max={100} min={1} onChange={handleValueChange} step={1} />
			<div className='product-list'>
				<h2>Filtered Products</h2>
				<ul>
					{filterProducts.map((product: IProduct) => (
						<li key={product.id}>
							{product.title} - ${product.price}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default ProductsList
