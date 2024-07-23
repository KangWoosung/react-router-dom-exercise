import { ImSpinner2 } from "react-icons/im";

const LoadingMain = () => {
  return (
    <>
      <div className="loading-spinner flex flex-row justify-center items-center w-full py-24">
        <ImSpinner2 className="animate-spin" font-size="2rem" />
      </div>
    </>
  );
};

export default LoadingMain;
