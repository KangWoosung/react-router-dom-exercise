/*


*/

import React from "react";

type MainFrameProps = {
  children: React.ReactNode;
};

const MainFrame = ({ children }: MainFrameProps) => {
  return (
    <main className="flex items-center justify-center w-full">
      <div className="flex items-center justify-between w-full max-w-screen-lg bg-background py-20">
        {children}
      </div>
    </main>
  );
};

export default MainFrame;
