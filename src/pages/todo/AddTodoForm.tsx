/*  2024-07-20 19:50:45



*/

import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ShadCNTextarea from "@/components/ShadCNTextarea";
import {
  AddTodoFormSchema,
  AddTodoFormSchemaType,
} from "@/schemas/AddTodoFormSchema";
import ShadCNButton from "@/components/ShadCNButton";
import ShadCNCheckbox from "@/components/ShadCNCheckbox";

type AddTodoFormProps = {
  nextId: number;
  handleTodoSubmit: () => void;
};

const AddTodoForm = ({ nextId, handleTodoSubmit }: AddTodoFormProps) => {
  const form = useForm<AddTodoFormSchemaType>({
    resolver: zodResolver(AddTodoFormSchema),
    defaultValues: {
      title: "",
      completed: false,
    },
  });

  return (
    <div className="w-10/12 flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleTodoSubmit)}
          className="flex flex-col justify-center items-center w-auto space-y-6"
        >
          <ShadCNTextarea
            form={form}
            name="todo"
            label="할 일"
            description="할 일을 입력해주세요"
            className="w-full border p-2"
          />
          <ShadCNCheckbox
            form={form}
            name="completed"
            label="완료 여부"
            className="w-full border p-2"
          />
          <ShadCNButton
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
          >
            추가
          </ShadCNButton>
        </form>
      </Form>
    </div>
  );
};

export default AddTodoForm;
