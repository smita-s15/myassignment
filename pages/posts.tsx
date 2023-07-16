import React from "react";
import { useRouter } from "next/router";
import CommonSection from "@/components/CommonSection";

function gallery() {
  const router = useRouter();
  const id = router.query.id;
  return <CommonSection pagetitle="Posts" />;
}

export default gallery;
