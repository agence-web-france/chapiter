import { PrismaClient } from "@prisma/client";
import { GetStaticPropsContext, NextPage } from "next";
import { Component } from "react";

type ComponentPageProps = {
  component: Component;
};

const ComponentPage: NextPage<ComponentPageProps> = ({ component }) => {
    console.log(component)
  return <></>;
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: any) {
  const prisma = new PrismaClient();
  const component = await prisma.component.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return {
    props: {
      component,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const components = await prisma.component.findMany();

  // Get the paths we want to pre-render based on posts
  const paths = components.map((component) => ({
    params: { id: `${component.id}` },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export default ComponentPage;
