/*  2024-07-16 21:23:10

// Example usage
const TextEditor: React.FC = () => {
  const [text, setText] = useLocalStorageState<string>('editorText', '');

  return (
    <textarea 
      value={text} 
      onChange={(e) => setText(e.target.value)}
      placeholder="Start typing..."
    />
  );
};

*/

import { useState, useEffect } from "react";

const useLocalStorageState = <T,>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorageState;
