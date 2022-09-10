import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';

// Copyright Year
var year = new Date().getFullYear();
document.getElementById('year').innerHTML = year;

// Safe Mail
function safeMail() {
  var dataName = {
    email: 'email',
  };

  function obfuscateInnerHtml(text) {
    var chars = text.split('');
    var reversed = chars.reverse();
    let result = '';
    reversed.forEach((char) => {
      var randomText = sha256(char);
      result += `<p style="display:none;">${randomText}</p>`;
      result += `<span>${char}</span>`;
    });
    return result;
  }

  function styleElement(element) {
    element.style.direction = 'rtl';
    element.style['unicode-bidi'] = 'bidi-override';
  }

  function initializeElement(element) {
    var readAttr = (name) => element.dataset[name];
    styleElement(element);
    if (!element.innerHTML.trim()) {
      element.innerHTML = obfuscateInnerHtml(Base64.parse(readAttr(dataName.email)).toString(Utf8));
    }

    element.addEventListener('click', (ev) => {
      var href = Base64.parse('bWFpbHRvOg==').toString(Utf8) + Base64.parse(readAttr(dataName.email)).toString(Utf8);
      window.location.href = href;
    });
  }

  function initializeAll() {
    var elements = document.querySelectorAll(`[data-${dataName.email}]`);
    elements.forEach((element) => initializeElement(element));
  }

  if (!window.areEmailsInitialized) {
    window.areEmailsInitialized = true;
    document.addEventListener('DOMContentLoaded', () => initializeAll());
  }
}

safeMail();
