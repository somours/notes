import React, {Component} from "react";

// import { RouteComponentProps } from 'react-router';

// const PageC: FC = () => {
//   return (
//       <div>
//         pageC页面
//       </div>
//   )
// }
// interface myProps extends RouteComponentProps{
// }
interface Imatch {
  isExact: boolean;
  params: {[key: string]: string};
  patch: string;
  url: string
}
interface Iprops {
  history: object;
  location: object;
  match: Imatch;
  staticContext: any;
}
class PageC extends Component<Iprops> {
  constructor(props: Iprops) {
    super(props);
    this.state = {}
  }
  componentDidMount(): void {
    console.log(this.props.match)
    // console.log(this.context)
  }

  render() {
    return (
      <div>
        pageC页面
       </div>
   )
  }
}

export default PageC
