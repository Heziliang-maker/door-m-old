let cookie = {
  // 获取 cookie 的方法封装
  get(string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // 判断这个cookie的参数名是不是我们想要的
        if (cookie.substring(0, string.length + 1) === string + "=") {
          cookieValue = decodeURIComponent(cookie.substring(string.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  },
  // 设置 cookie 的方法封装

  set(name, value, time) {
    if (time) {
      //设置过期时间
      var day = new Date();
      day.setDate(day.getDate() + time);
      document.cookie =
        name + "=" + value + "; PATH=/; EXPIRES=" + day.toGMTString();
    } else {
      //默认不设置过期时间
      document.cookie = name + "=" + value + "; PATH=/";
    }
  },
  // 清除所有cookie
  clear() {
    let date = new Date();
    date.setTime(date.getTime() - 10000);
    let keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
      for (let i = keys.length; i--; )
        document.cookie =
          keys[i] + "=''; EXPIRES=" + date.toGMTString() + "; path=/";
    }
  },
};
export default cookie;
