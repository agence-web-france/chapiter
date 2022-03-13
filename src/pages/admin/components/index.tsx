import { Component, PrismaClient } from "@prisma/client";
import ComponentsList from "components/admin/ComponentsList/ComponentsList";
import type { NextPage } from "next";

type ComponentsPageProps = {
  components: Component[];
};

const ComponentsPage: NextPage<ComponentsPageProps> = ({ components }) => {
  return <>{<ComponentsList components={components} />}</>;
};

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const components = await prisma.component.findMany();
  return {
    props: {
      components,
    },
  };
}

export default ComponentsPage;
