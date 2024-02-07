import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ITodo from "../interfaces/todo.interface";

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
   tagTypes: ["Todos"],
   endpoints: (builder) => ({
      getTodos: builder.query<ITodo[], void>({
         query: () => "/todos",
         transformResponse: (res: ITodo[]) => res.sort((a, b) => b.id - a.id),
         providesTags: ["Todos"],
      }),
      addTodo: builder.mutation<ITodo, ITodo>({
         query: (todo) => ({
            url: "/todos",
            method: "POST",
            body: todo,
         }),
         invalidatesTags: ["Todos"],
      }),
      updateTodo: builder.mutation<ITodo, ITodo>({
         query: (todo) => ({
            url: `/todos/${todo.id}`,
            method: "PATCH",
            body: todo,
         }),
         invalidatesTags: ["Todos"],
      }),
      deleteTodo: builder.mutation<ITodo, Partial<ITodo>>({
         query: ({id}) => ({
            url: `/todos/${id}`,
            method: "DELETE",
            body: id,
         }),
         invalidatesTags: ["Todos"],
      }),
   }),
});

export const {
   useGetTodosQuery, 
   useAddTodoMutation, 
   useUpdateTodoMutation, 
   useDeleteTodoMutation
} = apiSlice;
