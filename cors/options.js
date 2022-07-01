const headers = {
  async headers() {
    return [
      {
        source: "/:paths*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, Content-Type X-Auth-Token",
          },
        ],
      },
    ];
  },
};

module.exports = {
  headers: headers,
};
