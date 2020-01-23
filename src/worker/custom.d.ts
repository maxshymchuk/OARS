declare module 'worker-loader?publicPath=dist/&name=worker.js*' {
  class WebpackWorker extends Worker {
      constructor();
  }

  export = WebpackWorker;
}