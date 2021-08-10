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

// 地区查询语言汇率
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
