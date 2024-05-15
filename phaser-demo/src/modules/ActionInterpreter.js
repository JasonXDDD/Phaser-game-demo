export class ActionInterpreter {
  origin = ''

  input(text) {
    this.origin = text

    // 分解指令 by ";"
    let actions = text.split(';')

    actions.forEach((action) => {
      let a = this.analyze(action)
      console.log(a)
    })
  }

  splitStringWithSymbols(text) {
    const regex = /([a-zA-Z]+|\d+|[^a-zA-Z\d\s])/g
    const result = text.match(regex)
    return result
  }

  parseExpression(input) {
    const stack = []
    for (let i = 0; i < input.length; i++) {
      if (input[i] === '(' || input[i] === '{') {
        // 遇到左括号，压入堆栈
        stack.push(input[i])
      } else if (input[i] === ')' || input[i] === '}') {
        // 遇到右括号，弹出元素直到找到对应的左括号
        const subArray = []
        while (
          stack.length > 0 &&
          stack[stack.length - 1] !== '(' &&
          stack[stack.length - 1] !== '{'
        ) {
          subArray.unshift(stack.pop())
        }
        if (stack.length === 0) {
          // 没有对应的左括号，表达式错误
          throw new Error('Syntax Error: Unmatched right parenthesis')
        }
        // 弹出左括号
        stack.pop()
        // 将子数组压入堆栈
        stack.push(subArray)
      } else {
        // 普通字符，直接压入堆栈
        stack.push(input[i])
      }
    }
    // 检查是否有未匹配的左括号
    if (stack.some((item) => item === '(' || item === '{')) {
      throw new Error('Syntax Error: Unmatched left parenthesis')
    }
    return stack
  }

  // 指令分析
  analyze(action) {
    let tmp = action
    // 指令格式： if(Condition)Target:Status>ToPlace
    // 透過正規表達式分解指令 Condition, Target, Status, ToPlace
    // 其中 Condition, Status, ToPlace 可能沒有值
    let condition = tmp.match(/if\(.*?\)/)
    tmp = tmp.replace(condition, '')
    let status = tmp.match(/:.*/)
    tmp = tmp.replace(status, '')
    let toPlace = tmp.match(/>.*$/)
    tmp = tmp.replace(toPlace, '')

    return {
      action,
      condition: this.analyzeCondition(condition ? condition[0] : ''),
      status: this.analyzeStatus(status ? status[0] : ''),
      toPlace: this.analyzeToPlace(toPlace ? toPlace[0] : ''),
      target: this.analyzeTarget(tmp)
    }
  }

  // 目標分析
  analyzeTarget(target) {
    let tmp = target
    tmp = this.splitStringWithSymbols(tmp)
    tmp = this.parseExpression(tmp)

    return {
      input: target,
      result: tmp
    }
  }

  // 條件分析
  analyzeCondition(condition) {
    let tmp = condition.replace(/if\(|\)/g, '')

    // TODO
    tmp = this.splitStringWithSymbols(tmp)

    return {
      input: condition,
      condition: tmp,
      result: false
    }
  }

  // 位置分析
  analyzeToPlace(toPlace) {
    let tmp = toPlace.replace(/>/g, '')

    // replace [a,b,c] to a,b,c
    tmp = tmp.replace(/\[|\]/g, '')
    let places = tmp
      .split(',')
      .filter((e) => e)
      .map((e) => {
        if (e.includes('$')) {
          // ^ = deck head, $ = deck tail
          // array = tail -> [0,1,2,3] <- head
          // ^ index = -1, $ index = 0

          let [a, b] = e.split('$')
          // $ = $0
          return [a, b ? Number(b) : 0]
        } else if (e.includes('^')) {
          // ^ = ^0
          let [a, b] = e.split('^')
          return [a, b ? (Number(b) === 0 ? undefined : -1 * Number(b)) : undefined]
        } else {
          return [e, undefined]
        }
      })

    return {
      input: toPlace,
      result: places
    }
  }

  // 狀態分析
  analyzeStatus(status) {
    const tmp = status
      .split(':')
      .filter((s) => s)
      .filter((e, i, a) => a.indexOf(e) === i)

    return {
      input: status,
      result: tmp
    }
  }
}
