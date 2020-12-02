export default (error: any, form: any, noti: any) => {
  if (!error) {
    return;
  }

  if (!error.response || !error.response.data) {
    return noti.error({
      message: "API lỗi",
    });
  }

  if (!error.response.data.messages) {
    return noti.error({
      message: "API trả định dạng sai lỗi",
    });
  }

  console.log(form);
  // nếu có form
  if (form) {
    const { messages } = error.response.data;
    let arrayError: any = [];
    Object.keys(messages).forEach((key) => {
      if (messages[key]) {
        arrayError.push({
          name: key,
          errors: [messages[key]],
        });
      }
    });
    form.setFields(arrayError);
    if (messages["otherMessage"]) {
      noti.error({
        message: messages["otherMessage"],
      });
    }
  } else {
    // lỗi bình thường
    const { messages } = error.response.data;
    Object.keys(messages).forEach((key) => {
      if (messages[key])
        noti.error({
          message: messages[key],
        });
    });
  }
};
