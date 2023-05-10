import React from "react";
import Link from "next/link";

const IndexPage = () => {
  return (
    <div>
      <h1>Welcome to the Landing Page!</h1>
      <Link href="/purchase">
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>
          Go to Purchase Page
        </span>
      </Link>
    </div>
  );
};

export default IndexPage;
