import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);
    // console.log("Parent Constructor");
  }

  componentDidMount() {
    // console.log("Parent Component Did Mount");
  }

  render() {
    // console.log("Parent Render");

    return (
      <div>
        <h1> About Us </h1>
        <UserContext.Consumer>
          {({ loggedInUser }) => <h1>{loggedInUser}</h1>}
        </UserContext.Consumer>
        <h2> Welcome to Soru App </h2>
        {/* <UserClass name={"First"} location={"Coimbatore"} /> */}
        {/* <UserClass name={"Second"} location={"Bangalore"} /> */}

      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1> About Us </h1>
//       <h2> Welcome to Soru App </h2>
//       <UserClass name={"Gayathri (class)"} location={"Coimbatore (Class)"} />
//     </div>
//   );
// };

export default About;
