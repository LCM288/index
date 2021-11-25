import { User } from "@/types/datasources";
import { GetServerSideProps } from "next";
import { getUserAndRefreshToken, isAdmin, getJWTToken } from "utils/auth";

export interface ServerSideProps {
  user: User;
  isAdmin: boolean;
}

export const getMemberPageServerSideProps: GetServerSideProps<ServerSideProps> =
  async (ctx) => {
    const token = getJWTToken(ctx.req);
    const userIsAdmin = Boolean(token && (await isAdmin(token)));
    const user = await getUserAndRefreshToken(ctx);
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return {
      props: { user, isAdmin: userIsAdmin }, // will be passed to the page component as props
    };
  };

export const getAdminPageServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getJWTToken(ctx.req);
  const userIsAdmin = Boolean(token && (await isAdmin(token)));
  const user = await getUserAndRefreshToken(ctx);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  if (!userIsAdmin) {
    return {
      redirect: {
        permanent: false,
        destination: "/member",
      },
    };
  }
  return { props: { user, isAdmin: userIsAdmin } };
};
