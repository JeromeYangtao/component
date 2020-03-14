const fs = require('fs')
const traverse = require("@babel/traverse").default;

var methodNumber = 0
var catchNumber = 0


async function print(path) {
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    let newPath = path + '/' + dirent.name
    if (dirent.isDirectory()) {
      print(newPath)
    } else {
      let code = getCode(newPath)
      let ast = parseCode(code)
      traverseAst(ast)
    }
  }
}

const getCode = (path) => {
  return fs.readFileSync(path).toString()
}

const parseCode = (code) => {
  return require("@babel/parser").parse(code, {
    // parse in strict mode and allow module declarations
    sourceType: "module",
    plugins: [
      "jsx",
      "flow",
      "classProperties"
    ]
  });
}

const traverseAst = (ast) => {
  traverse(ast, {
    ClassMethod: function (path) {
      addMethodNumber()
      let tryStatement = path.node.body.body.find((item) => {
        return item.type === 'TryStatement'
      })
      if (tryStatement) {
        addCatchNumber()
      }
    },
    ClassProperty: function (path) {
      if (path.node.value.type === 'ArrowFunctionExpression') {
        addMethodNumber()
        let tryStatement = path.node.value.body.body.find((item) => {
          return item.type === 'TryStatement'
        })
        if (tryStatement) {
          addCatchNumber()
        }
      }
    }
  });
}

let addMethodNumber = () => {
  methodNumber++
}

let addCatchNumber = () => {
  catchNumber++
}

print('./test').then(() => {
  console.log('--------')
  console.log("methodNumber:" + methodNumber)
  console.log("catchNumber:" + catchNumber)
  console.log("catchNumber/methodNumber:" + catchNumber / methodNumber)
  console.log('--------')
})



