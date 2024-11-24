import { trpc } from "../utils/trpc";

import { appRouter } from "../../../server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { useEffect, useState } from "react";

const client = createTRPCProxyClient<appRouter> ({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

const Test = () => {
  const hello = trpc.hello.useQuery();
  console.log(hello);

  const [hello2, setHello2] = useState('');

  useEffect(() => {
    const getHello2 = async () => {
      setHello2( await client.hello.query() );
      console.log(hello2);
    };

    getHello2();
  }, []);

  const utils = trpc.useContext();
  const addTodo = trpc.addTodo.useMutation({
    onSuccess: () => {
      utils.todos.invalidate();
    }
  });

  const handleKeyDown = (e) => {
    const name = e.target.value;
    if  (e.key === 'Enter' && name) {
      console.log('name', name);

      addTodo.mutate({ name });
      e.target.value = '';
    }
  };

  // input用
  const test = trpc.helloName.useQuery({ name: 'John', age: 10 });
  console.log(test.data);

  const { data: todos } = trpc.todos.useQuery();

  return (
    <>
      <div>hello: {hello.data}</div>
      <div>hello2: {hello2}</div>

      <h1>Todo</h1>
      <div>
        <lable id="name">Add Todo:</lable>
        <input name="name" onKeyDown={handleKeyDown} />
      </div>
      
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
    
  )
};

export default Test;
