# AJAX-demo
封装一个ajax

## 第一版

```javascript
window.jQuery = function (nodeOrSelector) {
  let nodes = {}
  return nodes
}

window.$ = window.jQuery

window.jQuery.ajax = function (method, url, body, successFn, failFn) {
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
  $.ajax('post', '/xxx', 'a=1&b=2', () => {
    console.log('请求成功了')
  }, () => {
    console.log('请求失败了')
  })
})
```



## 第二版

参数太多可能会忘记参数代表的含义，所以使用对象来进行参数传递

函数successFn在ajax中执行，由ajax来调用就是回调

```javascript
/*...*/
window.jQuery.ajax = function (options) {

  let method = options.method
  let url = options.url
  let body = options.body
  let successFn = options.successFn
  let failFn = options.failFn

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
  $.ajax({
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

```



## 第三版

使用es6解构赋值来优化代码

```javascript
/*...*/
window.jQuery.ajax = function ({method,url,body,successFn,failFn}/*options*/) {
  // es6 解构赋值，只有一次可以放在function中
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
  $.ajax({
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
```



## 第四版

使用es6 Promise 优化

```javascript
/*...*/
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
```

