module.exports = (schema) => {
  return (req, res, next) => {
    if (!schema || typeof schema.validate !== "function") {
      return res.status(500).json({
        success: false,
        message: "Validation schema is undefined or invalid"
      });
    }

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    next();
  };
};
