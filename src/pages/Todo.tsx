/*  2024-07-23 21:23:11


*/

import { useAnimate, usePresence } from "framer-motion";
import React, { useEffect } from "react";
import { FiClock, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

type TodoPropsType = {
  removeElement: (id: number) => void;
  handleCheck: (id: number) => void;
  id: number;
  children?: React.ReactNode;
  checked?: boolean;
};

const Todo = ({
  removeElement,
  handleCheck,
  id,
  children,
  checked,
}: TodoPropsType) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  // const time = new Date();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate(
          "p",
          {
            color: checked ? "#6ee7b7" : "#fca5a5",
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );
        await animate(
          scope.current,
          {
            scale: 1.025,
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );

        await animate(
          scope.current,
          {
            opacity: 0,
            x: checked ? 24 : -24,
          },
          {
            delay: 0.75,
          }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  return (
    <motion.div
      ref={scope}
      layout
      className="relative flex w-full items-center gap-3 rounded border border-zinc-700 bg-accent p-3"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck(id)}
        className="size-4 accent-indigo-400"
      />

      <p className={` transition-colors ${checked && "text-zinc-400"}`}>
        {children}
      </p>
      <div className="ml-auto flex gap-1.5">
        <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
          <FiClock />
          {/* <span>{time}</span> */}
        </div>
        <button
          onClick={() => removeElement(id)}
          className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default Todo;
