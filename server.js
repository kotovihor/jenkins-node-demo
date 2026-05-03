const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Jenkins Pipeline + Minikube!");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "jenkins-node-demo"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});