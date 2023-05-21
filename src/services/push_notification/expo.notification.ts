import axios from "axios";
import { Request, Response } from "express";
// import { Expo } from "expo-server-sdk";
// import ExpoTokens from "../../models/expoTokens";

class pushNotification {
  async sendPushNotification(req: Request) {
    const message = req.body;
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      JSON.stringify(message),
      {
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
}
export default pushNotification;
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
