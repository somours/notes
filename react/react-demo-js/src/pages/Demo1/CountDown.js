import {useEffect, useState} from "react";
import {Button} from "antd";

const initialCount = 5
export default () => {
	const [count, setCount] = useState(null)
	// const [startFlag, setStartFlag] = useState(false)
	useEffect(() => {
		console.log('enter', count)
		if(count === null) {
			return
		}
		// 倒计时
		let timer;
		if(count >=0 ) {
			timer = setInterval(() => {
				setCount(count-1)
			}, 1000)
		} else {
			setCount(null)
			// setStartFlag(false)
		}
		return () => {
			timer && clearInterval(timer)
		}
	})
	//开始倒计时
	const startCount = () => {
		// setStartFlag(true)
		console.log('start', count, count >=0 && count <= initialCount)
		if(count && count >=0 && count <= initialCount) {
			return
		}
		setCount(initialCount)
	}
	return <div>
		<Button type="text" danger>
			{count}
		</Button>
		<Button type="primary" onClick={startCount}>
			{count || '倒计时开始'}
		</Button>
	</div>
}