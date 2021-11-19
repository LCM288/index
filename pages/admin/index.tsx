import React, { useMemo, useEffect } from "react";
import { DateTime } from "luxon";
import AdminLayout from "layouts/adminLayout";
import { useQuery } from "@apollo/react-hooks";
import { Heading } from "react-bulma-components";
import {
  PersonModelAttributes,
  statusOf,
  MemberStatusEnum,
} from "@/utils/Person";
import Link from "next/link";
import Head from "next/head";
import IndexWrapper from "components/indexWrapper";
import { ServerSideProps } from "utils/getServerSideProps";
import toast from "utils/toast";
import personQuery from "apollo/queries/person/person.gql";
import socSettingsQuery from "apollo/queries/socSetting/socSettings.gql";

export { getAdminPageServerSideProps as getServerSideProps } from "utils/getServerSideProps";

const Index = ({ user }: ServerSideProps): React.ReactElement => {
  if (user) {
    return (
      <IndexWrapper>
        <>
          <Head>
            <title>Hello</title>
          </Head>
          <div className="mb-5">Hello</div>
          <Link href="/member">
            <a href="/member" className="button is-warning">
              Member Page
            </a>
          </Link>
        </>
      </IndexWrapper>
    );
  }
  return <></>;
};

Index.Layout = AdminLayout;

export default Index;
