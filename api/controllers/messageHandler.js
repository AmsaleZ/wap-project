require("dotenv").config();
const mongoose = require("mongoose");

const validIDCheck = function (ID, res) {
  if (!mongoose.isValidObjectId(ID)) {
    _setResponseStatusAndSend(res, null, process.env.ID_ISNOTVALID_MESSAGE);
    return false;
  } else {
    return true;
  }
};

const typeAndLimitCheck = function (req, res, queryParams) {
  let maxCount = parseInt(
    process.env.DEFAULT_MAX_FIND_LIMIT,
    process.env.PARSE_DEFAULT_VALUE
  );

  //type check
  if (req.query && req.query.offset) {
    queryParams.offset = parseInt(
      req.query.offset,
      process.env.PARSE_DEFAULT_VALUE
    );
  }
  if (req.query && req.query.count) {
    queryParams.count = parseInt(
      req.query.count,
      process.env.PARSE_DEFAULT_VALUE
    );
  }
  if (isNaN(queryParams.offset) || isNaN(queryParams.count)) {
    _setResponseStatusAndSend(res, null, process.env.QUERYSTRING_TYPE_MESSAGE);
    return false;
  }
  //limit check
  if (req.query.count > maxCount ) {
    _setResponseStatusAndSend(res, null, process.env.COUNTEXCEED_MESSAGE);
    return false;
  }

  return queryParams;
};

const setResponseAndSend = function (res, message, messageType) {
  if (messageType == process.env.ERROR_MESSAGE) {
    _setResponseStatusAndSend(res, message, process.env.ERROR_MESSAGE);
  } else if (messageType == process.env.SUCCESS_MESSAGE) {
    if (!message) {
      _setResponseStatusAndSend(res, message, process.env.ID_NOTFOUD_MESSAGE);
    } else {
      _setResponseStatusAndSend(res, message, process.env.SUCCESS_MESSAGE);
    }
  }
};

const _setResponseStatusAndSend = function (res, message, messageType) {
  switch (messageType) {
    case process.env.ID_ISNOTVALID_MESSAGE: {
      res.status(parseInt(process.env.INVALID_ERROR_STATUS)).json(messageType);
      break;
    }
    case process.env.ID_NOTFOUD_MESSAGE: {
      res.status(parseInt(process.env.INVALID_ERROR_STATUS)).json(messageType);
      break;
    }
    case process.env.ERROR_MESSAGE: {
      res.status(parseInt(process.env.ERROR_STATUS)).json(message);
      break;
    }
    case process.env.QUERYSTRING_TYPE_MESSAGE: {
      res
        .status(parseInt(process.env.INVALID_QUERYSTRINGS_STATUS))
        .json(messageType);
      break;
    }

    case process.env.COUNTEXCEED_MESSAGE: {
      res
        .status(parseInt(process.env.INVALID_QUERYSTRINGS_STATUS))
        .json(messageType);
      break;
    }

    case process.env.SUCCESS_MESSAGE: {
      res.status(parseInt(process.env.SUCCESS_STATUS)).json(message);
      break;
    }
  }
};

module.exports = { setResponseAndSend, validIDCheck, typeAndLimitCheck };
