/*  2024-07-17 12:03:05

Solution from:
https://www.frontend.fyi/v/css-push-down-the-footer

*/

type RootFrameProps = {
  children: React.ReactNode;
};

const RootFrame = ({ children }: RootFrameProps) => {
  return (
    <div className="wrapper grid min-h-[100dvh] grid-rows-[auto-1fr-auto] bg-background ">
      {children}
    </div>
  );
};

export default RootFrame;
