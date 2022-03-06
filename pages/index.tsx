import { nanoid } from "nanoid";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(`${nanoid()}`);
  });
  return null;
};

export default Home;
