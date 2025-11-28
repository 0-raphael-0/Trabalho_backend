module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      message: 'Dados inválidos',
      details: error.details.map((d) => d.message)
    });
  }

  req.validatedBody = value;
  next();
};