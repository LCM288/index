import React from "react";
import AdminLayout from "layouts/adminLayout";
import Link from "next/link";
import Head from "next/head";
import IndexWrapper from "components/indexWrapper";
import { ServerSideProps } from "utils/getServerSideProps";
import { useSetLogoutTimer } from "utils/useTimerState";

export { getAdminPageServerSideProps as getServerSideProps } from "utils/getServerSideProps";

const Index = ({ user }: ServerSideProps): React.ReactElement => {
  useSetLogoutTimer(user.exp);
  return (
    <IndexWrapper>
      <>
        <Head>
          <title>Hello</title>
        </Head>
        <div className="mb-5">Hello, {user.name}</div>
        <Link href="/member">
          <a href="/member" className="button is-warning">
            Member Page
          </a>
        </Link>
      </>
    </IndexWrapper>
  );
};

Index.Layout = AdminLayout;

export default Index;
