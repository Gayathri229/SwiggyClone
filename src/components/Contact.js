import { useEffect } from "react";
import { useGetPokemonByNameQuery } from "../utils/pokemon";

const Contact = () => {
  useEffect(() => {
    console.log("useEffect render");
    // const timer = setInterval(() => {
    //     console.log("Namaste React");
    // },1000);

    return () => {
      // clearInterval(timer);
      console.log("useEffect Return");
    };
  }, []);

  console.log("Render");

  // const {data, error, isLoading} = useGetPokemonByNameQuery('bulbasaur');
  // console.log("API DATA", data);

  return (
    <div>
      <h1 className="font-bold text-3xl"> Contact Us </h1>
      <p className=""> gmail: namakusorudhanmukkiyam@gmail.com</p>
      <p> Contact: 9876543210</p>
      <div>
        <form>
          <input type="text" placeholder="name">
            
          </input>
          <input type="text" placeholder="feedback">
            
          </input>
          <button>Submit</button>
        </form>
      </div>
      {/* <h3 className="font-bold">{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name}/> */}
    </div>
  );
};

export default Contact;
