import ProfileData from '../../source/js/profile/profile_data';
const yaml = require('js-yaml')

export default class UploadPartial {
  constructor(config) {
    this.config = config || {}
    this.eventTarget = config.eventTarget || document
    this.elContainer = config.element || document.querySelector('.upload')
    this.elDrop = this.elContainer.querySelector('.upload__drop')
    this.elDrop.addEventListener('drop', this.onDrop.bind(this))
    this.elDrop.addEventListener('dragend', this.onDragEnd.bind(this))
    this.elDrop.addEventListener('dragleave', this.onDragLeave.bind(this))
    this.elDrop.addEventListener('dragover', this.onDragOver.bind(this))
  }

  handleData(data) {
    const profileData = new ProfileData(data)
    document.dispatchEvent(
      new CustomEvent('data-loaded', {
        detail: profileData
      }))
  }

  onDragEnd(e) {
    const dt = e.dataTransfer;
    if (dt.items) {
      for (var i = 0; i < dt.items.length; i++) {
        dt.items.remove(i)
      }
    } else {
      dt.clearData()
    }
  }

  onDragLeave(e) {
    this.elDrop.classList.remove('upload__drop--over')
  }

  onDragOver(e) {
    e.preventDefault()
    this.elDrop.classList.add('upload__drop--over')
  }

  onDrop(e) {
    e.preventDefault()

    const dt = e.dataTransfer
    let file
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < dt.items.length; i++) {
        if (dt.items[i].kind == "file") {
          file = dt.items[i].getAsFile()
          break // Only need one file.
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < dt.files.length; i++) {
        file = dt.files[i]
        break // Only need one file.
      }
    }

    const fileReader = new FileReader()
    fileReader.onloadend = function(results) {
      if (file.name.match(/\.(yaml|yml)$/i)) {
        this.handleData(yaml.safeLoad(fileReader.result))
      } else if (file.name.match('application/json')) {
        this.handleData(JSON.parse(fileReader.result))
      } else {
        console.error('Only json and yaml files types are supported', file.name)
      }
    }.bind(this)
    fileReader.readAsText(file)

    this.elDrop.classList.remove('upload__drop--over')
  }
}
