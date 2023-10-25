require("ts-node").register({files: true})

require("@babel/register").default({
  extensions: [".ts", ".tsx", ".js", ".jsx"],
})
