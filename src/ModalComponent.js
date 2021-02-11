import "./ModalComponentStyle.css";

//Modal Types
export const type = {
  INFO: "INFO",
  ERROR: "ERROR",
  WARNING: "WARNING"
};

export class ModalComponent {
  constructor(type, text) {
    this.type = type;
    this.text = text;
    this.class = type.toLowerCase();
  }

  render() {
    return `<div class="modal-content">
      <div class="modal-header ${this.class}">
      <span id="closeBtn">&times;</span>
      <h2>${this.type}</h2>
      </div>
      <div class="modal-body">
      <p>${this.text}</p>
      </div>
      <div class="modal-footer ${this.class}">
      <h2>${this.type}</div></div></div>`;
  }
}
