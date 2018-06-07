console.log("This extension works!");

function getTitleTree(readme) {
  let article = readme.childNodes[1];
  let childs = Array.from(article.childNodes);
  let result = childs.filter(
    node => node.localName && node.localName.match(/h(1|2|3|4|5)/)
  ).map(
    node => `<li class='level_${node.localName}'><a href='${node.firstChild.hash}'>${node.textContent}</a></li>`
  )

  return result;
}

// styles
let newStyle = document.createElement("style"); 
newStyle.innerHTML = `
  .navi {
    width: 350px;
    position: fixed;
    top: 300px;
    left: 101px;
  }

  .navi-content {
    max-height: 450px;
    overflow: auto;
  }

  .navi-content .level_h1 {
    margin-left: 10px;
  }

  .navi-content .level_h2 {
    margin-left: 25px;
    list-style-type: circle;
  }

  .navi-content .level_h3 {
    margin-left: 40px;
  }

  .navi-content .level_h4 {
    margin-left: 55px;
    list-style-type: circle;
  }

  .navi-content .level_h5 {
    margin-left: 60px;
  }
`;
document.querySelector('head').appendChild(newStyle)

// main
const readme = document.querySelector('#readme');
const lists = getTitleTree(readme);
const newDiv = document.createElement("div"); 
newDiv.innerHTML = `
<div class="navi Box Box--condensed mb-3 js-repos-container" data-pjax-container role="navigation">
  <div class="Box-header">
    <h3 class="Box-title d-flex flex-justify-between flex-items-center">
      Navigation
    </h3>
  </div>
  <div class="Box-body navi-content">
    <ul>
      ${lists.join('\n')}
    </ul>
  </div>
</div>
`;
readme.appendChild(newDiv);