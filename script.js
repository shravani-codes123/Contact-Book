
const contacts = []

let editingIndex = -1;
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');
const emailField = document.getElementById('email');
const dateField = document.getElementById('date');
const addContactbtn = document.getElementById('submit-btn-id');
const updateBtn = document.getElementById('updateBtn');

const clearBtn = document.getElementById('clear-btn-id');
const contactDisplay = document.getElementById('contactDisplay');



if(nameField && phoneField && emailField && dateField && addContactbtn) {
    addContactbtn.addEventListener('click', function(e) {
        e.preventDefault(); //prevent the default form submission behavior
        const contact = {
            name: nameField.value,
            phone: phoneField.value,
            email: emailField.value,
            date: dateField.value
        };
        contacts.push(contact);// added the contact object to the contact array
        displayContacts();
        console.log(contacts);
        clearForm() 
    });
}

if (
    nameField.value.trim() === "" ||
    phoneField.value.trim() === "" ||
    emailField.value.trim() === "" ||
    dateField.value === ""
)


if(clearBtn) {
    clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nameField.value = '';
        phoneField.value = '';
        emailField.value = '';
        dateField.value = '';
    });
}

console.log(contacts);
//Display Contacts
function displayContacts() {

    // Step 1
    contactDisplay.innerHTML = "";

    // Step 2
    contacts.forEach((contact, index) => {

       const contactCard = document.createElement('div');
       contactCard.classList.add("contact-card");

       const name = document.createElement("h3")
       name.textContent = contact.name;

       const phone  = document.createElement("p")
       phone.textContent = "phone :" + contact.phone;

       const email = document.createElement("p")
       email.textContent = "email :" + contact.email;
       
       const date = document.createElement("p")
       date.textContent = "date :" + contact.date;

       //creating button container
       const buttonContainer = document.createElement("div");
         buttonContainer.classList.add("button-container");

         //creating edit button
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", function() {
               
                editContact(index);
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function() {
                contacts.splice(index, 1);
                displayContacts();
            });

            buttonContainer.appendChild(editBtn);
            buttonContainer.appendChild(deleteBtn);

            contactCard.appendChild(name);
            contactCard.appendChild(phone);
            contactCard.appendChild(email);
            contactCard.appendChild(date);
            contactCard.appendChild(buttonContainer);

            contactDisplay.appendChild(contactCard);

    });

}
function clearForm() {
    nameField.value = "";
    phoneField.value = "";
    emailField.value = "";
    dateField.value = "";
}



function editContact(index){
    console.log("Editing contact at index:", index);
    editingIndex = index;

    const contact = contacts[index];
    nameField.value = contact.name;
    phoneField.value = contact.phone;
    emailField.value = contact.email;
    dateField.value = contact.date;

    addContactbtn.style.display = "none";
    updateBtn.style.display = "inline-block";

    updateBtn.addEventListener("click", function() {
        contacts[editingIndex] = {
            name: nameField.value,
            phone: phoneField.value,
            email: emailField.value,
            date: dateField.value
        };

        editingIndex = -1; // Reset the editing index
       
        addContactbtn.style.display = "inline-block";
        updateBtn.style.display = "none";
        
        clearForm();
        displayContacts();
    });

}


