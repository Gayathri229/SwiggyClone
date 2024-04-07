import { CDN_URL } from "../utils/constants";

const MobileBanner = ({ banners }) => {
  return (
    <div className="flex mt-2 mx-2 mb-5">
      {banners.map((banner) => (
        <div className="w-[190px] m-2" key={banner?.id}>
          <img src={CDN_URL + banner?.imageId} className="w-full" />
        </div>
      ))}
    </div>
  );
};

export default MobileBanner;
