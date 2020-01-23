import worker = require('worker-loader?publicPath=dist/&name=worker.js!./worker');

export default worker;