/*Contantes*/ 
const opcoes = ["1","2","3","4","5","6","7","8","9","0",
              "+","-","*","x","X","/",".",",","=","(",")",
              "Backspace","Enter","c"]

const operacaoes = ["+","-","/","*","."] 
const visor = document.getElementById("visor")

/*Variaveis*/
let conta,ultimoCaracter,virgula,virgulas,parenteses_abertos
function definirVariaveis(){
  conta = ""
  ultimoCaracter = ""
  virgula = false
  virgulas = 0 
  parenteses_abertos = 0
}
definirVariaveis()
/*Eventos*/
document.addEventListener("keydown", (e) =>{
  let tecla = e.key
  if(opcoes.includes(tecla)){
    tecla == "Backspace" ? apagar() : analisar(tecla)
  }
})
document.addEventListener('click', (e) =>{
  if(e.target.matches(".botao")){
    let id = e.target.id
    analisar(id)
  }
})

/*Escrever no visor*/
function escrever(caracter){
  visor.innerHTML += caracter
  conta = visor.innerHTML
  ultimoCaracter = conta.slice(-1,conta.length + 1)
}

/*Apagar, e avaliar o tipo de caractere a ser apagado*/
function apagar(){
  /*Resgatando valor do visor*/
  texto = visor.innerHTML

  /*Avaliando casos de virgula e operadores matemáticos*/
  if(operacaoes.includes(ultimoCaracter)){
    if(ultimoCaracter == "."){
      virgula = false
      virgulas--
    }else if(virgulas > 0){
      virgula = true
    }
  }
  if(ultimoCaracter == "("){
    parenteses_abertos--
  }else if(ultimoCaracter == ")"){
    parenteses_abertos++
  }

  /*Apagando e atualizando valores*/
  texto = texto.slice(0,-1)
  ultimoCaracter = texto.slice(-1,texto.length + 1)
  visor.innerHTML = texto
}

/*Função para impedir erros de sintaxe*/
function analisar(caracter)
{
  caracter == "(" || caracter == ")" ? caracter="()" : null
  /*Chave resultado*/
  if (caracter == "=" || caracter == "Enter"){
    conta = visor.innerHTML
    visor.innerHTML = eval(conta)
    return
  }

  if(caracter == "apagar"){ apagar(); return null }
  if(caracter == "c"){
    definirVariaveis()
    visor.innerHTML = ""
    return null
  }

  /*Avaliando parenteses*/
  if(caracter == "()"){
    if(parenteses_abertos == 0 || ultimoCaracter == "("){
      if( !operacaoes.includes(ultimoCaracter) && ultimoCaracter != "(" ){    
        caracter = ultimoCaracter == "" ? "(" : "*(" 
      }else{ caracter = "(" }
      parenteses_abertos++
    }else if(ultimoCaracter == ")" && parenteses_abertos == 0){
      caracter = "("; parenteses_abertos++
    }else if(operacaoes.includes(ultimoCaracter)){
      caracter = "(";parenteses_abertos++
    }else{
      caracter = ")"
      parenteses_abertos--
    }
  }

  /*Mais possibilidades de digitação*/
  if(["x","X",","].includes(caracter)){
    caracter = caracter == "x" || caracter == "X" ? "*" : "." 
  }

  /*Avaliando operadores matemáticos*/
  if(operacaoes.includes(caracter))
  {
    /*Evitando erros*/
    if (ultimoCaracter == ""){ return null }
    if(caracter == "." && virgula == true){return null}
    if (ultimoCaracter == "("){return null}
    if (ultimoCaracter == caracter){return null}

    /*Substituindo operadores*/
    if (operacaoes.includes(ultimoCaracter)){
      if(caracter == "." || ultimoCaracter == "."){return null}
      ultimoCaracter != caracter ? apagar() : null
    }
    /*Avaliando virgulas*/
    virgula = caracter == "." || ultimoCaracter == "." ? true : false
    if(virgula && caracter == "."){
      virgulas++
    }
  }
  escrever(caracter)
}