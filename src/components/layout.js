/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import { Helmet } from 'react-helmet';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <html className="dark" lang="en"/>
      </Helmet>
      <div className="dark flex min-h-screen flex-col">
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main className="my-auto p-4">{children}</main>
        <footer className="mt-auto p-2 text-center">
          © {new Date().getFullYear()} <a href="https://github.com/lukpaikat">lukpaikat</a> &middot; Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
