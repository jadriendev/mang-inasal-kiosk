const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function exportCollection(name) {
  const snapshot = await db.collection(name).get();
  const data = [];

  snapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
}

async function exportFirestore() {
  const database = {
    orders: await exportCollection("orders"),
    payments: await exportCollection("payments"),
    products: await exportCollection("products"),
  };

  fs.writeFileSync("database.json", JSON.stringify(database, null, 2));

  console.log("Export complete! Saved as database.json");
}

exportFirestore().catch(console.error);