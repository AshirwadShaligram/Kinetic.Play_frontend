import AuthBacktoStore from "./AuthBacktoStore";
import AuthLogo from "./AuthLogo";

const AuthNavbar = () => {
  return (
    <div className="h-full flex justify-between items-center border-b-2">
      <div>
        <AuthLogo />
      </div>
      <div>
        <AuthBacktoStore />
      </div>
    </div>
  );
};

export default AuthNavbar;
