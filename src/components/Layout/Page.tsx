import React, { useEffect, useState } from "react";
import { FullScreenLoader } from "..";
import ErrorPage from "./ErrorPage";

interface PageProps {
  children: React.ReactNode;
  loading?: boolean;
  errorRes?: Error | null | undefined;
  clsName?: string;
  error: boolean;
}

const Page = ({
  children,
  loading = false,
  errorRes,
  error = false,
  clsName,
}: PageProps) => {
  const [animate, setAnimate] = useState<boolean>(true);

  // page transition animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (loading) return <FullScreenLoader />;

  if (error) {
    // console.log(errorRes);
    return <ErrorPage errorRes={errorRes} />;
  }

  /**
   * TSX
   */
  return (
    <div
      className={`PAGE__TRANSITION ${clsName} ${
        animate ? "animate" : ""
      }  mt-5 mx-5 lg:mt-6 h-full`}
    >
      <div className={`h-full m-auto`}>
        {children}
        <br />
        <br />
      </div>
    </div>
  );
};

export default Page;
