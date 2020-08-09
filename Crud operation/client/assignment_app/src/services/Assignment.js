import BaseService from "./BaseService";

class Service extends BaseService {
  constructor() {
    super("assignments");
  }
  totalCount = () => {
    return this.request({ url: "totalCount", method: "GET" });
  };
  countBySubject = async () => {
    const resultData = await this.request({
      url: "count-by-subject",
      method: "GET",
    });
    console.log(
      "Assignment.js-->countBySubject->request->resultData ",
      resultData
    );
    return resultData;
  };
}

export default Service;
