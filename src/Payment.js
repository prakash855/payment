import { useLocation } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);
const Payment = (props) => {
  const query = useQuery();
  props.parameters(query);
  return "";
};

export default Payment;
