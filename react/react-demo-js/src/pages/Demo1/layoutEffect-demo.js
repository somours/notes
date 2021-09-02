import {useEffect, useLayoutEffect, useState} from "react";
import {Button} from 'antd'

export default () => {
	const [color, setColor] = useState('red');
	useLayoutEffect(() => {
		console.log('useLayoutEffect', color)
	});
	useEffect(() => {
		console.log('useEffect', color)
	})
	return (
			<>
				<div style={{width: '50px', height: '50px', background: color}}>颜色</div>
				<Button type="primary" onClick={() => setColor('red')}>红</Button>
				<Button onClick={() => setColor('yellow')}>黄</Button>
				<Button type="dashed" onClick={() => setColor('white')}>白</Button>
			</>
	)
}