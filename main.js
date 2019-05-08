window.jQuery = function (nodeOrSelector) {
  let nodes = {}
  return nodes
}

window.$ = window.jQuery

window.jQuery.ajax = function ({ method, url, body }) {

  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest()
    request.open(method, url)

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          resolve.call(undefined, request.responseText)
        } else if (request.status >= 400 && request.status < 500) {
          reject.call(undefined, request)
        }
      }
    }

    request.send(body)
  })
}

myButton.addEventListener('click', function () {
  $.ajax({
    method: 'post',
    url: '/xxx',
    body: 'a=1&b=2'
  }).then(
    (text) => {
      console.log(text)
    },
    (request) => {
      console.log(request)
    })
})

// myButton.addEventListener('click', (e) => {
//   $.ajax({
//     url: '/xxx',
//     method: 'post'
//   }).then((responseText) => {
//     console.log(responseText)
//     return '请求成功了'
//   }, () => {
//     console.log('请求失败了')
//   }).then((responseText) => {
//     // 上一次的处理结果
//     console.log(responseText)
//   })
// })
