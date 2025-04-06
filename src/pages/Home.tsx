import { FC } from 'react'
import ProductsList from '../components/ProductsList/ProductsList'
import './Home.css'
const Home: FC = () => {
	return (
		<div className='main'>
			<ProductsList />
		</div>
	)
}

export default Home
