module.exports = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  return res.status(status).json({
    message
  });
};