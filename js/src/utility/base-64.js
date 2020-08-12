
//  Ported from Base64 encode / decode
//  http://www.webtoolkit.info/

export class Base64 {

  constructor() {
    this.keyString_ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  }

  encode(input) {
    input = this.utf8Encode_(input);
    let output = '';
    let i = 0;
    while (i < input.length) {
      const code1 = input.charCodeAt(i++);
      const code2 = input.charCodeAt(i++);
      const code3 = input.charCodeAt(i++);
      const encodedChar1 = code1 >> 2;
      const encodedChar2 = ((code1 & 3) << 4) | (code2 >> 4);
      let encodedChar3 = ((code2 & 15) << 2) | (code3 >> 6);
      let encodedChar4 = code3 & 63;
      if (isNaN(code2)) {
        encodedChar3 = encodedChar4 = 64;
      } else if (isNaN(code3)) {
        encodedChar4 = 64;
      }
      output = output
          + this.keyString_.charAt(encodedChar1)
          + this.keyString_.charAt(encodedChar2)
          + this.keyString_.charAt(encodedChar3)
          + this.keyString_.charAt(encodedChar4);
    }
    return output;
  }

  decode(input) {
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    let output = '';
    var i = 0;
    while (i < input.length) {
      const encodedChar1 = this.keyString_.indexOf(input.charAt(i++));
      const encodedChar2 = this.keyString_.indexOf(input.charAt(i++));
      const encodedChar3 = this.keyString_.indexOf(input.charAt(i++));
      const encodedChar4 = this.keyString_.indexOf(input.charAt(i++));
      const code1 = (encodedChar1 << 2) | (encodedChar2 >> 4);
      const code2 = ((encodedChar2 & 15) << 4) | (encodedChar3 >> 2);
      const code3 = ((encodedChar3 & 3) << 6) | encodedChar4;
      output = output + String.fromCharCode(code1);
      if (encodedChar3 != 64) {
        output = output + String.fromCharCode(code2);
      }
      if (encodedChar4 != 64) {
        output = output + String.fromCharCode(code3);
      }
    }
    output = this.utf8Decode_(output);
    return output;
  }

  utf8Encode_(data) {
    data = data.replace(/\r\n/g, '\n');
    let utf8Data = '';
    for (let i = 0; i < data.length; i++) {
      const code = data.charCodeAt(i);
      if (code < 128) {
        utf8Data += String.fromCharCode(code);
      } else if ((code > 127) && (code < 2048)) {
        utf8Data += String.fromCharCode((code >> 6) | 192);
        utf8Data += String.fromCharCode((code & 63) | 128);
      } else {
        utf8Data += String.fromCharCode((code >> 12) | 224);
        utf8Data += String.fromCharCode(((code >> 6) & 63) | 128);
        utf8Data += String.fromCharCode((code & 63) | 128);
      }
    }
    return utf8Data;
  }

  utf8Decode_(utf8Data) {
    let string = '';
    let i = 0;
    while (i < utf8Data.length) {
      const code1 = utf8Data.charCodeAt(i);
      if (code1 < 128) {
        string += String.fromCharCode(code1);
        i++;
      } else if (code1 > 191 && code1 < 224) {
        const code2 = utf8Data.charCodeAt(i+1);
        string += String.fromCharCode(((code1 & 31) << 6) | (code2 & 63));
        i += 2;
      } else {
        const code2 = utf8Data.charCodeAt(i+1);
        const code3 = utf8Data.charCodeAt(i+2);
        string += String.fromCharCode(((code1 & 15) << 12) | ((code2 & 63) << 6) | (code3 & 63));
        i += 3;
      }
    }
    return string;
  }

}
