import { trpc } from "../utils/trpc";

const Test = () => {
  const hello = trpc.hello.useQuery();
  console.log(hello);

  return (
    <div>{hello.data}</div>
  )
};

export default Test;
