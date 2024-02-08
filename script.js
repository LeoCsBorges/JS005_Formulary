const form = document.querySelector('form')
const results = document.getElementById('results')
const users = []
let registrationMessage = ''

//previnir o envio do forumario para outro arquivo (default)
form.addEventListener('submit', function(event) {
    event.preventDefault()

    const firstName = document.querySelector('#firstname').value
    const lastName = document.querySelector('#lastname').value
    const userName = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const passwordConfirm = document.querySelector('#passwordConfirm').value
    const email = document.querySelector('#email').value
    const gender = document.querySelector('input[type=radio]:checked').value

        //validar os campos de password
        if (password != passwordConfirm) {
            alert('[ERROR]: not matching password fields. Please, try again!')
            return
        }

        //verificar se o username já existe
        for (let user of users){
            if (user.userName.toLowerCase() == userName.toLowerCase()) {
                alert('[ERROR]: this username is already registered! Please, try another username!')
                return
            }
        }

    //criar um objeto user, adiciona-lo no array users, e mostrar usuarios registrados
    const user = createUserObject(firstName, lastName, userName, password, email, gender)
    users.push(user) 
    registeredUsersDisplay(user)    
})


function createUserObject(firstName, lastName, userName, password, email, gender) {
    return {
        firstName,
        lastName,
        userName,
        password,
        email,
        gender,
    }
}


function createRegistrationMessage(msg) {
    //checkar se ja existe a messageDiv, se nao: criar; se sim: modificar
    const regMessageItem = document.getElementById('registration-message')

    if (regMessageItem == null) { //criar
        const messageDiv = document.createElement('div')
        messageDiv.setAttribute('id', 'registration-message')
        messageDiv.innerText = msg
        document.getElementById('user-registration').appendChild(messageDiv)

    } else { //modificar
        regMessageItem.innerHTML = `${registrationMessage} [${users.length}]`
    }

    //registro ok, limpar o formulario
    clearFormInputsValues()
}


//limpar todos os campos do formulario
function clearFormInputsValues () {
    const inputs = form.querySelectorAll('input')
    for (let input of inputs) {
        if (input.type != 'submit' && input.type != 'radio') {
            input.value = ''
        } 
    }
}


//criar elementos html para mostrar as informacoes do objeto 'user'
function registeredUsersDisplay (user) {
    const newDetailsItem = document.createElement('details') 
    const summaryItem = document.createElement('summary')
    const divItem = document.createElement('div')
    let detailsString = ''

    //percorrer e formatar o objeto 'user' para mostra-lo no html (summary)
    for (let prop in user) {
        if (user.hasOwnProperty(prop)) {
            //formatação da string antes de atribuir ao divItem.innerHTML
            detailsString += `<li>${prop}: <em>${user[prop]}</em></li>`
            detailsString = detailsString.replace(prop, (value) => value.toLowerCase())          
        }    
    } 
    divItem.innerHTML = detailsString
    summaryItem.innerHTML = `Username: <strong>${user.userName}</strong>`

    //mensagem de registro confirmado
    registrationMessage = 'You have registered successfully!'

    newDetailsItem.appendChild(summaryItem)
    newDetailsItem.appendChild(divItem)
    results.appendChild(newDetailsItem)
    createRegistrationMessage(registrationMessage)
}

