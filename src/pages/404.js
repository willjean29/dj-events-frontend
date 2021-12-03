import Layout from "components/Layout";
import React from "react";
import Link from "next/link";
import styles from "styles/404.module.css";
import { FaExclamationTriangle } from "react-icons/fa";
function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Sorry, there is nothng here</h4>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
