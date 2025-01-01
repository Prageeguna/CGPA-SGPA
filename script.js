// Define subjects and credits for each semester
const semestersData = {
    semester1: [
        { code: "HS3151", name: "Professional English - I", credits: 3 },
        { code: "MA3151", name: "Matrices and Calculus", credits: 4 },
        { code: "PH3151", name: "Engineering Physics", credits: 3 },
        { code: "CY3151", name: "Engineering Chemistry", credits: 3 },
        { code: "GE3151", name: "Problem Solving and Python Programming", credits: 3 },
        { code: "GE3172", name: "Problem Solving and Python Programming Lab", credits: 2 },
        { code: "BS3172", name: "Physics and Chemistry Laboratory", credits: 2 }
    ],
    semester2: [
        { code: "HS3252", name: "Professional English - II", credits: 2 },
        { code: "MA3251", name: "Statistics and Numerical Methods", credits: 4 },
        { code: "BM3251", name: "BioSciences for Medical Engineering", credits: 3 },
        { code: "BE3251", name: "Basics for Electronics and Electrical Engineering", credits: 3 },
        { code: "BM3252", name: "Medical Physics", credits: 3 },
        { code: "GE3251", name: "Engineering Graphics", credits: 4 },
        { code: "GE3271", name: "Engineering Mechanics Laboratory", credits: 2 },
        { code: "BE3271", name: "Bioscience Laboratory", credits: 2 }
    ],
    semester3: [
        { code: "MA3351", name: "Transform Partial Differential Equation", credits: 4 },
        { code: "EC3354", name: "Signals and System", credits: 4 },
        { code: "BM3352", name: "Electric Circuit Analysis", credits: 3 },
        { code: "BM3353", name: "Fundamentals of Electronics Devices and Circuits", credits: 3 },
        { code: "BM3351", name: "Anatomy and Human Physiology", credits: 4 },
        { code: "CS3391", name: "Object Oriented Programing", credits: 3 },
        { code: "BE3361", name: "Fundamentals of Electronics Devices and Circuits Laboratory", credits: 1.5 },
        { code: "CS3381", name: "Object Oriented Programing laboratory", credits: 1.5 },
    ],
    semester4: [
        { code: "MA3451", name: "Random Process and Linear Algebra", credits: 4 },
        { code: "MD3401", name: "Analog and Digital Electronics", credits: 3 },
        { code: "MD3402", name: "Biomedical Sensor and Instrumentation ", credits: 3 },
        { code: "BM3451", name: "BioControl System", credits: 3 },
        { code: "EC3492", name: "Digital Signal Processing ", credits: 4 },
        { code: "GE3451", name: "Environmental Sciences and Sustainability", credits: 2 },
        { code: "MD3411", name: "Analog and Digital Electronics Laboratory", credits: 2 },
        { code: "MD3412", name: "Biomedical Sensor and Instrumentation laboratory", credits: 1.5 },
    ],
    semester5: [
        { code: "BM3551", name: "Embedded System and IOMT", credits: 3 },
            { code: "BM3591", name: "Diagnostic and Therapeutic Equipment ", credits: 3 },
            { code: "CBM337", name: "Biomaterials", credits: 3 },
            { code: "CBM351", name: "Hospital Planning & Management", credits: 3 },
            { code: "CBM357", name: "Medical Device Regulation", credits: 3 },
            { code: "BM3561", name: "Diagnostic and Therapeutic Equipment  Laboratory", credits: 2 },
            { code: "BM3562", name: "Embedded systems and IOMT Laboratory", credits: 1.5 },
    ],
    semester6: [
            { code: "BM3651", name: "Fundamentals in Healthcare Analytics", credits: 3 },
            { code: "BM3652", name: "Medical Image Processing", credits: 4 },
            { code: "CBM331", name: "Advancement in Healthcare Technology", credits: 3 },
            { code: "CBM352", name: "Human Assist Device", credits: 3 },
            { code: "CS3491", name: "Artificial Intelligence and Machine Learning", credits: 4 },
            { code: "NM1013", name: "IIOT & 4.0 Revolution", credits: 3 },
            { code: "OBT351", name: "Food Nutrition and Health", credits: 3 },
        ],
};

// Populate SGPA calculators
document.addEventListener("DOMContentLoaded", () => {
    const semestersContainer = document.getElementById("semesters");
    Object.keys(semestersData).forEach((semester) => {
        const section = document.createElement("section");
        section.innerHTML = `
            <h2>${semester.toUpperCase()} SGPA Calculator</h2>
            <form id="${semester}-form">
                <div id="${semester}-subjects-container"></div>
                <button type="button" class="button" onclick="calculateSGPA('${semester}')">
                    Calculate ${semester.toUpperCase()} SGPA
                </button>
                <div id="${semester}-result" class="result" style="display: none;"></div>
            </form>
        `;
        semestersContainer.appendChild(section);
        populateSubjects(semester);
    });

    // Add CGPA input fields
    const cgpaInputs = document.getElementById("cgpa-inputs");
    Object.keys(semestersData).forEach((semester, index) => {
        cgpaInputs.innerHTML += `
            <div class="form-group">
                <label for="${semester}">Semester ${index + 1} SGPA:</label>
                <input type="number" id="${semester}" min="0" max="10" step="0.01">
            </div>
        `;
    });
});

// Populate subjects for each semester
function populateSubjects(semester) {
    const container = document.getElementById(`${semester}-subjects-container`);
    semestersData[semester].forEach((subject, index) => {
        const div = document.createElement("div");
        div.className = "form-group";
        div.innerHTML = `
            <label>${subject.code}: ${subject.name}</label>
            <input type="number" id="${semester}-subject${index}-grade" min="0" max="10" step="0.01" placeholder="Grade Points">
        `;
        container.appendChild(div);
    });
}

// Calculate SGPA
function calculateSGPA(semester) {
    const subjects = semestersData[semester];
    let totalGradeCredits = 0;
    let totalCredits = 0;

    subjects.forEach((subject, index) => {
        const gradeInput = document.getElementById(`${semester}-subject${index}-grade`);
        const grade = parseFloat(gradeInput.value);

        if (!isNaN(grade)) {
            totalGradeCredits += grade * subject.credits;
            totalCredits += subject.credits;
        }
    });

    if (totalCredits === 0) {
        alert("Please enter valid grades for all subjects.");
        return;
    }

    const sgpa = (totalGradeCredits / totalCredits).toFixed(2);
    const resultDiv = document.getElementById(`${semester}-result`);
    resultDiv.style.display = "block";
    resultDiv.textContent = `SGPA: ${sgpa}`;
}

// Calculate CGPA
function calculateCGPA() {
    const sgpaInputs = Object.keys(semestersData).map(
        (semester) => parseFloat(document.getElementById(semester).value)
    );

    const validSgpa = sgpaInputs.filter((value) => !isNaN(value));
    if (validSgpa.length === 0) {
        alert("Please enter valid SGPAs for all semesters.");
        return;
    }

    const cgpa = (validSgpa.reduce((sum, value) => sum + value, 0) / validSgpa.length).toFixed(2);
    const resultDiv = document.getElementById("cgpa-result");
    resultDiv.style.display = "block";
    resultDiv.textContent = `CGPA: ${cgpa}`;
}
