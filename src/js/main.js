import sha256 from 'crypto-js/sha256';

// Copyright Year
document.getElementById('year').innerHTML = new Date().getFullYear();

// Safe Mail
function safeMail() {
  const dataAttrNames = {
    email: 'email_b64',
  };

  function obfuscateInnerHtml(text) {
    const chars = text.split('');
    const reversed = chars.reverse();
    let result = '';
    reversed.forEach((char) => {
      const randomText = sha256(char);
      result += `<em style="display:none;">${randomText}</em>`;
      result += `<span>${char}</span>`;
    });
    return result;
  }

  function styleElement(element) {
    element.style.direction = 'rtl';
    element.style['unicode-bidi'] = 'bidi-override';
  }

  function initializeElement(element) {
    const readAttr = (name) => element.dataset[name];
    styleElement(element);
    if (!element.innerHTML.trim()) {
      element.innerHTML = obfuscateInnerHtml(atob(readAttr(dataAttrNames.email)));
    }
    element.addEventListener('click', (ev) => {
      const href = atob('bWFpbHRvOg==') + atob(readAttr(dataAttrNames.email)) + ev.preventDefault();
      window.location.href = href;
    });
  }

  function initializeAll() {
    const elements = document.querySelectorAll(`[data-${dataAttrNames.email}]`);
    elements.forEach((element) => initializeElement(element));
  }

  if (!window.areEmailsInitialized) {
    window.areEmailsInitialized = true;
    document.addEventListener('DOMContentLoaded', () => initializeAll());
  }
}

safeMail();

console.log('ಠ_ಠ Hey you mother father!! \nthis website is open source : https://github.com/faridhnzz/fwb.my.id');
