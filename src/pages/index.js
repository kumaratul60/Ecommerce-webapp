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

// getServerSideProps() -> that function makes a virtual a server that server calculate the page and render to browser. That server is also knows
// serverSideRendering.

// getServerSideProps() -> that function is also define the that is no longer static page, it needs the middle server step.

// it means the first calculate the something on server(which request made by client),
// second render out the page ,
//third deliver at to user on the page, rather than just sending the entire site to the user.

// context -> fetching the data

// fetch -> fetch is a built in function and it's await because it's going to be an asynchronous call.

//  res.json() -> it give data back in json format.

// Why server side redering ->  because we want to load all listed product intently when page rerender or refresh.

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      // keys: values ---> if both same then it can write like this: key,
      // products: products,
      // products: "products",
      products,
    },
  };
}
