// import 
import React from "react";
import axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      element: null
    }
  }

  setSizes = (size) => {
    this.setState({width: size[0], height: size[1]}, this.click)
  }

  click = () => {
    axios.get('http://localhost:3001', { headers: { 'width': this.state.width, 'height': this.state.height } })
      .then(res => {
        let data = res.data;


        console.log(data);

        let childs = [];
        for (let el of data) {
          let child = [];
          for (let i of el) {
            let sub_div = React.createElement('div', { style: { width: i.width, height: i.height, left: i.x, top: i.y, backgroundColor: 'red', position: 'absolute' } })
            child.push(sub_div);
          }
          let dop_div = React.createElement('div', { style: { display: 'flex', flexDirection: 'row' } }, child);
          childs.push(dop_div);
        }

        let main_div = React.createElement('div', { style: { width: this.state.width, height: this.state.height, backgroundColor: 'gray', top: 0, left: 0, position: 'absolute' } }, childs);
        this.setState({ element: main_div });
      })
  }

  render() {
    return (
      <div>
        {(this.state.element)
          ?
          this.state.element
          :
          <div>
            <button onClick={() => {this.setSizes([1920, 1080])}}>1920x1080</button>
            <button onClick={() => {this.setSizes([320, 200])}}>320x200</button>
            <button onClick={() => {this.setSizes([800, 600])}}>800x600</button>
            <button onClick={() => {this.setSizes([1024, 768])}}>1024x768</button>
          </div>}
      </div>
    )
  }
}

export default App;