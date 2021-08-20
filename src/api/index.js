// 查询折扣
import request from "@/plugins/request";

// 查询折扣
export function queryDiscount() {
  return request({
    url: "/portal/query_discount",
    method: "post",
  });
}

//用户订阅
export function userSubscribe(emailAddress) {
  return request({
    url: "/portal/subscription",
    method: "post",
    data: {
      emailAddress,
    },
  });
}

// 语言汇率转换
export function queryLanguage(data) {
  return request({
    url: "/portal/change_rate",
    method: "post",
    data: {
      language: data,
    },
  });
}

// 地区查询语言汇率
export function queryLocalLanguage() {
  return request({
    url: "/portal/query_test",
    method: "get",
  });
}

export function trackViewBehavior({ type, id, origin, viewTime }) {
  return request({
    url: "/analyze/portal/visit/view",
    method: "post",
    data: {
      id: id ?? null,
      origin: origin ?? null,
      type: type,
      viewTime: viewTime ?? null,
    },
  });
}

export function queryPortalProducts(sort = null) {
  return request({
    url: "/portal/query_portals",
    method: "post",
    data: {
      sort,
    },
  });
}
