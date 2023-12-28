import { Component } from "react";

class SuperChild extends Component {
  constructor(props) {
    super(props);
    console.log("Super Child Constructor");
  }

  componentDidMount() {
    console.log("Super Child Component Did Mount");
  }

  render() {
    console.log("Super Child Render");

    return (
      <div>
        <h1>Super Child</h1>
      </div>
    );
  }
}

export default SuperChild;
