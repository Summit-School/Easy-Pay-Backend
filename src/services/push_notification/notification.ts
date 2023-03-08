import axios from "axios";

export async function sendNotification(
  notification: { title: string; description: string },
  receipientIds?: string[]
) {
  const body = {
    app_id: "569f46f6-6763-42f9-bbef-d73e294f4866",
    // "include_external_user_ids": [receiver.email],
    included_segments: receipientIds ? receipientIds : ["Subscribed Users"],

    data: {
      notification,
    },
    contents: {
      en: notification.description,
    },
  };

  const options = {
    url: `${"https://onesignal.com/api/v1"}/${"notifications"}`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Basic ${"ZThlZmY5OTgtNWQwZC00MDVlLThjMDUtMTYwMjVkYWRkMWIx"}`,
    },
  };

  return axios.post(options.url, body, { headers: options.headers });
}
