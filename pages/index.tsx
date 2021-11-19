import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { isAdmin, getUserAndRefreshToken } from "utils/auth";
import IndexWrapper from "components/indexWrapper";
import { Button } from "react-bulma-components";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUserAndRefreshToken(ctx);
  if (user) {
    if (await isAdmin(user)) {
      ctx.res.statusCode = 307;
      ctx.res.setHeader("Location", "/admin");
      return { props: { baseUrl: "", clientId: "" } };
    }
    ctx.res.statusCode = 307;
    ctx.res.setHeader("Location", "/member");
    return { props: { baseUrl: "", clientId: "" } };
  }
  return {
    props: {},
  };
};

function Index(): React.ReactElement {
  return (
    <IndexWrapper>
      <>
        <Head>
          <title>Welcome to Index</title>
        </Head>
        {<div className="mb-5">Hello</div>}
        <Button color="link" size="medium">
          This will be a login button
        </Button>
      </>
    </IndexWrapper>
  );
}

export default Index;
