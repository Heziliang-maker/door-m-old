/*
 * @Date: 2021-11-16
 * @Description:
 */
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-200232091-1", {
  linker: {
    domains: ["buykop.com", "ecofili.com"],
  },
});
//包装url search
window.packing = function(url) {
  let locationSearch = {};
  decodeURIComponent(url)
    .slice(1)
    .split("&")
    .map((res) => {
      let resArr = res.split("=");
      locationSearch[resArr[0]] = resArr[1];
    });
  return locationSearch;
};
//解析本地存储的url对象
window.analysis = function() {
  let results = "";
  if (!sessionStorage.getItem("locationSearch")) {
    return results;
  }
  Object.entries(JSON.parse(sessionStorage.getItem("locationSearch"))).map(
    (res) => {
      console.log(res);
      let grain = res.join("=");
      results += "&" + grain;
    }
  );
  return Object.entries(JSON.parse(sessionStorage.getItem("locationSearch")))
    .length > 0
    ? results.slice(1)
    : "";
};
//解析本地存储的url对象获取属性信息
window.getAttribute = function(key) {
  let results = "";
  if (!sessionStorage.getItem("locationSearch")) {
    return results;
  }
  Object.entries(JSON.parse(sessionStorage.getItem("locationSearch"))).map(
    (res) => {
      console.log(res[0]);
      if (key == res[0]) {
        results = res[1];
      }
    }
  );
  return results;
};

//获取推广渠道
if (window.location.search && !sessionStorage.getItem("locationSearch")) {
  let locationSearch = window.packing(window.location.search);
  sessionStorage.setItem("locationSearch", JSON.stringify(locationSearch));
}
