/*
 * @Date: 2021-11-16
 * @Description: window全局函数
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

window.googleTranslateElementInit = () => {
  new google.translate.TranslateElement(
    {
      //pageLanguage: 'zh-CN',
      //这个是你需要翻译的语言，比如你只需要翻译成越南和英语，这里就只写en,vi
      // pageLanguage: 'zh-CN',
      includedLanguages:
        "en,zh-CN,hr,cs,da,nl,fr,de,el,hu,ga,it,ja,ko,pt,ro,ru,sr,es,th",
      //选择语言的样式
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      //自动显示翻译横幅，就是翻译后顶部出现的那个
      autoDisplay: false,
      //还有些其他参数，由于原插件不再维护，找不到详细api了，将就了，实在不行直接上dom操作
    },
    "google_translate_element" //触发按钮的id
  );
};
