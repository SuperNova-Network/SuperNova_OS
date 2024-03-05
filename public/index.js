const form = document.getElementById('fs')
const input = document.getElementById('is')

if (form && input) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    processUrl(input.value) /* Change to : processUrl(input.value, '/iframe.html') if you want a url variable.*/
  })
}

function registerServiceWorker() {
  return window.navigator.serviceWorker.register('./sw.js', {
    scope: __uv$config.prefix,
  })
}

function processUrl(value, path) {
  registerServiceWorker().then(() => {
    let url = value.trim()
    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url
    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'https://' + url

    sessionStorage.setItem('encodedUrl', __uv$config.encodeUrl(url))

    const restrictedWebsites = ["Pornhub.com", "8Tube.xxx", "Redtube.com", "Kink.com", "YouJizz.com", "Xvideos.com", "YouPorn.com", "Brazzers.com", "fuck.com"];

    if (path) {
      location.href = path
    } else {
      if (restrictedWebsites.includes(url)) { // if the url the user typed in is any of the urls in "restrictedWebsites" then,
        document.write("This query is restricted by SuperNova. Please try another query.") // then--> display this message.
      } else {  // if not,
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url) // if not--> continue encoding the url the user typed in.
      }
    }
    
  })
}

function go(value) {
  processUrl(value, false) /* Change to : processUrl(value, '/iframe.html') if you want a url variable.*/
}

function now(value) {
  processUrl(value, '/e')
}

function blank(value) {
  processUrl(value)
}

function isUrl(val = '') {
  if (/^http(s?):\/\//.test(val) || (val.includes('.') && val.substr(0, 1) !== ' ')) return true
  return false
}
