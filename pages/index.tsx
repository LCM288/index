import React, { useMemo } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getUserFromRequest } from "utils/auth";
import IndexWrapper from "components/indexWrapper";
import { Button } from "react-bulma-components";
import getMicrosoftLoginLink from "utils/microsoftLogin";

interface Props {
  baseUrl: string;
  clientId?: string | undefined;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const user = await getUserFromRequest(ctx.req);
  if (user) {
    if (user.isAdmin) {
      return { redirect: { permanent: false, destination: "/admin" } };
    }
    return { redirect: { permanent: false, destination: "/member" } };
  }
  const { host = "" } = ctx.req.headers;
  const protocol = /^localhost/g.test(host) ? "http" : "https";
  const baseUrl = `${protocol}://${ctx.req.headers.host}`;
  const clientId = process.env.CLIENT_ID;
  return {
    props: { baseUrl, ...(clientId && { clientId }) },
  };
};

function Index({ baseUrl, clientId }: Props): React.ReactElement {
  const link = useMemo(
    () => (clientId ? getMicrosoftLoginLink({ baseUrl, clientId }) : ""),
    [baseUrl, clientId]
  );

  return (
    <IndexWrapper>
      <>
        <Head>
          <title>Welcome to Index</title>
        </Head>
        {<div className="mb-5">Hello</div>}
        {link ? (
          <Button color="link" href={link} size="medium" renderAs="a">
            Login with CUHK OnePass
          </Button>
        ) : (
          <Button color="danger" size="medium">
            Fail to generate login llink
          </Button>
        )}
      </>
    </IndexWrapper>
  );
}

export default Index;
