import React from "react";
import { Balancer } from "react-wrap-balancer";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col py-40">
      <Balancer>This is a React Router Exercise Project</Balancer>
      <p>
        All data here are from Jsonplaceholder directly. So you cannot update,
        write to data.
      </p>
    </div>
  );
};

export default Home;
