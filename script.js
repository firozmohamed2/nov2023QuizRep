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
            var optionKey ='a';
            switch(i){
               case 1: optionKey = 'a'; break;
               case 2: optionKey = 'b'; break;
               case 3: optionKey = 'c'; break;
               case 4: optionKey = 'd'; break;
               default : optionKey = 'a'; break;

            }
           // const optionKey = `Option ${i}`;
            if (!question.hasOwnProperty(optionKey)) { 
                console.error(`Missing '${optionKey}' property for question ${index + 1}.`);
                return;
            }
            options.push(question[optionKey]);
        }

        // Check if the question object has a 'Correct Option' property
        if (!question.hasOwnProperty('Correct Option')) { 
            console.error(`Missing 'Correct Option' property for question ${index + 1}.`);
            return;
        }

        const correctOptionIndex = options.indexOf(question['Correct Option']);
        const correctOptionLetter = question['Correct Option'];

        var correctAnswer = options[0];
        switch(correctOptionLetter){
            case 'a': correctAnswer = options[0]; break;
            case 'b': correctAnswer = options[1]; break;
            case 'c': correctAnswer = options[2]; break;
            case 'd': correctAnswer = options[3]; break;
            default : correctAnswer = options[0]; break;

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

            // Add click event listener to log the selected option
            optionElement.addEventListener('click', function () {
                console.log(`Selected option for question ${index + 1}: ${option}`);
               // console.log("correct option"+ correctOptionIndex);
//                console.log('Correct Option:', question['Correct Option']);
// console.log('Options:', options);
console.log('Correct Answer', correctAnswer);
if(option === correctAnswer) {
    console.log('Correct Answer');
    labelElement.innerHTML += ' ✅ ';
                console.log("correct");
}
else{
    console.log('Wrong Answer');
    labelElement.innerHTML += ' ❌ ';
}


            });

            // Mark the correct option
            if (optionIndex === correctOptionIndex) {
                labelElement.innerHTML += ' (Correct)';
                console.log("correct");
            }

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
