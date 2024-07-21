import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { UserType } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleSignin = async () => {
    console.log("Signin");
    setLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("done");
        }, 1000);
      });
      await signin({
        id: "1",
        name: "John Doe",
        email: "",
      } as UserType);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center w-full p-10">
      <Button
        onClick={handleSignin}
        disabled={loading}
        // className={loading && "cursor-not-allowed"}
      >
        Signin
      </Button>
    </div>
  );
};

export default Signin;
