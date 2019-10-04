const defaultErrorMessage = function(req, res) {
    res.status(404).send("Custom middleware message");
  }

module.exports = defaultErrorMessage;