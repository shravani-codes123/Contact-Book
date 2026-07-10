
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
const searchInput = document.getElementById('searchInput');

//validation for empty fields
if(nameField && phoneField && emailField && dateField && addContactbtn) {
    addContactbtn.addEventListener('click', function(e) {
        e.preventDefault(); //prevent the default form submission behavior
        const contact = {
            name: nameField.value,
            phone: phoneField.value,
            email: emailField.value,
            date: dateField.value
        };
        if (
            nameField.value.trim() === "" ||
            phoneField.value.trim() === "" ||
            emailField.value.trim() === "" ||
            dateField.value === ""
        ) {
            // Show an error message or prevent form submission
            alert("Please fill in all fields.");
            return;
        }

        contacts.push(contact);// added the contact object to the contact array
        displayContacts(contacts);
        console.log(contacts);
        clearForm() 
    });
}



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
function displayContacts(list) {

    // Step 1
    contactDisplay.innerHTML = "";

    // Step 2
    list.forEach((contact, index) => {

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
                displayContacts(contacts);
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

//function to clear form
function clearForm() {
    nameField.value = "";
    phoneField.value = "";
    emailField.value = "";
    dateField.value = "";
}

updateBtn.addEventListener("click", function () {

    if (editingIndex === -1) {
        return;
    }

    contacts[editingIndex] = {
        name: nameField.value,
        phone: phoneField.value,
        email: emailField.value,
        date: dateField.value
    };

    editingIndex = -1;

    addContactbtn.style.display = "inline-block";
    updateBtn.style.display = "none";

    clearForm();
    displayContacts(contacts);
});

function editContact(index) {

    editingIndex = index;

    const contact = contacts[index];

    nameField.value = contact.name;
    phoneField.value = contact.phone;
    emailField.value = contact.email;
    dateField.value = contact.date;

    addContactbtn.style.display = "none";
    updateBtn.style.display = "inline-block";
}

//search functionality 

searchInput.addEventListener("input" ,function () {
    
   const Inputvalue = searchInput.value;

   const lowerCase = Inputvalue.toLowerCase();

   const filteredContacts = contacts.filter((contact)=>{
    return contact.name.toLowerCase().includes(lowerCase);
   });
   

   displayContacts(filteredContacts);

});