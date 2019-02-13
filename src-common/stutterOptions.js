/* global browser */
import { EventEmitter } from 'events'

export default class StutterOptions extends EventEmitter {
  constructor () {
    super()

    // Default settings
    this._wpm = 400
    this._slowStartCount = 5
    this._sentenceDelay = 2.5
    this._otherPuncDelay = 1.5
    this._shortWordDelay = 1.3
    this._longWordDelay = 1.4
    this._numericDelay = 1.8

    browser.storage.local.get('stutterOptions').then(result => {
      if (result.stutterOptions) {
        this.settings = result.stutterOptions
      }
    })
  }

  static get UPDATE () { return 'STUTTER_OPTIONS_UPDATE' }

  update () {
    this.emit(StutterOptions.UPDATE)
    this.saveSettings()
  }

  saveSettings () {
    browser.storage.local.set({
      stutterOptions: this.settings
    })
  }

  get settings () {
    return {
      wpm: this._wpm,
      slowStartCount: this._slowStartCount,
      sentenceDelay: this._sentenceDelay,
      otherPuncDelay: this._otherPuncDelay,
      shortWordDelay: this._shortWordDelay,
      longWordDelay: this._longWordDelay,
      numericDelay: this._numericDelay
    }
  }

  set settings (val) {
    if (val['wpm']) this.wpm = val['wpm']
    if (val['slowStartCount']) this._slowStartCount = val['slowStartCount']
    if (val['sentenceDelay']) this._sentenceDelay = val['sentenceDelay']
    if (val['otherPuncDelay']) this._otherPuncDelay = val['otherPuncDelay']
    if (val['shortWordDelay']) this._shortWordDelay = val['shortWordDelay']
    if (val['longWordDelay']) this._longWordDelay = val['longWordDelay']
    if (val['numericDelay']) this._numericDelay = val['numericDelay']
  }

  get wpm () { return this._wpm }
  set wpm (val) {
    val = Number(val)
    if (isNaN(val)) return
    val = Math.max(1, val)
    val = Math.min(1500, val)
    if (this._wpm !== val) {
      this._wpm = val
      this.update()
    }
  }

  get sentenceDelay () { return this._sentenceDelay }
  set sentenceDelay (val) {
    val = Number(val)
    if (isNaN(val)) return
    val = Math.max(1, val)
    val = Math.min(10, val)
    if (this._sentenceDelay !== val) {
      this._sentenceDelay = val
      this.update()
    }
  }

  get otherPuncDelay () { return this._otherPuncDelay }
  set otherPuncDelay (val) {
    val = Number(val)
    if (isNaN(val)) return
    val = Math.max(1, val)
    val = Math.min(10, val)
    if (this._otherPuncDelay !== val) {
      this._otherPuncDelay = val
      this.update()
    }
  }

  get shortWordDelay () { return this._shortWordDelay }
  set shortWordDelay (val) {
    val = Number(val)
    if (isNaN(val)) return
    val = Math.max(1, val)
    val = Math.min(10, val)
    if (this._shortWordDelay !== val) {
      this._shortWordDelay = val
      this.update()
    }
  }

  get longWordDelay () { return this._longWordDelay }
  set longWordDelay (val) {
    val = Number(val)
    if (isNaN(val)) return
    val = Math.max(1, val)
    val = Math.min(10, val)
    if (this._longWordDelay !== val) {
      this._longWordDelay = val
      this.update()
    }
  }

  get numericDelay () { return this._numericDelay }
  set numericDelay (val) {
    val = Number(val)
    if (isNaN(val)) return
    val = Math.max(1, val)
    val = Math.min(10, val)
    if (this._numericDelay !== val) {
      this._numericDelay = val
      this.update()
    }
  }

  get slowStartCount () { return this._slowStartCount }
  set slowStartCount (val) {
    val = Number(val)
    if (isNaN(val)) return
    val = Math.max(0, val)
    val = Math.min(10, val)
    if (this._slowStartCount !== val) {
      this._slowStartCount = val
      this.update()
    }
  }

  get delay () { return 1 / (this._wpm / 60) * 1000 }
}