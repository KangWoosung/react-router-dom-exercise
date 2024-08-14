import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col py-40">
      <h1 className="text-balance">This is a React Router Exercise Project</h1>
      <p>
        All data here are from Jsonplaceholder directly. So you cannot update,
        write to data.
      </p>
    </div>
  );
};

export default Home;
