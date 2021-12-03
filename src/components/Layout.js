import React from "react";
import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "styles/Layout.module.css";
import ShowCase from "components/ShowCase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
function Layout({ title, description, keywords, children }) {
  const router = useRouter();
  // console.log(router);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <ShowCase />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find the lasted DJ and other musical events",
  keywords: "music, dj, events",
};

export default Layout;
