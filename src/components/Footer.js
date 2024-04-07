import { GOOGLE_PLAY_BANNER, APP_STORE_BANNER } from "../utils/constants.js";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer w-screen mt-12">
      <div className="app-experience flex justify-center bg-[#f0f0f5] h-[110px] w-full">
        <p className="font-spaceGrotesk font-extrabold text-[23px] md:text-[28px] opacity-70 md:mr-24 mt-4">
          For better experience,download <br /> the Swiggy app now
        </p>
        <Link to="https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader">
          <img
            src={GOOGLE_PLAY_BANNER}
            alt="google-play-banner"
            className="h-[30px] md:h-[64px] w-[60px] md:w-[208px] mt-6 mr-6"
          />
        </Link>
        <Link to="https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920?referrer=utm_source%3Dswiggy%26utm_medium%3Dhomepage">
          <img
            src={APP_STORE_BANNER}
            alt="app-store-banner"
            className="h-[30px] w-[60px] md:h-[64px] md:w-[208px] mt-6"
          />
        </Link>
      </div>
      <div className="bg-[#02060C] md:h-[450px] w-screen">
        <div className="cols md:flex flex-col justify-center gap-[130px]">
          <div className="col-1 flex flex-col mt-12 gap-3">
            <div className="flex items-center">
              <span>
                <svg width={21} height={32} viewBox="0 0 21 32">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.3819 14.7977C20.5245 13.9563 20.3574 13.3121 19.9261 12.9756C19.2787 12.4711 18.3021 12.1959 15.9859 12.204C14.2724 12.2082 12.4327 12.2167 11.6469 12.2205C11.5739 12.2082 11.3093 12.1181 11.297 11.7938L11.2683 6.64781C11.2683 6.3236 11.5207 6.05694 11.8385 6.05694C12.1559 6.05694 12.412 6.31936 12.412 6.64358C12.412 6.64358 12.4285 9.43839 12.4327 10.4314C12.4327 10.5257 12.4897 10.7513 12.7011 10.8089C14.085 11.1822 21.0778 10.883 20.9639 9.57764C20.3536 4.16496 15.8884 -0.0164585 10.4829 4.87055e-05C8.78164 0.00385807 7.16965 0.426698 5.745 1.16952C2.33815 2.98744 -0.0755529 6.63977 0.00180748 10.8542C0.0546894 13.8374 1.98811 19.1396 3.16037 19.923C3.70173 20.2845 4.40996 20.1491 7.58886 20.1368C9.0298 20.1325 10.3732 20.1325 11.0324 20.1325C11.1016 20.1448 11.4599 20.2312 11.4637 20.5677L11.484 24.4782C11.484 24.8024 11.232 25.0691 10.9142 25.0691C10.5968 25.0691 10.3402 24.8109 10.3402 24.4824C10.3402 24.4824 10.3647 22.9108 10.3609 22.328C10.3609 22.1926 10.3689 21.9585 9.98235 21.7862C8.71622 21.2119 4.60532 21.5729 4.37737 22.2129C4.29191 22.4592 4.75185 23.4073 5.46418 24.6259C7.83331 28.4425 10.1571 31.4176 10.5318 31.8937C10.5563 31.9141 10.5766 31.9348 10.5968 31.9471C10.9104 31.5611 19.1078 22.2747 20.3819 14.7977Z"
                    fill="white"
                  ></path>
                </svg>
              </span>
              <div className="text-white font-extrabold text-2xl font-spaceGrotesk ml-2 opacity-90">
                Swoogy
              </div>
            </div>

            <div className="font-spaceGrotesk text-white text-sm opacity-70">
              © 2023 All Rights Reserved <br /> Gayathri Arumugam
            </div>
          </div>

          <div className="col-2 mt-12">
            <ul className="font-spaceGrotesk text-white text-base flex flex-col gap-4 cursor-pointer">
              <li className="font-bold opacity-90 text-lg">Company</li>
              <li className="opacity-70">About</li>
              <li className="opacity-70">Careers</li>
              <li className="opacity-70">Team</li>
              <li className="opacity-70">Swiggy One</li>
              <li className="opacity-70">Swiggy Instamart</li>
              <li className="opacity-70">Swiggy Genie</li>
            </ul>
          </div>

          <div className="col-3 flex flex-col mt-12 gap-20">
            <div>
              <ul className="font-spaceGrotesk text-white text-base flex flex-col gap-4 cursor-pointer">
                <li className="font-bold text-lg opacity-90">Contact Us</li>
                <li className="opacity-70">Help & Support</li>
                <li className="opacity-70">Partner with us</li>
                <li className="opacity-70">Ride with us</li>
              </ul>
            </div>
            <div className="col-3">
              <ul className="font-spaceGrotesk text-white text-base flex flex-col gap-4 cursor-pointer">
                <li className="font-bold text-lg opacity-90">Legal</li>
                <li className="opacity-70">Terms & Conditions</li>
                <li className="opacity-70">Cookie Policy</li>
                <li className="opacity-70">Privacy Policy</li>
              </ul>
            </div>
          </div>

          <div className="col-4 mt-12">
            <ul className="font-spaceGrotesk text-white text-base flex flex-col gap-4 cursor-pointer">
              <li className="font-bold text-lg opacity-90">We deliver to:</li>
              <li className="opacity-70">Bangalore</li>
              <li className="opacity-70">Gurgaon</li>
              <li className="opacity-70">Hyderabad</li>
              <li className="opacity-70">Delhi</li>
              <li className="opacity-70">Mumbai</li>
              <li className="opacity-70">Pune</li>
              <li className="opacity-70">& 589 more cities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
