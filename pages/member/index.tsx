import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "react-bulma-components";
import { ServerSideProps } from "utils/getServerSideProps";
import MemberLayout from "layouts/memberLayout";
import IndexWrapper from "components/indexWrapper";

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
