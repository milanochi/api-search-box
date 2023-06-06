const dataUserTemplate = document.querySelector('[data-user-template]');
const dataUserDetails = document.querySelector('[data-user-details]');
const dataUserInput = document.querySelector('[data-user-input]');
const searchImg = document.querySelector('.wrapperImg');
const expand = document.querySelector('.expand');
const show = document.querySelector('.wrapper__extension');

let users = [];

dataUserInput.addEventListener('input', (e) => {
    let value = e.target.value;  
    console.log(value)
    users.forEach(user => {
            let isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
            user.element.classList.toggle('hide', !isVisible)
            show.classList.toggle('isVisible')
    })
})
dataUserInput.addEventListener('focus', (e) => {
    show.style.display = 'block';
    dataUserInput.style.borderBottomLeftRadius = '0';
    dataUserInput.style.borderBottomRightRadius = '0';
    searchImg.style.borderBottomRightRadius = '0';
    expand.style.width = '400px';
    e.target.placeholder = '';
})
dataUserInput.addEventListener('blur', (e) => {
    show.style.display = 'none';
    dataUserInput.style.borderBottomLeftRadius = '20px';
    dataUserInput.style.borderBottomRightRadius = '20px';
    searchImg.style.borderBottomRightRadius = '20px';
    expand.style.width = '300px';
    e.target.placeholder = 'Search Users...';
})
try{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        users = data.map((user) => {
            const card = dataUserTemplate.content.cloneNode(true).children[0]
            const username = card.querySelector('[data-header]')
            const email = card.querySelector('[data-content]')
            username.textContent = user.name;
            email.textContent = user.email;
            console.log(user)

            show.append(card)
            return { name: user.name, email: user.email, element: card }
        })
    })
}
catch(err) {
    console.log(err.message)
}

