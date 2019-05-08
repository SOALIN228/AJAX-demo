window.jQuery = function (nodeOrSelector) {
  let nodes = {}
  return nodes
}

window.jQuery.ajax = function ({method,url,body,successFn,failFn}/*options*/) {
  // es6 结构赋值，只有一次可以放在function中
  // let {method,url,body,successFn,failFn} = options

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
  }

  request.send(body)
}

myButton.addEventListener('click', function () {
  window.jQuery.ajax({
    method: 'post',
    url: '/xxx',
    body: 'a=1&b=2',
    successFn: (x) => {
      console.log(x)
      console.log('请求成功了')
    }
    ,
    failFn: () => {
      console.log('请求失败了')
    }
  })
})
