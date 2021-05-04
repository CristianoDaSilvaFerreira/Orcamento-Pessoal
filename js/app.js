class Expense {
	constructor(year, month, day, type, description, value) {
		this.year = year
		this.month = month
		this.day = day
		this.type = type
		this.description = description
		this.value = value
	}

	validadeDate() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getNextId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	save(d) {
		let id = this.getNextId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recoverAllRecords() {

		// array de despesas
		let expenses = Array()
		let id = localStorage.getItem('id')

		// recuperar todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++){

			// Recupera as despesas
			let expense = JSON.parse(localStorage.getItem(i))

			// Verificando se existe a possibildiade de haver índices que foram pulados/ removidos. Nestes casos iremos pular esse índice
			if(expense === null) {
				continue
			}

			expenses.push(expense)
		}

		return expenses
	}
}

let bd = new Bd()


function registerExpense() {

	let year = document.getElementById('year')
	let month = document.getElementById('month')
	let day = document.getElementById('day')
	let type = document.getElementById('type')
	let description = document.getElementById('description')
	let value = document.getElementById('value')

	let expense = new Expense(
		year.value, 
		month.value, 
		day.value, 
		type.value, 
		description.value,
		value.value
	)


	if(expense.validadeDate()) {
		bd.save(expense)

		document.getElementById('modal_title').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_title_div').className = 'modal-header text-success'
		document.getElementById('modal_context').innerHTML = 'Expense foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//dialog de sucesso
		$('#modalRegisterExpense').modal('show') 
	} else {
		
		document.getElementById('modal_title').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_title_div').className = 'modal-header text-danger'
		document.getElementById('modal_context').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegisterExpense').modal('show') 
	}
}

function loadListExpense() {

	let expenses = Array()

	expenses = bd.recoverAllRecords() 

	console.log(expenses)
	
	
}