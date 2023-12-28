import React from "react";
import SuperChild from "./SuperChild";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
    };

    console.log(this.props.name + "Child Constructor");
  }

  async componentDidMount() {
    console.log(this.props.name + "Child Component Did Mount");

    const data = await fetch("https://api.github.com/users/Gayathri229");
    const json = await data.json();
    // console.log(json);
    this.setState({ userInfo: json });
    // this.timer = setInterval(() => {
    //   console.log("Namaste React")
    // }, 1000);
  }

  componentDidUpdate() {
    console.log(this.props.name + "Component Did Update");
  }

  componentWillUnmount() {
    console.log(this.props.name + "Component will unmount");
    // clearInterval(this.timer);
  }

  render() {
    console.log(this.props.name + "Child Render");

    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2> Name: {name} </h2>
        <h3> Location: {location} </h3>
        <h4> Contact: gayathriarumugam229@gmail.com</h4>
        {/* <SuperChild /> */}
      </div>
    );
  }
}

export default UserClass;
