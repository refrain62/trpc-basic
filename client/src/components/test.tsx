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

  return (
    <>
      <div>hello: {hello.data}</div>
      <div>hello2: {hello2}</div>
    </>
    
  )
};

export default Test;
