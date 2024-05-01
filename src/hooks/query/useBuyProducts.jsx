import { useQuery } from "@tanstack/react-query";
import { getReq } from "../../utils/api/api";

const useBuyProducts = () => {
  const query = useQuery({
    queryKey: ["Buy Products"],
    queryFn: () => getReq("/payment/success"),
    staleTime: Infinity,
  });

  return query;
};

export default useBuyProducts;
