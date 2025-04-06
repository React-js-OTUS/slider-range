import classnames from 'classnames'
import {
	ChangeEvent,
	FC,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import './RangeSlider.css'
interface RangeSliderProps {
	min: number
	max: number
	step: number
	onChange: ({ min, max }: { min: number; max: number }) => void
}
const RangeSlider: FC<RangeSliderProps> = ({ min, max, onChange, step }) => {
	const [minValue, setMinValue] = useState(min)
	const [maxValue, setMaxValue] = useState(max)
	const minValueRef = useRef<HTMLInputElement>(null)
	const maxValueRef = useRef<HTMLInputElement>(null)
	const range = useRef<HTMLInputElement>(null)

	const getPercent = useCallback(
		(value: number) => Math.round(((value - min) / (max - min)) * 100),
		[min, max]
	)

	useEffect(() => {
		if (maxValueRef.current) {
			const minPercent = getPercent(minValue)
			const maxPercent = getPercent(+maxValueRef.current.value)

			if (range.current) {
				range.current.style.left = `${minPercent}%`
				range.current.style.width = `${maxPercent - minPercent}%`
			}
		}
	}, [minValue, getPercent])

	useEffect(() => {
		if (minValueRef.current) {
			const minPercent = getPercent(+minValueRef.current.value)
			const maxPercent = getPercent(maxValue)

			if (range.current) {
				range.current.style.width = `${maxPercent - minPercent}%`
			}
		}
	}, [maxValue, getPercent])

	useEffect(() => {
		onChange({ min: minValue, max: maxValue })
	}, [minValue, maxValue, onChange])

	return (
		<>
			<div className='container'>
				<input
					type='range'
					min={min}
					max={max}
					step={step}
					value={minValue}
					ref={minValueRef}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.min(+event.target.value, maxValue - step)
						setMinValue(value)
						event.target.value = value.toString()
					}}
					className={classnames('thumb thumb--zindex-3', {
						'thumb--zindex-5': minValue > max - 100,
					})}
				/>
				<input
					type='range'
					min={min}
					max={max}
					step={step}
					value={maxValue}
					ref={maxValueRef}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.max(+event.target.value, minValue + step)
						setMaxValue(value)
						event.target.value = value.toString()
					}}
					className='thumb thumb--zindex-4'
				/>

				<div className='slider'>
					<div className='slider__track'></div>
					<div ref={range} className='slider__range'></div>
					<div className='slider__left-value'>{minValue}</div>
					<div className='slider__right-value'>{maxValue}</div>
				</div>
			</div>
			<div className='values'>
				<input
					type='number'
					value={minValue}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.min(+event.target.value, maxValue - step)
						setMinValue(Math.max(value, 0)) // Убедитесь, что minValue не меньше 0
					}}
					step={step}
				/>
				<input
					type='number'
					value={maxValue}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const value = Math.max(+event.target.value, minValue + step)
						setMaxValue(Math.min(value, max))
					}}
					step={step}
				/>
			</div>
		</>
	)
}

export default RangeSlider
