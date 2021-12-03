import requestAdmin from "@/plugins/request-admin";
import requestShop from "@/plugins/request-shop";

// 查询折扣
export function queryDiscount() {
  return requestAdmin({
    url: "/portal/query_discount",
    method: "post",
  });
}

//用户订阅
export function userSubscribe(emailAddress) {
  return requestAdmin({
    url: "/portal/subscription",
    method: "post",
    data: {
      emailAddress,
    },
  });
}

// 语言汇率转换
export function queryLanguage(data) {
  return requestAdmin({
    url: "/portal/change_rate",
    method: "post",
    data: {
      language: data,
    },
  });
}

// 地区查询语言汇率
export function queryLocalLanguage() {
  return requestAdmin({
    url: "/portal/query_test",
    method: "get",
  });
}

export function trackViewBehavior({ type, id, origin, viewTime }) {
  return requestAdmin({
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
  return requestAdmin({
    url: "/portal/query_portals",
    method: "post",
    data: {
      sort,
    },
  });
}


export function queryProductsDetail({ productId, shopId }) {
  return requestShop({
    url: "/products/query/details",
    method: "post",
    headers: {
      shopid: shopId,
      "user-key": "3c406742-e6d2-4d76-abe0-5e43b499f7f9",
    },
    data: {
      query: {
        productId,
      },
    },
  });
}
