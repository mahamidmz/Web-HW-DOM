const form = document.getElementById('calcForm');
const firstInput = document.getElementById('firstNumber');
const secondInput = document.getElementById('secondNumber');
const operationSelect = document.getElementById('operation');
const resultInput = document.getElementById('result');
const resultFeedback = document.getElementById('resultFeedback');
const logTableBody = document.querySelector('#logTable tbody');
const logTextarea = document.getElementById('logTextarea');

function printToLog(text, append) {
    if (append) {
        logTextarea.value += (logTextarea.value ? '\n' : '') + text;
    } else {
        logTextarea.value = text;
    }
}

function clearValidation() {
    [firstInput, secondInput, operationSelect, resultInput].forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
    });
}

function getOperationSymbol(op) {
    switch (op) {
        case 'add': return '+';
        case 'sub': return '−';
        case 'mul': return '×';
        case 'div': return '÷';
        default: return '';
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearValidation();

    const aStr = firstInput.value.trim();
    const bStr = secondInput.value.trim();
    const op = operationSelect.value;

    const a = Number(aStr);
    const b = Number(bStr);

    let valid = true;

    if (aStr === '' || Number.isNaN(a)) {
        firstInput.classList.add('is-invalid');
        valid = false;
    } else {
        firstInput.classList.add('is-valid');
    }

    if (bStr === '' || Number.isNaN(b)) {
        secondInput.classList.add('is-invalid');
        valid = false;
    } else {
        secondInput.classList.add('is-valid');
    }

    if (!op) {
        operationSelect.classList.add('is-invalid');
        valid = false;
    } else {
        operationSelect.classList.add('is-valid');
    }

    if (valid && op === 'div' && b === 0) {
        secondInput.classList.remove('is-valid');
        secondInput.classList.add('is-invalid');
        resultInput.value = '';
        resultInput.classList.remove('is-valid');
        resultInput.classList.add('is-invalid');
        resultFeedback.textContent = 'אי אפשר לחלק באפס';
        return;
    }

    if (!valid) {
        resultInput.value = '';
        resultInput.classList.remove('is-valid');
        resultInput.classList.add('is-invalid');
        resultFeedback.textContent = 'נא להזין ערכים מספריים ולבחור פעולה';
        return;
    }

    let res;
    switch (op) {
        case 'add': res = a + b; break;
        case 'sub': res = a - b; break;
        case 'mul': res = a * b; break;
        case 'div': res = a / b; break;
    }

    resultInput.value = res;
    resultInput.classList.remove('is-invalid');
    resultInput.classList.add('is-valid');

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${a}</td>
        <td>${b}</td>
        <td>${getOperationSymbol(op)}</td>
        <td>${res}</td>
    `;
    logTableBody.appendChild(tr);

    const logLine =
        `מספר 1: ${a} | מספר 2: ${b} | פעולה: ${getOperationSymbol(op)} | תוצאה: ${res}`;
    printToLog(logLine, true);
});
