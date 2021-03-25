import "./App.css";
import "@ionic/react/css/core.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Payment from "./Payment";

const App = () => {
  const history = useHistory();
  const parameters = (val) => {
    try {
      var options = {
        key: "rzp_test_CkTcdYrM3W9JWD",
        amount: val.get("amount") * 100,
        currency: "INR",
        name: val.get("Companyname"),
        description: val.get("transaction"),
        image: "https://example.com/your_logo",
        handler: async function (response) {
          alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          // let redirect_url = "";
          // if (typeof response.razorpay_payment_id !== "undefined")
          //   history.push("/callback");

          // location.href = redirect_url;
        },
        prefill: {
          name: val.get("name"),
          email: val.get("email"),
          contact: val.get("number"),
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    } catch (e) {console.log(e)}
  };
  return (
    <Router>
      <div className="App">
        <Switch>
          {
            <Route exact path="/">
              Home Page - go to pay route
            </Route>
          }
          <Route path="/pay">
            <Payment parameters={parameters} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
