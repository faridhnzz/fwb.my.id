import sha256 from 'crypto-js/sha256';

// Copyright Year
document.getElementById('year').innerHTML = new Date().getFullYear();

// Get name of domain
function domainName() {
  const hostname = window.location.hostname;
  const getName = hostname.split('.');
  if (getName.includes('www')) {
    getName.shift();
    document.title = getName[0];
    // document.getElementById('nameTitle').innerHTML = getName[0];
    document.getElementById('nameTitle2').innerHTML = getName[0];
    document.getElementById('nameTitle3').innerHTML = getName[0];
  } else {
    document.title = getName[0];
    // document.getElementById('nameTitle').innerHTML = getName[0];
    document.getElementById('nameTitle2').innerHTML = getName[0];
    document.getElementById('nameTitle3').innerHTML = getName[0];
  }
}

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
      const href = atob('bWFpbHRvOg==') /* mailto: */ + atob(readAttr(dataAttrNames.email)) + ev.preventDefault();
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

/**
 * Hmm...
 */
domainName();
safeMail();
