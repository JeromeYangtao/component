const fs = require('fs')

const code = fs.readFileSync('./test.ts').toString()

const ast = require("@babel/parser").parse(code, {
  // parse in strict mode and allow module declarations
  sourceType: "module",

  plugins: [
    // enable jsx and flow syntax
    "jsx",
    "flow",
    "classProperties"
  ]
});

const traverse = require("@babel/traverse").default;

let n = 0
let m = 0
traverse(ast, {
  // enter(path) {
  //   if (path.isIdentifier({ name: "n" })) {
  //     path.node.name = "x";
  //   }

  //   if (path.isClassMethod) {
  //     console.log(111)
  //   }
  //   // console.log(path)
  // }

  ClassMethod: function (path) {
    n++
    let tryStatement = path.node.body.body.find((item) => {
      return item.type === 'TryStatement'
    })
    if (tryStatement) {
      m++
    }


  },
  ClassProperty: function (path) {

    if (path.node.value.type === 'ArrowFunctionExpression') {
      n++
      let tryStatement = path.node.value.body.body.find((item) => {
        return item.type === 'TryStatement'
      })
      if (tryStatement) {
        m++
      }
    }
  }
});

console.log('--------')
console.log("n:" + n)
console.log("m:" + m)
console.log('--------')