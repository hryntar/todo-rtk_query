import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from "../api/apiSlice";
import { FormEvent, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import useDarkMode from "use-dark-mode";
import { Switch, cn } from "@nextui-org/react";
import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { TrashIcon } from "./icons/TrashIcon";

const ToDoList = () => {
   const darkMode = useDarkMode(false);
   const [newTodo, setNewTodo] = useState("");

   const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery();

   const [addTodo] = useAddTodoMutation();
   const [updateTodo] = useUpdateTodoMutation();
   const [deleteTodo] = useDeleteTodoMutation();

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      addTodo({ userId: 1, id: Number(nanoid()), title: newTodo, completed: false });
      setNewTodo("");
   };

   const newItemSection = (
      <form onSubmit={handleSubmit} className="m-auto max-md:w-full">
         <Input
            type="text"
            label="Add task"
            labelPlacement="outside"
            placeholder="What needs to be done?"
            endContent={
               <Button type="submit" color="primary" className="absolute right-0 z-2">
                  Add
               </Button>
            }
            classNames={{
               label: "text-text font-semibold",
               input: ["bg-transparent", "text-text"],
               innerWrapper: ["bg-transparent"],
               inputWrapper: ["shadow-xl", "backdrop-blur-xl", "backdrop-saturate-200"],
            }}
            className="md:w-[600px] w-full relative z-1"
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
         />
      </form>
   );

   let content;
   if (isLoading) {
      content = <p className="text-xl font-semibold text-center pt-20">Loading...</p>;
   } else if (isSuccess) {
      content = todos.map((todo) => (
         <article className="article flex mt-7 gap-3 justify-between items-center" key={todo.id}>
            <div className="flex gap-5 items-center">
               <Checkbox
                  size="lg"
                  id={todo.id.toString()}
                  onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                  defaultSelected={todo.completed}
                  color="primary"
               >
                  <label className="md:text-xl text-sm" htmlFor={todo.id.toString()}>{todo.title}</label>
               </Checkbox>
            </div>
            <div className="md:opacity-0 delete hover:opacity-100 transition ease-linear">
               <Button  isIconOnly size="sm" color="danger" aria-label="Delete" className="trash" onClick={() => deleteTodo({ id: todo.id })}>
                  <TrashIcon filled fill="#EEEEEE" width={15}/>
               </Button>
            </div>
         </article>
      ));
   } else if (isError) {
      content = (
         <p className="text-xl font-semibold text-center pt-20">
            Something went wrong <br /> Please try again
         </p>
      );
      console.error(error);
   }
   return (
      <div className={`${darkMode.value ? "dark" : ""} text-text bg-background font-montserrat `}>
         <div className="max-container px-3 min-h-[100vh]">
            <header className="flex items-center justify-between py-5">
               <h1 className="text-3xl font-bold">Todo List</h1>
               <div>
                  <Switch
                     defaultSelected
                     onValueChange={darkMode.toggle}
                     size="lg"
                     classNames={{ thumb: cn("bg-background"), wrapper: cn("bg-primary") }}
                     color="primary"
                     startContent={<SunIcon />}
                     endContent={<MoonIcon />}
                  ></Switch>
               </div>
            </header> 
            <main className="grid justify-center">
               {newItemSection}
               <div className="md-min-w-[700px] mt-5 mb-20">{content}</div>
            </main>
         </div>
      </div>
   );
};

export default ToDoList;
