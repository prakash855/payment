import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";

const useQuery=()=>new URLSearchParams(useLocation().search)
const Payment = (props) => {
  const query = useQuery()
  props.parameters(query)
    useEffect(() => {
        props.method()
      },[props]);
    // return '<div>{JSON.stringify(props)}</div>'
    return ''
}

export default Payment










// import React, { useEffect ,useState} from "react";
// import queryString from "query-string";
// import { useParams } from "react-router-dom";
// const Payment = (props) => {

//   const [data , setData]= useState()
//   console.log(props);
//   let a = useParams();
//   useEffect(() => {
//       const parsed = queryString.parse(props.location.search)
//       setData(parsed);
//   }, []);

//   props.sendParameters(data)
//   return (
//     <div>
//       {JSON.stringify(props)} - {JSON.stringify(a)}
//     </div>
//   );
// };

// export default Payment;
