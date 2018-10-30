const _ = require("lodash");

// Refactor functions
const getDataAndIndex = (req, data) => {
  const parsedData = JSON.parse(data).deals;
  const targetIndex = _.indexOf(
    parsedData,
    _.find(parsedData, { id: req.params.pageId })
  );
  return { parsedData, targetIndex };
};

module.exports = getDataAndIndex;
