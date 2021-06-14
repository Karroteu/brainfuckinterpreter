function run() {
  document.getElementById("console").innerHTML = ""
  let memorySize = document.getElementById("number").value
  const memory = new Array(memorySize).fill(0)
  //wskaźnik instrukcji
  let ipointer = 0
  //wskaźnik pamięci
  let mpointer = 0
  //stos lokalizacji początków pętli
  let astack = []

  let program = document.getElementById("code").value
  let output = document.getElementById("console").value

  interpret()

  /* Interpreter */

  function sendOutput(value) {
      output += String.fromCharCode(value)
  }

  function getInput() {
    let val = prompt("Wprowadź znak").charCodeAt(0)
    return val
  }

  function interpret() {
      let end = false

      while (!end) {
          switch (program[ipointer]) {
              case '>':
                  if (mpointer == memory.length - 1)
                      memory.push(0, 0, 0, 0, 0)
                  mpointer++
                  break
              case '<':
                  if (mpointer > 0)
                      mpointer--
                  break
              case '+':
                  memory[mpointer]++
                  break
              case '-':
                  memory[mpointer]--
                  break
              case '.':
                  sendOutput(memory[mpointer])
                  break
              case ',':
                  memory[mpointer] = getInput()
                  break
              case '[':
                  if (memory[mpointer]) { // jeżeli nie jest 0
                      astack.push(ipointer)
                  } else { // Pomiń odpowiadające zakończenie pętli
                      let count = 0
                      while (true) {
                          ipointer++
                          if (!program[ipointer]) break
                          if (program[ipointer] === "[") count++
                          else if (program[ipointer] === "]") {
                              if (count) count--
                              else break
                          }
                      }
                  }
                  break
              case ']':
                  //Wskaźnik automatycznie zwiększa się wraz z każdą iteracją, więc musimy zmniejszyć go by otrzymać właściwą wartość
                  ipointer = astack.pop() - 1
                  break
              case undefined: //osiągnięto koniec programu
                  end = true
                  break
              default: //traktowanie innych znaków jako komentarzy
                  break
          }
          ipointer++;
      }
      document.getElementById("console").innerHTML = output
      return output
  }
}
