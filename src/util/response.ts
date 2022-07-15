export class Response {
  static success(message: string, statusCode: number, data: {}, res: any) {
    return res.status(statusCode).json({
      status: true,
      statusCode,
      message,
      data,
    });
  }

  static error(message: string, statusCode: number, res: any) {
    return res.status(statusCode).json({
      status: false,
      statusCode,
      message,
    });
  }

  static renderPage(message: string, data: {}, res: any) {
    return res.json({
      message,
      data,
    });
  }

  static renderAddStory(
    page: string,
    pageTitle: string,
    editing: boolean,
    hasError: boolean,
    validationError: string[],
    errorMsg: string,
    story: {},
    tags: string,
    res: any
  ) {
    return res.render(page, {
      pageTitle,
      editing,
      hasError,
      validationError,
      errorMsg,
      story,
      tags,
    });
  }
}
