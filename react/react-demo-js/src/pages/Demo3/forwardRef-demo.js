import React from "react";

const Son = (props) => {
	const {grandRef} = props;
	return <div>
		<div>forwardRef demo</div>
		<span ref={grandRef}>这个是想要获取的元素</span>
	</div>
}

const Father = (props) => {
	return <div>
		<Son grandRef={props.grandRef}></Son>
	</div>
}

const NewFather = React.forwardRef((props, ref) => <Father grandRef={ref} {...props} />)

class GrandFather extends React.Component {
	constructor(props) {
		super(props);
	}
	node = null;
	componentDidMount() {
		console.log(this.node)
	}
	render () {
		return <div>
			<NewFather ref={node => this.node = node}></NewFather>
		</div>
	}
}

export default GrandFather