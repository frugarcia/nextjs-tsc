// Dependencies
import { GetStaticProps } from "next";
import Link from "next/link";

import { User } from "../../interfaces";
// import { sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";

type Props = {
  users?: User[];
  errors?: string;
};

const WithStaticProps = ({ users, errors }: Props) => {
  if (errors) return null;
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Users List</h1>
      <p>
        Example fetching data from inside <code>getStaticProps()</code>.
      </p>
      <p>You are currently on: /users</p>
      <List items={users} />
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  // https://gorest.co.in/public/v1/users

  try {
    const response = await fetch("https://gorest.co.in/public/v1/users");
    const data = await response.json();
    const users = data["data"];
    return { props: { users } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default WithStaticProps;
