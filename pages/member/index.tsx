import React, { useMemo, useEffect } from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import Head from "next/head";
import {
  PersonModelAttributes,
  statusOf,
  MemberStatusEnum,
} from "@/utils/Person";
import { useQuery } from "@apollo/react-hooks";
import { Button, Heading } from "react-bulma-components";
import { ServerSideProps } from "utils/getServerSideProps";
import ReactMarkdown from "react-markdown/with-html";
import toast from "utils/toast";
import ExecutiveSetup from "components/executiveSetup";
import MemberLayout from "layouts/memberLayout";
import IndexWrapper from "components/indexWrapper";
import personQuery from "apollo/queries/person/person.gql";
import countExecutivesQuery from "apollo/queries/executive/countExecutives.gql";
import socSettingsQuery from "apollo/queries/socSetting/socSettings.gql";

export { getMemberPageServerSideProps as getServerSideProps } from "utils/getServerSideProps";

const Index = ({ user, isAdmin }: ServerSideProps): React.ReactElement => {
  return (
    <IndexWrapper>
      <>
        <Head>
          <title>Hello</title>
        </Head>
        <div className="mb-5">Hello</div>
        <Button.Group className="is-justify-content-center">
          {isAdmin && (
            <Link href="/admin">
              <a href="/admin" className="button is-info">
                Admin Portal
              </a>
            </Link>
          )}
        </Button.Group>
      </>
    </IndexWrapper>
  );
};

Index.Layout = MemberLayout;

export default Index;
