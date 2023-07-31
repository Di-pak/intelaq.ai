import { getProject } from "@/services/project-service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProjectSubmission from "../add";

function editProject() {
  const [data, setData] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();
  const { id }: any = router.query;

  useEffect(() => {
    if (!id) return;
    getProject(id)
      .then((res) => {
        setData(res);
        setloading(false);
      })
      .catch(() => {
        setloading(false);
      });
  }, [id]);
  if (loading) return <p>loading...</p>;
  return <ProjectSubmission data={data} isEdit />;
}

export default editProject;
