//Event Selectors
const userData = document.getElementById('signup')
const submitButton = document.querySelector('.submit-btn')
const loginButton = document.getElementById('login-btn')
const loginData = document.getElementById('login')
const viewDataButton = document.getElementById('viewData-btn')
const roleData = document.getElementById('role')
const showDiv = document.getElementById('show')

//Event Listeners
submitButton.addEventListener('click',storeData)
loginButton.addEventListener('click',handleLogin)
viewDataButton.addEventListener('click',showData)

//Global Array to store list of all users
let data = []

let credentials = {}
function getData() {
    credentials['name'] = userData.name.value
    credentials['email'] = userData.email.value
    credentials['username'] = userData.username.value
    credentials['password'] = userData.password.value
    credentials['gender'] = userData.gender.value
    credentials['role'] = userData.role.value
}

function validateInput() {
    for(let key in credentials) {  if(credentials[key] === "")  return false }
    return true
}

function validateEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(credentials['email']).toLowerCase());
}  

//Store data entered by user in data Array
function storeData() {
    getData()

    if(!validateInput()) {
        alert("Please enter all the fields!!")
        return
    }

    if(!validateEmail()) {
        alert("Enter Email in a correct format!!")
        return
    }

    if(credentials['password'].length < 8) {
        alert("Please Enter a password of at least length 8")
        return
    }

    let found = data.find((otherUser) => { return otherUser['email'] === credentials['email'] || otherUser['username'] === credentials['username']})

    if(found) {
        alert('A User with same email/username exists. Please enter a unique value!!')
    } else {
        data.push(credentials)
        credentials = {}

        let choice = prompt('You have Signed-up sucessfully!! Do you want to SignUp again (Yes/No)!!')
        choice === 'No' ? (document.querySelector('.signup-box').style.display = "none" ,document.querySelector('.login-box').style.display = "block" ) : userData.reset()
        console.log(data)
    }
}

//Function to handle Login
function handleLogin() {
    let found = data.find((userObject) => { return userObject['email'] === loginData.email.value && userObject['password'] === loginData.password.value })

    if(found) {
        alert("You have sucessfully logged in!!")
        document.querySelector('.login-box').style.display = "none" 
        document.querySelector('.role-box').style.display = "block"
    }
    else { alert("You have entered wrong credentials!!") }
}

//View List of Users According to role
function showData() {
    let found = data.find((userObject) => { return userObject['role'] === roleData.role.value && userObject['username'] === roleData.username.value })

    if(!found) {
        alert("Yours role does not matches with the credentials!! Try Again")
    } else {
        document.querySelector('.role-box').style.display = "none"
        document.getElementById('show').style.display = "block"

        let headers = ['Name', 'Email', 'User-Name', 'Password', 'Gender', 'Role']
        let table = document.createElement('table')
        table.setAttribute("id","usr-table")
        let headerRow = document.createElement('tr')

        headers.forEach((headerText) => {
            let header = document.createElement('th')
            let textNode = document.createTextNode(headerText)
            header.appendChild(textNode)
            headerRow.appendChild(header)
        })
        table.appendChild(headerRow)

        data.forEach(userObject => {
            if((roleData.role.value === 'Sales' && userObject['role']!='Sales') || (roleData.role.value === 'Operations' && userObject['role']!='Operations')) { return }
            let row = document.createElement('tr')

            Object.values(userObject).forEach(text => {
                let cell = document.createElement('td')
                let textNode = document.createTextNode(text)
                cell.appendChild(textNode)
                row.appendChild(cell)
            })
            table.appendChild(row)
        })
        showDiv.appendChild(table)
    }
}