require("prismjs/themes/prism-tomorrow.css")
const loadableReady = require("@loadable/component").loadableReady

exports.replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
      const ReactDOM = require("react-dom")
      ReactDOM.render(element, container, callback)
    })
  }
}
