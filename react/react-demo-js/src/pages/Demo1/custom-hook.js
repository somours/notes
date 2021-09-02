import {useEffect, useState} from "react";

// 自定义Hook, 获取鼠标移动的位置
export const useMousePosition = () => {
	const [position, setPosition] = useState({x: 0, y: 0});
	useEffect(() => {
		const updateMousePosition = e => {
			setPosition({x: e.clientX, y: e.clientY});
		}
		document.addEventListener('mousemove', updateMousePosition)
		return () => {
			document.removeEventListener('mousemove', updateMousePosition)
		}
	})
	return position
}

export const CustomHookDemo1 = () => {
	const position = useMousePosition()
	return <div>
		<div>
			x: {position.x}
			<span style={{marginRight: '20px'}}></span>
			y: {position.y}
		</div>
	</div>
}

// 自定义hook, 数字累加,类似的可设计倒计时hook
function useNumber(){
	let [number,setNumber] = useState(0);
	useEffect(()=>{
		setInterval(()=>{
			setNumber(number=>number+1);
		},1000);
	},[]);
	return [number,setNumber];
}
// 每个组件调用同一个 hook，只是复用 hook 的状态逻辑，并不会共用一个状态
export function Counter1(){
	let [number,setNumber] = useNumber();
	return (
			<div><button onClick={()=>{
				setNumber(number+1)
			}}>{number}</button></div>
	)
}
export function Counter2(){
	let [number,setNumber] = useNumber();
	return (
			<div><button  onClick={()=>{
				setNumber(number+1)
			}}>{number}</button></div>
	)
}