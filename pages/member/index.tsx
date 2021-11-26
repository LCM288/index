import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "react-bulma-components";
import { ServerSideProps } from "utils/getServerSideProps";
import MemberLayout from "layouts/memberLayout";
import IndexWrapper from "components/indexWrapper";
import { useSetLogoutTimer } from "utils/useTimerState";

export { getMemberPageServerSideProps as getServerSideProps } from "utils/getServerSideProps";

const Index = ({ user }: ServerSideProps): React.ReactElement => {
  useSetLogoutTimer(user.exp);
  return (
    <IndexWrapper>
      <>
        <Head>
          <title>Hello</title>
        </Head>
        <div className="mb-5">Hello, {user.name}!</div>
        <Button.Group className="is-justify-content-center">
          {user.isAdmin && (
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
