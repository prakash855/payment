import "./App.css";
import { IonButton } from "@ionic/react";
import { Component } from "react";
import "@ionic/react/css/core.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Payment from "./Payment";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const _DEV_ = document.domain === "localhost";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backclick: 0,
      toastMessage: "",
      toastColor: "",
      showToast: false,
      doctorName: "Jamie Anderson",
      bookingDate: "27-01-2021",
      consultationFee: "",
      reason: "Tooth Pain",
    };
    console.log(this.props);
  }
  displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: _DEV_ ? "rzp_test_OYh9Tcq2uxIzE6" : "PRODUCTION_KEY",
      amount: this.state.consultationFee * 100,
      // order_id: "order_GhHq98sG8CLTW9",
      name: "Consultation Fee",
      description: "Thank you..",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        email: "dentamitra@gmail.com",
        phone_number: "9876543210",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  parameters = (val) => {
    console.log(
      `the value of amout entered is ${val.get("amount")}, number ${val.get(
        "number"
      )} and email is ${val.get("email")}`
    );
    this.setState(pre=>{
      pre.consultationFee = val.get('amount')
    })
  };

  // sendParameters=(val)=>
  // {
  //   this.setState(pre=>{
  //     console.log(pre)
  //   })
  // }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              {console.log(this.state)}
              <IonButton
                onClick={this.displayRazorpay}
                className="book-consultation"
              >
                PAY {this.state.consultationFee}
                {/* {JSON.stringify(this.props)} */}
              </IonButton>
            </Route>
            {/* <Route path="/pay" component={<Payment sendParameters={this.sendParameters}/>}></Route> */}
            <Route path="/pay">
              <Payment
                method={this.displayRazorpay}
                parameters={this.parameters}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
