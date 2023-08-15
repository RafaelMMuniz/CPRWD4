let listaTarefasArray = [];

const botaoAddTarefa = document.getElementById("btnAddTarefa");

botaoAddTarefa.addEventListener("click", (evt) => {
    evt.preventDefault();

    const inputTarefa = document.getElementById("idTarefa");
    const tarefa = inputTarefa.value;

    listaTarefasArray.push(tarefa);

    let li = document.createElement("li");

    li.textContent = tarefa;

    const listaTarefasUL = document.getElementById("lista-tarefas");

    listaTarefasUL.appendChild(li);

    let botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = " x ";

    li.appendChild(botaoExcluir);

    botaoExcluir.addEventListener("click", (evt) => {

        let conteudoDeTextoDoLiArray = evt.target.parentNode.textContent.split(" ");
        let indice = listaTarefasArray.indexOf(conteudoDeTextoDoLiArray[0]);

        listaTarefasArray.forEach(tarefa => {

            if (conteudoDeTextoDoLiArray[0] == tarefa) {
                listaTarefasArray.splice(indice, 1);
            }
        });

        evt.target.parentNode.remove();
    });

    inputTarefa.value = "";
    console.log(listaTarefasArray);

    let tarefasPares = listaTarefasArray.map((tarefa, indice) => {
        if (indice % 2 == 0) {
            return tarefa;
        }
    }).filter((tarefa) => {
        return tarefa != undefined;
    });

    console.log(tarefasPares);
    console.log("\n");

});


let salarios = [1500, 2200, 1800, 2500, 3000, 1900, 2800, 2100, 1700, 3500];

let salariosAumentados = salarios.map(salario => {
    if (salario <= 2000) {
        return salario * 1.15; 
    } else {
        return salario * 1.10; 
    }
});

console.log("Salários Aumentados:", salariosAumentados);

let salariosSuperiores2500 = salariosAumentados.filter(salario => salario > 2500);

console.log("Salários > 2500:", salariosSuperiores2500);

let somaDosSalarios = salariosSuperiores2500.reduce((acumulador, salario) => acumulador + salario, 0);

console.log("Soma dos Salários:", somaDosSalarios);
const tbody = document.querySelector('tbody');
const task = [];
const btnAddTarefa = document.getElementById("btnAddTarefa");
const btnDec = document.getElementById("btnDec"); 
const btnCresc = document.getElementById("btnCresc"); 
const mensagemErro = document.getElementById("mensagemErro");


const campos = document.querySelectorAll("input[type='text'], input[type='number']");
const botaoSubmit = document.getElementById("btnAddTarefa");

    function verificarCamposPreenchidos() {
      for (const campo of campos) {
        if (campo.value.trim() === "") {
          return false;
        }
      }
      return true;
    }

    for (const campo of campos) {
      campo.addEventListener("input", () => {
        if (verificarCamposPreenchidos()) {
        btnAddTarefa.removeAttribute("disabled");
        } else {
        btnAddTarefa.setAttribute("disabled", "disabled");
        }
      });
    }
    botaoSubmit.addEventListener("click", (evt) => {
      if (!verificarCamposPreenchidos()) {
        evt.preventDefault();
        exibirMensagemDeErro("Todos os campos devem ser preenchidos.");
      }
    });

btnAddTarefa.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (verificarCamposPreenchidos()) {
    const descInput = document.getElementById("idDesc").value;
    const autorInput = document.getElementById("idAutor").value;
    const depInput = document.getElementById("idDep").value;
    const importInput = document.getElementById("idImport").value;

    const newTask = { desc: descInput, autor: autorInput, dep: depInput, import: importInput };
    task.push(newTask);
    show(newTask, task.length - 1);
  } else {
    exibirMensagemDeErro("Todos os campos devem ser preenchidos.");
  }
});


function show(taskObj, index) {
  var criaTable = document.createElement("tr");

  criaTable.innerHTML =  `
  <td class="obj">${taskObj.desc}</td>
  <td class="obj">${taskObj.autor}</td>
  <td class="obj">${taskObj.dep}</td>
  <td class="obj">${taskObj.import}</td>
  <td class="obj">
  ${
    taskObj.duration
      ? taskObj.duration
      : `
        <select class="text-field medium">
          <option value="" selected>selecionar duração</option>
          <option>1h</option>
          <option>2h</option>
          <option>4h</option>
          <option>8h</option>
          <option>16h</option>
          <option>24h</option>
          
        </select>
        <button class="ico-button" data-action="add-duration" data-index=${index}>+</button>
      `
  }
</td>
<td class="obj">
  ${
    taskObj.price
      ? taskObj.price
      : `<input class="text-field medium" type="number" name="task" placeholder="adicionar valor" /><button class="ico-button" data-index=${index} data-action="add-price">+</button>`
  }
</td>
<td><button class="btnDelete" data-index=${index}>x</button></td>
`;

  
  tbody.appendChild(criaTable);

  const btnDelete = criaTable.querySelector(".btnDelete");

  btnDelete.addEventListener("click", (evt) => {
      evt.preventDefault();
      task.splice(index, 1);
      tbody.removeChild(criaTable);
      mostra();
  });

}

function mostra(){
  ul.innerHTML = "";
  task.forEach((task) => {
      show(task);
  });

}

// btn decrecente 
btnDec.addEventListener("click", () => {
  event.preventDefault();
  tbody.innerHTML = "";
  task.sort((a, b) => {
    if (a.import < b.import) {
      return 1;
    }
    if (a.import > b.import) {
      return -1;
    }
    return 0;
  });
  task.forEach((task, index) => {
    show(task, index);
  });
});

// btn crescente
btnCresc.addEventListener("click", () => {
  event.preventDefault();
  tbody.innerHTML = "";
  task.sort((a, b) => {
    if (a.import < b.import) {
      return -1;
    }
    if (a.import > b.import) {
      return 1;
    }
    return 0;
  });
  task.forEach((task, index) => {
    show(task, index);
  });
});

tbody.addEventListener('click', ({target}) => {

    const action = target.getAttribute('data-action')
    const index = target.getAttribute('data-index')
  
    if (target.classList.contains('btnDelete')) {
      task.splice(index, 1)
      renderList()
    } else if (action == 'add-duration') {
      const durationSelect = target.previousElementSibling
      task[index].duration = durationSelect.value
  
      const td = durationSelect.parentNode
      td.innerHTML = task[index].duration
    } else if (action == 'add-price') {
        const priceInput = target.previousElementSibling;
        const inputValue = parseInt(priceInput.value);
    
        if (inputValue >= 0) {
            task[index].price = `R$ ${inputValue},00`;
    
            const td = priceInput.parentNode;
            td.innerHTML = task[index].price;
        } else {
            exibirMensagemDeErro("O valor da tarefa não pode ser negativo.");
        }
    }    
  
})