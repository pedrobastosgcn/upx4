const PROXY_CONFIG = {
    "/proxy/*": {
      // "target": "https://trackerops.nextracker.com", // PRODUCTION
      // "target": "https://trackerops-preprod.nextracker.com", // PRE-PRODUCTION
      // "target": "http://localhost:8899", // LOCAL
      // "target": "http://172.21.193.4:8899", // DEV 1
      // "target": "http://172.21.193.4:8202", // DEV 2
      "target": "http://localhost:3000", // DEV ENV
      "pathRewrite": {
        "^/proxy": ""
      },
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true,
      // "withCredentials": true,
      "onProxyRes": function (proxyRes, req, res) {
        if (proxyRes.headers["set-cookie"]) {
          let cookie = proxyRes.headers["set-cookie"][0].split(';');
          cookie.push('Path=/');
          proxyRes.headers["set-cookie"] = cookie.join(';');
          }
        }
      }
    }
  
    module.exports = PROXY_CONFIG;
  