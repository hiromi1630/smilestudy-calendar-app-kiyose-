// https://developers.line.biz/ja/reference/messaging-api/#webhook-event-objects

type DoPost = {
  queryString: string;
  parameter: { [key: string]: string };
  parameters: { [key: string]: string[] };
  contextLength: number;
  postData: {
    length: number;
    type: string;
    contents: string;
    name: 'postData';
  };
};

const doPost = (e: DoPost) => {
  const eventData = JSON.parse(e.postData.contents).events[0];
  if (eventData.type == 'message' && eventData.message.text == '授業予定') {
    //今日の授業予定を送信
    const replyToken = eventData.replyToken;
    postTodayLessons(replyToken);
  }
};

const postReplyWithLineBot = (text: string, replyToken: string) => {
  const { LINE_BOT_ACCESS_TOKEN, LINE_GROUP_ID } = getScriptProperties();

  const postData = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: text,
      },
    ],
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + LINE_BOT_ACCESS_TOKEN,
    },
    payload: JSON.stringify(postData),
  };

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', options);
};

const postTextWithLineBot = (text: string) => {
  const { LINE_BOT_ACCESS_TOKEN, LINE_GROUP_ID } = getScriptProperties();

  const postData = {
    to: LINE_GROUP_ID,
    messages: [
      {
        type: 'text',
        text: text,
      },
    ],
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + LINE_BOT_ACCESS_TOKEN,
    },
    payload: JSON.stringify(postData),
  };

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', options);
};

const getEventsByDate = (
  date: Date,
): {
  time: string;
  teacher: string;
  classroom: string;
}[] => {
  const data = loadDataFromSheet(false);

  const dateString = date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const events = data.main
    .filter(
      (v) =>
        new Date(v[1]).toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) === dateString,
    )
    .reduce((acc, v) => {
      acc.push({
        time: v[2],
        teacher: data.teachers.find((e) => e[0] === v[4])?.[1],
        classroom: data.classrooms.find((e) => e[0] === v[5])?.[1],
      });
      return acc;
    }, []);

  return events;
};

const postTodayLessons = (replyToken: string) => {
  const events = getEventsByDate(new Date());

  let latestTime: string | undefined = undefined;
  let text = '本日の授業一覧\n';
  for (const event of events) {
    const time = new Date(event.time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    if (latestTime === undefined || latestTime !== time) {
      latestTime = time;
      text += `\n --- ${latestTime} ---\n`;
    }

    text += `  ${event.teacher} - ${event.classroom}\n`;
  }
  

  postReplyWithLineBot(text, replyToken);
};

const postMonthlyAnnounce = () => {
  postTextWithLineBot(`【定期連絡】

  お疲れ様です。
  来月の授業予定について Comiru での連絡締切が5日後になっております。
  よろしくお願いいたします。`);
};
