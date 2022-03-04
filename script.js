document.addEventListener("DOMContentLoaded", init);

function init() {
  // The shadow hosts are the elements the shadow dom is attached to.
  const shadowClosedHost = document.getElementById("shadow-closed");
  const shadowOpenHost = document.getElementById("shadow-open");

  console.log('shadowClosedHost.shadowRoot', shadowClosedHost.shadowRoot);
  console.log('shadowOpenHost.shadowRoot', shadowOpenHost.shadowRoot);

  const shadowClosed = shadowClosedHost.attachShadow({mode: 'closed'});
  const shadowOpen = shadowOpenHost.attachShadow({mode: 'open'});

  makeComponent(shadowClosed, { text: "Shadow closed", color: "#ff8" });
  makeComponent(shadowOpen, { text: "Shadow open", color: "#f8f" });
}

function accessShadow() {
  const shadowClosedHost = document.getElementById("shadow-closed");
  const shadowOpenHost = document.getElementById("shadow-open");

  console.log({shadowClosedHost, shadowOpenHost});
}

function makeComponent(root, {text, color}) {
  const div = document.createElement('section');
  div.className = "shady";
  div.innerText = text;
  root.appendChild(div);

  const style = document.createElement('style');
  style.textContent = `
    .shady {
      margin: 10px;
      position: relative;
      width: 100px;
      height: 100px;
      background-color: ${color};
    }
  `;
  root.appendChild(style);
}

window.customElements.define("example-component", class ExampleComponent extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
      this.shadowRoot.innerHTML = `
          <style>
            div {
              margin: 10px;
              position: relative;
              width: 100px;
              height: 100px;
              background-color: ${this.getAttribute('color')};
            }
          </style>
          <div>
            ${
              // This is unsafe.
              this.getAttribute('text')
            }
          </div>
      `;

  }
});
