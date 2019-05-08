window.jQuery = function (nodeOrSelector) {
  let nodes = {}
  return nodes
}

window.jQuery.ajax = function ajax (method, url, body, successFn, failFn) {
  let request = new XMLHttpRequest()

  request.open(method, url)

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        successFn.call(undefined, request.responseText)
      } else {
        failFn.call(undefined, request)
      }
    }
  }

  request.send(body)
}

myButton.addEventListener('click', function () {
  window.jQuery.ajax('post', '/xxx', 'a=1&b=2', () => {
    console.log('请求成功了')
  }, () => {
    console.log('请求失败了')
  })
})
