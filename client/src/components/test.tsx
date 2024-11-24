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

  // input用
  const test = trpc.helloName.useQuery({ name: 'John', age: 10 });
  console.log(test.data);

  const { data: todos } = trpc.todos.useQuery();

  return (
    <>
      <div>hello: {hello.data}</div>
      <div>hello2: {hello2}</div>

      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
    
  )
};

export default Test;
