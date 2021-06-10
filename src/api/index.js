// 查询折扣
import request from "@/plugins/request";

// 查询折扣

export function queryDiscount() {
  return request({
    url: "/portals/query_discount",
    method: "post",
  });
}

//用户订阅
export function userSubscribe(data) {
  return request({
    url: "/portals/send_discount_email",
    method: "post",
    data,
  });
}

// 语言汇率转换
export function queryLanguage(data) {
  return request({
    url: "/portals/change_rate",
    method: "post",
    data: {
      language: data,
    },
  });
}

// 地区查询语言汇率
// export function queryLocalLanguage(data) {
//   return request({
//     url: "/portals/query_language_rate",
//     method: "post",
//     data: {
//       country: data,
//     },
//   });
// }
// 地区查询语言汇率


export function queryLocalLanguage() {
  return request({
    url: "/portals/query_test",
    method: "get",
  });
}
