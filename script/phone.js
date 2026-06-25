const scanner = new Html5QrcodeScanner(
    "reader",
    {
        fps: 10,
        qrbox: 250
    }
);

scanner.render(onScanSuccess);

function onScanSuccess(decodedText) {

    const payment = JSON.parse(localStorage.getItem("pendingPayment"));

    if (!payment) {
        alert("No pending payment found.");
        return;
    }

    if (decodedText === payment.transactionId) {

        payment.status = "paid";

        localStorage.setItem(
            "pendingPayment",
            JSON.stringify(payment)
        );

        alert("Payment Successful!");

        window.close();

    } else {

        alert("Invalid QR Code");

    }

}