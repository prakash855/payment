import "./App.css";
import { IonButton } from "@ionic/react";
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
        <a href="https://wa.me/918559075258"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Whatsapp</title><path d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z" fill-rule="evenodd"/></svg></a>
        <IonButton href="tel:+918559075258">call</IonButton>
      </div>
    );
  }
}

export default App;
