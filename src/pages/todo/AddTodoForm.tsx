/*  2024-07-20 19:50:45



*/

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TodoType } from "../Todos";
import { genNextTodoId } from "@/util/todosIO";

type AddTodoFormProps = {
  todos: TodoType[];
  handleTodoSubmit: (todoItems: TodoType[]) => void;
};

const AddTodoForm = ({ todos, handleTodoSubmit }: AddTodoFormProps) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const nextId = genNextTodoId(todos);

  const handleSubmit = () => {
    if (!text.length) {
      return;
    }

    const newTodo = {
      id: nextId,
      title: text,
      completed: false,
    };
    handleTodoSubmit([...todos, newTodo]);
    setText("");
  };

  return (
    <div className="flex flex-row justify-center items-center w-full">
      <div className=" bottom-6 w-full mx-auto max-w-xl px-4">
        <AnimatePresence>
          {visible && (
            <motion.form
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mb-6 w-full rounded border border-zinc-700 bg-accent p-3"
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What do you need to do?"
                className="h-24 w-full resize-none rounded  p-3 text-sm  placeholder-zinc-500 caret-zinc-50 focus:outline-0"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5"></div>
                <button
                  type="submit"
                  className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500"
                >
                  Submit
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
        <button
          onClick={() => setVisible((pv) => !pv)}
          className="grid w-full place-content-center rounded-full border border-zinc-700  py-3 text-lg bg-popover hover:bg-accent active:bg-accent"
        >
          <FiPlus
            className={`transition-transform ${
              visible ? "rotate-45" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default AddTodoForm;
