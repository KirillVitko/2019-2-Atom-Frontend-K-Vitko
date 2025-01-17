const template = document.createElement('template')
template.innerHTML = `
    <style>
        input {
            border: 0;
            outline: none;
            width: calc(100% - 2px);
        }

        :host {
            display: inline-block;
            border: 1px solid rgba(25, 25, 25, 0.32);
        }
    </style>
    <input type="text">
`

class FormInput extends HTMLElement {
    constructor () {
        super()
        /* eslint no-underscore-dangle: ["error", { "allow": ["_shadowRoot"] }] */
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$input = this.shadowRoot.querySelector('input')
    }

    static get observedAttributes() {
        return ['name', 'value', 'placeholder', 'disabled']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "value") {
          this.$input.value = ''
        }
        this.$input.setAttribute(name, newValue)
    }

    get value() {
        return this.$input.value
    }
}

customElements.define('form-input', FormInput)
