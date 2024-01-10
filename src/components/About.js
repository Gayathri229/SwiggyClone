const About = () => {
  return (
    <div className="flex items-center">
      <div className="font-nunito font-semibold text-lg m-10 p-4">
        <h2 className="font-extrabold text-7xl mb-4">DESIGNED TO MOVE</h2>
        <h4 className="font-bold text-xl mb-2 opacity-60">
          Savor the convenience, indulge in the flavors – your culinary journey
          begins with us!
        </h4>
        <p className="opacity-60">
          Real food that keeps up with your pace. Locations close to where you
          are and delivered directly to you. The easiest way to eat well.
        </p>
      </div>
      <div className="lunch-image w-10/12 h-[100vh] bg-cover bg-right"></div>
    </div>
  );
};

export default About;
