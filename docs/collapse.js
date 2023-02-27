import { CollapseHandler } from "../scripts/Utility/CollapseHandler.js";

const collapseHandler = new CollapseHandler("b-collapse", "b-collapsing", "b-show");
collapseHandler.arrangeElements();

let collapseId = 8;
document.getElementById("newElementButton").addEventListener("click", () => {
  const newElement = `
<div class="d-flex">
<div class="border border-dark rounded-2 p-3 mx-auto d-flex flex-column justify-content-start align-items-center w-50">
  <h1 class="display-1 fw-normal">Collapse, Kod ile Eklendi</h1>
  <div>
    <button class="btn btn-lg btn-primary rounded-1" data-collapser-id="${collapseId}" data-collapse-command="toggle">Toggle</button>
    <button class="btn btn-lg btn-primary rounded-1" data-collapser-id="${collapseId}" data-collapse-command="expand">Expand</button>
    <button class="btn btn-lg btn-primary rounded-1" data-collapser-id="${collapseId}" data-collapse-command="collapse">Collapse</button>
  </div>
  <div class="b-collapse text-bg-primary border border-dark rounded-1 mt-3" data-collapse-item-id="${collapseId}">
    <div class="p-3">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem minima tenetur nihil illo possimus illum!
    </div>
  </div>
</div>
</div>
`.trim();
  collapseId++;
  const div = document.createElement("div");
  div.innerHTML = newElement;
  const element = div.firstChild;
  document.body.append(element);
  collapseHandler.arrangeElements(element);
});
