import axios from "axios";
// import { Expo } from "expo-server-sdk";
// import ExpoTokens from "../../models/expoTokens";

export async function sendPushNotification(data: any) {
  const response = axios
    .post("https://exp.host/--/api/v2/push/send", JSON.stringify(data), {
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

  // return response;

  // await fetch("https://exp.host/--/api/v2/push/getReceipts", {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     Accept: "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     "Accept-encoding": "gzip, deflate",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(message),
  // });
}

// export async function sendPushNotification(notification: { body: string }) {
//   let messages = [];
//   let somePushTokens: Array<any> = [];
//   try {
//     const tokens = await ExpoTokens.find({});
//     tokens.map((tk) => somePushTokens.push(tk.token));

//     for (let pushToken of somePushTokens) {
//       // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

//       // Check that all your push tokens appear to be valid Expo push tokens
//       if (!Expo.isExpoPushToken(pushToken)) {
//         console.error(`Push token ${pushToken} is not a valid Expo push token`);
//         continue;
//       }

//       // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
//       messages.push({
//         to: pushToken,
//         sound: "default",
//         body: notification.body,
//         data: { withSome: "data" },
//       });
//     }

//     const options = {
//       url: `https://exp.host/--/api/v2/push/send`,
//       headers: {
//         Accept: "application/json",
//         "Accept-encoding": "gzip, deflate",
//         "Content-Type": "application/json",
//       },
//     };

//     return axios.post(options.url, messages, {
//       headers: options.headers,
//     });
//   } catch (error) {
//     return console.error(error);
//   }
// }
