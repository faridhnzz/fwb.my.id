import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import SHA256 from 'crypto-js/sha256';
import { parseDomain, ParseResultType } from 'parse-domain/build/parse-domain';

/**
 * Copyright
 */
function copyright() {
  var year = new Date().getFullYear();
  document.getElementById('year').innerHTML = year;
}

/**
 * Safe Mail
 */
function safeMail() {
  var email = import.meta.env.VITE_CONTACT_EMAIL;

  var wordArray = Utf8.parse(email);
  var encryptedEmail = Base64.stringify(wordArray);

  function initializeAll() {
    var elements = document.querySelectorAll(`[id-email]`);
    elements.forEach((element) => initializeElement(element));
  }

  function obfuscateInnerHtml(text) {
    var chars = text.split('');
    var reversed = chars.reverse();
    let result = '';
    reversed.forEach((char) => {
      var randomText = SHA256(char);
      result += `<span style="display:none;">${randomText}</span>`;
      result += `<span>${char}</span>`;
    });
    return result;
  }

  function styleElement(element) {
    element.style.direction = 'rtl';
    element.style['unicode-bidi'] = 'bidi-override';
  }

  function initializeElement(element) {
    styleElement(element);
    if (!element.innerHTML.trim()) {
      element.innerHTML = obfuscateInnerHtml(Base64.parse(encryptedEmail).toString(Utf8));
    }

    element.addEventListener('click', (ev) => {
      var href = Base64.parse('bWFpbHRvOg==').toString(Utf8) + Base64.parse(encryptedEmail).toString(Utf8);
      window.location.href = href;
    });
  }

  document.addEventListener('DOMContentLoaded', () => initializeAll());
}

/**
 * Your Ip
 */
function ntIp() {
  function initializeAll() {
    var itemIp = document.getElementById('nt-item-ip');
    var ipReveal = document.getElementById('nt-ip-reveal');

    itemIp && 'classList' in itemIp && itemIp.classList.remove('hidden'),
      ipReveal.addEventListener('click', function () {
        ipReveal.classList.add('hidden');
        document.getElementById('nt-ip').classList.remove('hidden');
      });
  }

  document.addEventListener('DOMContentLoaded', () => initializeAll());
}

/**
 * Get root domain
 */
function domainRoot() {
  var typeDomain = document.getElementById('nt-type-domain');
  var ntDomain = document.getElementById('nt-domain');
  var parseResult = parseDomain(location.hostname);

  if (parseResult.type === ParseResultType.Listed || parseResult.type === ParseResultType.Reserved) {
    var { domain, topLevelDomains } = parseResult;
    document.getElementById('nt-text').innerHTML = 'domain';
    typeDomain.innerHTML = 'Domain: ';
    ntDomain.innerHTML = domain ? `${domain}.${topLevelDomains.join('.')}` : location.hostname;
    console.log(domain);
  } else if (parseResult.type === ParseResultType.Ip) {
    document.getElementById('nt-text').innerHTML = 'IP access';
    typeDomain.innerHTML = 'IP: ';
    ntDomain.innerHTML = location.hostname;
  }
}

/**
 * Load Script
 */
copyright();
safeMail();
// ntIp();
domainRoot();
