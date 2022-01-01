import { GetStaticProps, GetStaticPaths } from "next";

import { User } from "../../interfaces";
// import { sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import ListDetail from "../../components/ListDetail";

type Props = {
  user?: User;
  errors?: string;
};

const StaticPropsDetail = ({ user, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        user ? user.name : "User Detail"
      } | Next.js + TypeScript Example`}
    >
      {user && <ListDetail item={user} />}
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users

  const response = await fetch("https://gorest.co.in/public/v1/users");
  const data = await response.json();
  const users = data["data"];
  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const response = await fetch(`https://gorest.co.in/public/v1/users/${id}`);
    const data = await response.json();
    const user = data["data"];
    return { props: { user } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
