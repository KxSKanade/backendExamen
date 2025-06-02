// src/middlewares/validateBody.js
module.exports = (schema) => {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          details: error.details.map((d) => d.message),
        });
      }
      req.validatedBody = value;
      next();
    };
  };
  