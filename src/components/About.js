const About = () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <div className="relative flex-col md:flex-row flex items-center">
      {isMobile && (
        <>
          <div className="absolute -z-10 lunch-image w-screen md:w-10/12 h-[100vh] bg-cover bg-right"></div>
          <div className="absolute inset-0 bg-black opacity-30 h-[100vh] -z-10"></div>
        </>
      )}

      <div className="font-nunito text-lg m-5 mt-20 md:m-10 p-4 text-white md:text-black">
        <h2 className="font-extrabold text-3xl md:text-7xl mb-4">
          DESIGNED TO MOVE
        </h2>
        <h4 className="font-bold text-xl mb-2 opacity-100 md:opacity-60">
          Savor the convenience, indulge in the flavors – your culinary journey
          begins with us!
        </h4>
        <p className="opacity-100 md:opacity-60">
          Real food that keeps up with your pace. Locations close to where you
          are and delivered directly to you. The easiest way to eat well.
        </p>
      </div>
      {!isMobile && (
        <div className="lunch-image w-screen md:w-10/12 h-[100vh] bg-cover bg-right"></div>
      )}
    </div>
  );
};

export default About;
