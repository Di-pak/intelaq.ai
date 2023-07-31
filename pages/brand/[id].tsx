import React, { useEffect, useState } from "react";
import BrandCreation from "./index";
import { useRouter } from "next/router";
import { getBrand } from "@/services/brand-service";

function EditBrand() {
  const [data, setData] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();
  const { id }: any = router.query;

  useEffect(() => {
    if (!id) return;
    getBrand(id)
      .then((res) => {
        setData(res);
        setloading(false);
      })
      .catch(() => {
        setloading(false);
      });
  }, [id]);
  if (loading) return <p>loading...</p>;

  return <BrandCreation data={data} isEdit />;
}

export default EditBrand;
