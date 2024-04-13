import { httpInterceptor, tokenInterceptor } from "./interceptors";
// import { toastService } from "./toast.service";

export const get = async (url, options = {}) => {
  return await new Promise(async (resolve, reject) => {
    try {
      await tokenInterceptor(options);
      fetch(url, options)
        .then(async (res) => {
          httpInterceptor(res);
          if (res.status !== 201 && res.status !== 200) {
            let error = await res.json();
            // toastService.error(error.message || error.detail || res.statusText);
            resolve(res.statusText);
          }
          resolve({ status: res.status, ...(await res.json()) });
        })
        .catch((err) => reject(err));
    } catch (ex) {
      reject(ex);
    }
  });
};

export const post = async (
  url,
  body,
  options = {
    headers: {
      "Content-Type": "application/json",
    },
  }
) => {
  return await new Promise(async (resolve, reject) => {
    try {
      await tokenInterceptor(options);
      fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        ...options,
      })
        .then(async (res) => {
          httpInterceptor(res);
          if (res.status !== 201 && res.status !== 200) {
            let error = await res.json();
            resolve(error);
          }
          resolve({ status: res.status, ...(await res.json()) });
        })
        .catch((err) => reject(err));
    } catch (ex) {
      reject(ex);
    }
  });
};

export const put = async (
  url,
  body,
  options = { headers: { "Content-Type": "application/json" } }
) => {
  return await new Promise(async (resolve, reject) => {
    try {
      await tokenInterceptor(options);
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        ...options,
      })
        .then(async (res) => {
          httpInterceptor(res);
          if (res.status !== 201 && res.status !== 200) {
            let error = await res.json();
            resolve(error);
          }
          resolve({ status: res.status, ...(await res.json()) });
        })
        .catch((err) => reject(err));
    } catch (ex) {
      reject(ex);
    }
  });
};

export const del = async (url, options = {}) => {
  return await new Promise((resolve, reject) => {
    try {
      // tokenInterceptor(options);
      fetch(url, {
        method: "DELETE",
        ...options,
      })
        .then(async (res) => {
          httpInterceptor(res);
          if (res.status !== 201 && res.status !== 200) {
            // toastService.error(res.message);
            resolve(res);
          }
          resolve({ status: res.status, ...(await res.json()) });
        })
        .catch((err) => reject(err));
    } catch (ex) {
      reject(ex);
    }
  });
};

export const upload = async (url, body, options = {}) => {
  return await new Promise((resolve, reject) => {
    try {
      tokenInterceptor(options);
      fetch(url, {
        method: "POST",
        body,
        ...options,
      })
        .then((res) => {
          res.json();
          if (res.status !== 201 && res.status !== 200) {
            // toastService.error(res.message);
            resolve(res);
          }
          resolve(res);
        })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (ex) {
      reject(ex);
    }
  });
};

export const http = {
  get,
  post,
  put,
  del,
};
