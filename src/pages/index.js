import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const products = await fetch("https://fakestoreapi.com/products")
    .then(
      (res) => res.json()

      // (res) => res.json(JSON.stringify())
    )
    .catch((error) => console.log(error));

  return {
    props: {
      // keys: values ---> if both same then it can write like this: key,
      // products: products,
      // products: "products",
      products,
      session,
    },
  };
}

// getServerSideProps() -> that function makes a virtual a server that server calculate the page and render to browser. That server is also knows serverSideRendering. The page is pre-rendered at run time

// getServerSideProps() -> that function is also define the that is no longer static page, it needs the middle server step. The page is pre-rendered at build time

// it means the first calculate the something on server(which request made by client), second render out the page ,third deliver at to user on the page, rather than just sending the entire site to the user.

// context -> fetching the data

// fetch -> fetch is a built in function and it's await because it's going to be an asynchronous call.

// async -> use to return promise

//  await -> use to wait and handle promise

//  res.json() -> it give data back in json format.

// res.json(JSON.stringify()) -> This will eliminate JSON error in the console

// Why server side rendering ->  because we want to load all listed product intently when page re-render or refresh.
