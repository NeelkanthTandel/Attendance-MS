const https = require("https");
/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
const PaytmChecksum = require("paytmchecksum");

var paytmParams = {};

paytmParams.body = {
  requestType: "Payment",
  mid: "ELhFCX01068787951869",
  websiteName: "WEBSTAGING",
  orderId: "ORDERID_98765Neelkanth",
  callbackUrl: "http://localhost:5000/callback",
  txnAmount: {
    value: "1.00",
    currency: "INR",
  },
  userInfo: {
    custId: "CUST_001",
  },
};

/*
 * Generate checksum by parameters we have in body
 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
 */
PaytmChecksum.generateSignature(
  JSON.stringify(paytmParams.body),
  "zPx&uG@bJUNNet2G"
).then(function (checksum) {
  paytmParams.head = {
    signature: checksum,
    channelId: "WAP",
  };

  var post_data = JSON.stringify(paytmParams);

  var options = {
    /* for Staging */
    hostname: "securegw-stage.paytm.in",

    /* for Production */
    // hostname: 'securegw.paytm.in',

    port: 443,
    path: "/theia/api/v1/initiateTransaction?mid=ELhFCX01068787951869&orderId=ORDERID_98765Neelkanth",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": post_data.length,
    },
  };

  var response = "";
  var post_req = https.request(options, function (post_res) {
    post_res.on("data", function (chunk) {
      response += chunk;
    });

    post_res.on("end", function () {
      console.log("Response: ", response);
    });
  });

  post_req.write(post_data);
  post_req.end();
});
