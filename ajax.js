window.jQuery = function (nodeOrSelector) {
  let nodes = {}
  return nodes
}

window.$ = window.jQuery

window.jQuery.ajax = function (url, method, body, successFn, failFn) {
  let request = new XMLHttpRequest()
  request.open(method, url)

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        successFn.call(undefined, request.responseText)
      } else if (request.status >= 400 && request.status < 500) {
        failFn.call(undefined, request)
      }
    }
    request.send(body)
  }
}

myButton.addEventListener('click', function () {
  $.ajax('xxx', 'post', 'a=1&b=2', () => {
    console.log('success')
  }, () => {
    console.log('error')
  })
})
