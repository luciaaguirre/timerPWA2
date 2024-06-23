import { LitElement, html, css } from 'lit'
import { TimerComponent } from './TimerComponent.js'

export class TimerPlayerComponent extends LitElement {
  static properties = {
    playBtn: { type: Boolean, attribute: 'play-btn' },
    pauseBtn: { type: Boolean, attribute: 'pause-btn' },
    resetBtn: { type: Boolean, attribute: 'reset-btn' },
    enableEvents: { type: Boolean, attribute: 'enable-events' },
    _status: { type: String, state: true }
  }

  constructor () {
    super()
    this.playBtn = false
    this.pauseBtn = false
    this.resetBtn = false
    this._status = ''
    this.enableEvents = false
    this.addEventListener('finishTimer', this._handleFinishTimer)
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    .timer-player-component__status {
      color: var(--primary-color);
    }

    .timer-player-component__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      flex-direction: row;
    }

    .timer-player-component__actions:hover {
    }

    button {
      cursor: pointer;
      margin-top: 2rem;
      margin-left: 1rem;
      padding: 0.5rem;
      border-radius: 5px;
      border: none;
    }

    button.timer-player-component__actions--play {
      background-color: var(--text-color);
      color: var(--neutral-color);
    }
    button.timer-player-component__actions--play:hover {
      background-color: var(--primary-color);
    }

    button.timer-player-component__actions--pause {
      background-color: var(--text-color);
      color: var(--neutral-color);
    }
    button.timer-player-component__actions--pause:hover {
      background-color: var(--primary-color);
    }

    button.timer-player-component__actions--reset {
      background-color: var(--text-color);
      color: var(--neutral-color);
    }
    button.timer-player-component__actions--reset:hover {
      background-color: var(--primary-color);
    }
  `

  connectedCallback () {
    super.connectedCallback()
    this.timer = this.querySelector('timer-component')
  }

  _handleFinishTimer (e) {
    if (!this.enableEvents) e.stopPropagation()
  }

  _handleResetTimer (e) {
    if (!this.enableEvents) e.stopPropagation()
    this._status = ''
  }

  render () {
    return html`
      <div class="timer-player-component__status">${this._status}</div>
      <slot></slot>
      <div class="timer-player-component__actions">
        ${this.pauseBtn
          ? html`<button
              class="timer-player-component__actions--pause"
              @click="${this.pause}"
            >
              Pause
            </button>`
          : ''}
        ${this.playBtn
          ? html`<button
              class="timer-player-component__actions--play"
              @click="${this.play}"
            >
              Play
            </button>`
          : ''}
        ${this.resetBtn
          ? html`<button
              class="timer-player-component__actions--reset"
              @click="${this.reset}"
            >
              Reset
            </button>`
          : ''}
      </div>
    `
  }

  play () {
    this.timer.startTimer()
    this._status = ''
  }

  pause () {
    this.timer.pauseTimer()
  }

  reset () {
    this.timer.resetTimer()
    this._status = ''
  }
}

window.customElements.define('timer-player-component', TimerPlayerComponent)
