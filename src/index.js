import React from 'react';
import ReactDOM from 'react-dom';

import Navi from './navi';

function getTitleTree(readme) {
  let article = readme.querySelectorAll('article')[0];
  console.log('article', article);
  let childs = Array.from(article.childNodes);
  let result = childs.filter(
    node => node.localName && node.localName.match(/h(1|2|3|4|5)/)
  ).map(
    node => ({
      level: node.localName,
      hash: node.firstChild.hash,
      text: node.textContent
    })
  )

  return result;
}

function start() {
  console.log("This extension started!");

  if (ReactDOM) {
    const readme = document.querySelector('#readme');
    if (!readme) return;

    const items = getTitleTree(readme);

    const naviDiv = document.createElement("div");
    naviDiv.setAttribute("id", "navi");
    readme.appendChild(naviDiv);

    ReactDOM.render(
      <Navi items={items} />,
      document.querySelector('#readme > #navi')
    )
  }
}

start();