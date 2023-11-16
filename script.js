document.addEventListener('DOMContentLoaded', function () {
    // Function to handle file input change
    function handleFile(e) {
        const file = e.target.files[0];
        if (file) {
            // Use SheetJS to parse the Excel file
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Assume the first sheet contains quiz data
                const quizData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

                // Display the quiz
                displayQuiz(quizData);
            };
            reader.readAsArrayBuffer(file);
        }
    }

    // Function to display the quiz
  // ...

// ...

// ...

function displayQuiz(questions) {
    const quizContainer = document.getElementById('quiz-container');

    // Check if 'questions' is an array
    if (!Array.isArray(questions)) {
        console.error('Invalid or missing quiz data.');
        return;
    }

    // Iterate through questions and create HTML elements
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');

        // Check if the question object has a 'Question Text ' property
        if (!question.hasOwnProperty('Question Text ')) {
            console.error(`Missing 'Question Text ' property for question ${index + 1}.`);
            return;
        }

        questionElement.innerHTML = `<p>${question['Question Text ']}</p>`;

        // Check if the question object has 'Option 1', 'Option 2', etc. properties
        const options = [];
        for (let i = 1; i <= 4; i++) {
            const optionKey = `Option ${i}`;
            if (!question.hasOwnProperty(optionKey)) {
                console.error(`Missing '${optionKey}' property for question ${index + 1}.`);
                return;
            }
            options.push(question[optionKey]);
        }

        // Iterate through options and create HTML elements
        options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('input');
            optionElement.type = 'radio';
            optionElement.name = `question-${index}`;
            optionElement.value = option;
            optionElement.id = `question-${index}-option-${optionIndex}`;

            const labelElement = document.createElement('label');
            labelElement.htmlFor = `question-${index}-option-${optionIndex}`;
            labelElement.innerHTML = option;

            questionElement.appendChild(optionElement);
            questionElement.appendChild(labelElement);
        });

        quizContainer.appendChild(questionElement);
    });
}

// ...


    // Attach event listener to file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx';
    fileInput.addEventListener('change', handleFile);

    // Display file input
    document.body.appendChild(fileInput);
});