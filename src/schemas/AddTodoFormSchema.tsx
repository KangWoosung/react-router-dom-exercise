/*  2024-07-21 00:13:52

Todo Type:
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },

*/

import { z } from "zod";

export const AddTodoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  completed: z.boolean(),
});

export type AddTodoFormSchemaType = z.infer<typeof AddTodoFormSchema>;
