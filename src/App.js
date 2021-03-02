import "./App.css";
import { IonButton, IonRouterLink } from "@ionic/react";
import { Component } from "react";
import '@ionic/react/css/core.css';

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
      consultationFee: "50000",
      reason: "Tooth Pain",
    };
  }
  displayRazorpay = async () => {
    const res = await loadScript(
      "https://dashboard.razorpay.com/#/access/signin?email=sp@dentamitra.com"
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

  render() {
    return (
      <div className="App">
        <IonButton onClick={this.displayRazorpay} className="book-consultation">
          PAY {this.state.consultationFee}
        </IonButton>
        <IonButton href='https://web.whatsapp.com'>whatsapp</IonButton>
        <ion-icon ios="logo-whatsapp" md="logo-whatsapp"></ion-icon>
      </div>
    );
  }
}

export default App;
