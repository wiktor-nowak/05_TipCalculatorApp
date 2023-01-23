class TipCalculator {
    constructor(tip_person, bill_person, togglingAllerts) {
        this.tip_person = tip_person;
        this.bill_person = bill_person;
        this.togglingAllerts = togglingAllerts;
        this.clear();
    }

    tip_calculation(bill_amount, tip_percentage, people_count) {

        if (people_count <= 0) {
            this.doNotDivideByZero(true);
        } else {
            this.doNotDivideByZero(false);
            let bill = parseFloat(bill_amount / people_count);
            let tip = bill * .01 * parseInt(tip_percentage);
            this.updateView(tip, bill);
        }
    }

    updateView(tip_per_person, bill_by_person) {
        this.tip_person.innerText = '$' + tip_per_person.toFixed(2);
        this.bill_person.innerText = '$' + bill_by_person.toFixed(2);
    }

    doNotDivideByZero(check) {
        togglingAllerts(check);
    }

    clear() {
        this.tip_person.innerText = '$0.00';
        this.bill_person.innerText = '$0.00';
        this.tip_value = undefined;
    }
}

// --- page elements selection ---

const insert_bill = document.querySelector('#insert-bill');
const tip_boxes = document.querySelectorAll('[data-tip]');
const tip_field = document.querySelector('#tip-custom');
const tip_light_box = document.querySelector('.light-tip-box');
const people = document.querySelector('#people');
const alert_info = document.querySelector('[data-alert-info]');
const people_box = document.querySelector('[data-people]')
const tip_person = document.querySelector('.tip-person');
const bill_person = document.querySelector('.bill-person');
const reset_button = document.querySelector('.reset');
let tip_value = 0;

const tip_calculator = new TipCalculator(tip_person, bill_person, togglingAllerts);



// --- methods for view elements handling ---
function removeMarks() {
    tip_boxes.forEach(field => {
        field.classList.remove('marked');
    })
    tip_light_box.classList.remove('field-focus');
}

function fieldsClear() {
    insert_bill.value = '';
    people.value = '';
    tip_field.value = '';
}

function togglingAllerts(check) {
    if (check) {
        people_box.classList.add('red-alert');
        alert_info.classList.remove('alert-hold');
    } else {
        people_box.classList.remove('red-alert');
        alert_info.classList.add('alert-hold');
    }
}

function calculatingValues() {
    tip_calculator.tip_calculation(insert_bill.value, tip_value, people.value);
}

// --- eventListeners section ---

tip_boxes.forEach(field => {
    field.addEventListener('click', (e) => {
        removeMarks();
        field.classList.add('marked');
        tip_value = field.innerText.slice(0, -1);
        calculatingValues();
    })
});


tip_field.addEventListener('focusin', (e) => {
    removeMarks();
    tip_light_box.classList.add('light-tip-box');
})


tip_field.addEventListener('focusout', (e) => {
    tip_value = tip_field.value;
    calculatingValues();
    tip_light_box.classList.add('field-focus');
})

people.addEventListener('focusout', (e) => {
    calculatingValues();
})

insert_bill.addEventListener('focusout', (e) => {
    calculatingValues();
})

reset_button.addEventListener('click', (e) => {
    removeMarks();
    fieldsClear();
    tip_calculator.clear();
})