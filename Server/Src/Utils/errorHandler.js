const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  const contentType = req.get("Content-Type");

  if (contentType === "application/json" || req.accepts("json")) {
    res.json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  } else {
    res.send(`Error: ${err.message}`);
  }
};

module.exports = errorHandler;
