import { LitElement, html, css } from 'lit'

export class TimerPartComponent extends LitElement {
  static properties = {
    value: { type: Number, attribute: true },
    format: { type: String, attribute: true }
  }

  constructor () {
    super()
  }

  static styles = css`
    :host {
      color: var(--timer-component-part-color);
      background-color: var(--text-color);
      padding: 0.5rem;
      box-shadow: 5px 5px 10px grey;
      border-radius: 0.5rem;
      margin: 0.5rem;
    }
  `

  render () {
    return html`
      <div class="time-part-component">${this._formatTime(this.value)}</div>
    `
  }

  _formatTime (time) {
    if (this.format?.length > 1) return time < 10 ? `0${time}` : time
    return time
  }
}

window.customElements.define('time-part-component', TimerPartComponent)
