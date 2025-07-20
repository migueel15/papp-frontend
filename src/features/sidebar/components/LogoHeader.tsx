import AppLogo from "@/assets/papp.svg";
const LogoHeader = () => {
  return (
    <div className="flex items-center gap-2 pb-5">
      <img src={AppLogo} alt="Logo" className="h-8 w-auto" />
      <h1 className="font-poppins-semibold text-xl">PAPP</h1>
    </div>
  );
};

export default LogoHeader;
