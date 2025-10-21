// Get references
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.querySelector("#studentTable tbody");
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display existing students
displayStudents();

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value;
  const grade = document.getElementById("grade").value.trim();
  const email = document.getElementById("email").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  if (editIndex === "") {
    // Add new student
    students.push({ name, age, grade, email });
  } else {
    // Update existing
    students[editIndex] = { name, age, grade, email };
    document.getElementById("editIndex").value = "";
  }

  localStorage.setItem("students", JSON.stringify(students));
  studentForm.reset();
  displayStudents();
});

function displayStudents() {
  studentTableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.email}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">✏️ Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">🗑️ Delete</button>
      </td>
    `;
    studentTableBody.appendChild(row);
  });
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("grade").value = student.grade;
  document.getElementById("email").value = student.email;
  document.getElementById("editIndex").value = index;
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}
