import { Progress, Spinner } from "@chakra-ui/react";
import React from "react";

export default function loading() {
  return (
    <section className=" h-svh w-svw">
      <div className=" h-screen w-screen flex items-center justify-center">
      <Progress size="md" isIndeterminate />
        {/* <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        /> */}
      </div>
    </section>
  );
}
