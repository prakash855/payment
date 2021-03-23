import React, { useEffect } from 'react'

const Payment = (props) => {
    useEffect(() => {
        props.fun()
      },[]);
    return <div>{JSON.stringify(props)}</div>
}

export default Payment


// import React, { useEffect } from "react";
// import queryString from "query-string";
// import { useParams } from "react-router-dom";
// const Payment = (props) => {
//   console.log(props);
//   let a = useParams();
//   useEffect(() => {
//       const parsed = queryString.parse(props.location.search)
//     console.log(parsed);
//   }, []);
//   return (
//     <div>
//       {JSON.stringify(props)} - {JSON.stringify(a)}
//     </div>
//   );
// };

// export default Payment;
