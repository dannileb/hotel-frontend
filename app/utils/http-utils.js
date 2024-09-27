export const HttpUtils = {
  get: async (url, options) => {
    try {
      const response = await fetch(url, {
        ...options,
        method: "GET",
      });
      if (response.status !== 200) {
        throw new Error("get error");
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  },
  post: async (url, options) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body:
          options && options.body ? JSON.stringify(options.body) : undefined,
        method: "POST",
      });
      if (response.status !== 200) {
        throw new Error(error);
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  },
  put: async (url, options) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers:
          options && options.headers
            ? options.headers
            : {
                "Content-Type": "application/json; charset=utf-8",
              },
        body:
          options && options.body ? JSON.stringify(options.body) : undefined,
        method: "PUT",
      });
      if (response.status !== 200) {
        throw new Error(error);
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (url, options) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body:
          options && options.body ? JSON.stringify(options.body) : undefined,
        method: "PUT",
      });
      if (response.status !== 200) {
        throw new Error(error);
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  },
};
