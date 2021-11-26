import { User } from "@/types/datasources";
import { GetServerSideProps } from "next";
import { getUserAndRefreshToken, isAdmin } from "utils/auth";

export interface ServerSideProps {
  user: User;
  isAdmin: boolean;
}

export const getMemberPageServerSideProps: GetServerSideProps<ServerSideProps> =
  async (ctx) => {
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
      props: { user, isAdmin: isAdmin(user) }, // will be passed to the page component as props
    };
  };

export const getAdminPageServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUserAndRefreshToken(ctx);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  if (!isAdmin(user)) {
    return {
      redirect: {
        permanent: false,
        destination: "/member",
      },
    };
  }
  return { props: { user, isAdmin: true } };
};
