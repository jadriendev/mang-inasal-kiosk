import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const html5QrCode = new Html5Qrcode("reader");

Html5Qrcode.getCameras()
.then(devices => {

    if (devices && devices.length) {

        html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: 250
            },
            async (decodedText) => {

                const paymentRef = doc(
                    db,
                    "payments",
                    decodedText
                );

                const paymentSnap = await getDoc(
                    paymentRef
                );

                if (!paymentSnap.exists()) {
                    alert("Invalid QR Code");
                    return;
                }

                await updateDoc(
                    paymentRef,
                    {
                        status: "paid"
                    }
                );

                await html5QrCode.stop();

                alert("Payment Successful!");

                window.close();

            }
        );

    }

})
.catch(err => {
    console.log(err);
});