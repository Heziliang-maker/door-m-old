const IS_VIEW_ID = "IS_VIEW_ID";

export const setViewId = () => {
  window.localStorage.setItem(IS_VIEW_ID, "YES");
};

export const getViewId = () => {
  return window.localStorage.getItem(IS_VIEW_ID);
};

export const removeViewId = () => {
  if (!!getViewId) window.localStorage.removeItem(IS_VIEW_ID);
};
