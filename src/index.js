import React from "react";
import ReactDOM from "react-dom";

import Index from "./indexComponent";

function getTitleTree(readme) {
  let article = readme.querySelectorAll("article")[0];
  let childs = Array.from(article.childNodes);
  let result = childs
    .filter(node => node.localName && node.localName.match(/h(1|2|3|4|5)/))
    .map(node => ({
      level: node.localName,
      hash: node.firstChild.hash,
      text: node.textContent
    }));

  return result;
}

function start() {
  if (ReactDOM) {
    const readme = document.querySelector("#readme");
    if (!readme) return;

    const items = getTitleTree(readme);

    const indexDiv = document.createElement("div");
    indexDiv.setAttribute("id", "indexDiv");
    readme.appendChild(indexDiv);

    ReactDOM.render(
      <Index items={items} />,
      document.querySelector("#readme > #indexDiv")
    );
  }
}

start();
