import LogoImg from "../../assets/images/logo.svg";
import SingleLogoImg from "../../assets/images/single-logo.svg";
const Logo = ({ variant = "full" }) => {
  return variant === "icon" ? (
    <>
      <div>
        <img src={SingleLogoImg} alt="logo" />
      </div>
    </>
  ) : (
    <>
      <div>
        <img src={LogoImg} alt="logo" />
      </div>
    </>
  );
};

export default Logo;
