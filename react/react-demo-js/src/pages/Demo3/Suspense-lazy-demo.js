import React from "react";
import {Image, Spin} from "antd";

const ImageDemo = () => {
	return <Image
			width={200}
			src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
	/>
}

const LazyComponent = React.lazy(() => new Promise((resolve) => {
	setTimeout(() => {
		resolve({
			default: () => <ImageDemo></ImageDemo>
		})
	}, 2000)
}))

export default class Index extends React.Component {
	render () {
		return <div>
			<div>React, Suspense, lazy demo</div>
			<React.Suspense fallback={<Spin />}>
				<LazyComponent></LazyComponent>
			</React.Suspense>
		</div>
	}
}