// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const auth = require("json-server-auth"); // اضافه کردن json-server-auth

server.use(middlewares);
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);

// استفاده از json-server-auth به عنوان middleware
const rules = auth.rewriter({
  // قاعده‌های احراز هویت را اینجا مشخص کنید
  // برای مثال:
  // "posts": 600,
  // "comments": 640,
  // "users": 640,
  users: 600, // خواندن و نوشتن
});

server.use(rules); // اضافه کردن قواعد به سرور
server.use(auth); // استفاده از middleware احراز هویت
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
