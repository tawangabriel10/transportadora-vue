const { Readable } = require('stream')
const StringMask = require('string-mask')
const moment = require('moment')
const bcrypt = require('bcrypt')
const fs = require('fs')
const spawn = require('child_process').spawn
const saltRounds = 10

const conversor = {

  brToNumber (numberBr) {
    return +String(numberBr).match(/[\d.,]/g)
  },

  maskCel (value) {
    return value ? new StringMask('00 0 0000-0000').apply(value) : null
  },

  maskTel (value) {
    return value ? new StringMask('00 0000-0000').apply(value) : null
  },

  maskCnpj (value) {
    return value ? new StringMask('00.000.000/0000-00').apply(value) : null
  },

  maskCpf (value) {
    return value ? new StringMask('000.000.000-00').apply(value) : null
  },

  maskCep (value) {
    return value ? new StringMask('00.000-00').apply(value) : null
  },

  maskBrDate (value) {
    return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
  },

  encrypt (value) {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(value, salt)
  },

  compareCrypt (value, hash) {
    return bcrypt.compareSync(value, hash)
  },

  bufferToStream (binary) {
    return new Readable({
      read () {
        this.push(binary)
        this.push(null)
      }
    })
  },

  rgbToHex (r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  },

  hexToRgba (hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
      1
    ]
  },

  generateHexColor () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  },

  toArrayBuffer (buf) {
    let ab = new ArrayBuffer(buf.length)
    let view = new Uint8Array(ab)
    for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i]
    }
    return ab
  },

  toBuffer (ab) {
    let buf = Buffer.alloc(ab.byteLength)
    let view = new Uint8Array(ab)
    for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i]
    }
    return buf
  },

  getDate (value, inputFormat = 'YYYY-MM-DD', outFormat = 'DD/MM/YYYY') {
    try {
      if (!value) {
        throw new Error(`${value} format ${inputFormat} Value é obrigatório`)
      }
      let date = moment(value, inputFormat)
      if (!date.isValid()) {
        throw new Error(`${value} format ${inputFormat} Date Invalid`)
      }
      return date.format(outFormat)
    } catch (error) {
      console.log(`> ${error.message}`)
    }
    return void 0
  },

  parseToNumber (value = '0') {
    const regex = /([\d.,]+)/g
    const matched = String(value).replace(/[^\d.,]/g, '').match(regex)
    if (matched) {
      return +matched[0].replace(/,/g, '.').replace('.', '')
    }
    return null
  },

  parseDate (value) {
    value = value ? String(value).trim() : null
    let date = null

    if (/^[\d]{4}-[\d]{2}-[\d]{2}\w[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}\w$/i.test(value)) {
      date = moment(value, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY')
    } else {
      const partsDate = value && value.split('/').filter((value, index) => {
        if (index === 0) {
          return /\d+/.test(value) && value >= 1 && value <= 31// testa dias do mês possíveis
        } else if (index === 1) {
          return /\d+/.test(value) && value >= 1 && value <= 12 // testa se mês é um número entre 1 e 12
        } else if (index === 2) {
          return /[\d]{2,4}/.test(value) // testa se ano possui 2 ou 4 caracters númericos
        }
        return false
      })
      if (partsDate && partsDate.length === 3) {
        date = moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY')
      }
    }
    try {
      return date && moment(date, 'DD/MM/YYYY').isValid() ? date : void 0
    } catch (error) {
      console.error(error, date)
    }
    return void 0
  },

  streamXlsToJson ({ input, output, sheet }, cb) {
    const child = spawn(`./node_modules/.bin/convert-excel-to-json`, [
      '--sourceFile', input
    ], { cwd: serverPath })
    const writer = fs.createWriteStream(output)

    child.stdout.on('data', (chunk) => {
      writer.write(chunk)
    })
    child.stdout.on('end', () => {
      cb()
    })

    child.stderr.on('data', (chunk) => {
      cb(chunk)
    })
  }

}

module.exports = conversor
