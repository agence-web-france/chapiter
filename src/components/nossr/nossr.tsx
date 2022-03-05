import dynamic from "next/dynamic";
import React from "react";

const NoSsr = (props: any) => <React.Fragment>{props.children}</React.Fragment>;

const DynamicComponentWithNoSSR = dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});

export default DynamicComponentWithNoSSR