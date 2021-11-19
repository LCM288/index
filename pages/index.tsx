import React, { useMemo, useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  isAdmin,
  getUserAndRefreshToken,
  getSetting,
  getSettingWithTime,
  countExecutives,
  deleteNewAPIKey,
  NEW_CLIENT_ID_KEY,
  CLIENT_ID_KEY,
} from "utils/auth";
import IndexWrapper from "components/indexWrapper";
import { DateTime } from "luxon";
import ReactMarkdown from "react-markdown/with-html";
import toast from "utils/toast";
import { useQuery } from "@apollo/react-hooks";
import { Heading, Button } from "react-bulma-components";

import socSettingsQuery from "apollo/queries/socSetting/socSettings.gql";

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
    props: {
    },
  };
};

function Index(): React.ReactElement {
  return (
    <IndexWrapper>
      <>
        <Head>
          <title>Welcome to Index</title>
        </Head>
        {(
          <div className="mb-5">
            Hello
          </div>
        )}
        <Button color="link" size="medium">
          This will be a login button
        </Button>
      </>
    </IndexWrapper>
  );
}

export default Index;
