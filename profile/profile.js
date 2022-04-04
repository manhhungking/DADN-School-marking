import app from "../firebase.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  setDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
const db = getFirestore();
const colRef = collection(db, "TEACHER");
var teacher_id = localStorage.getItem("T_id");
var course_name = localStorage.getItem("C_name");
var class_name = localStorage.getItem("Class_name");
var create_date = localStorage.getItem("Create_Date");
var semester = localStorage.getItem("Semester");
//realtime
let Classes = [];
onSnapshot(colRef, async (snapshot) => {
  Classes.push({
    T_id: teacher_id,
    C_name: course_name,
    Class_name: class_name,
    Semester: semester,
  });
  console.log("Danh sach lop: ", Classes);
  document.getElementById("--profile-name").innerHTML += `${
    Classes[0].C_name +
    " - " +
    Classes[0].Class_name +
    " - " +
    Classes[0].Semester +
    ")"
  }`;
  var teachers = [];
  snapshot.docs.forEach((doc) => {
    if (doc.id == teacher_id) {
      teachers.push(
        doc.id,
        doc.data().T_Email,
        doc.data().T_Name,
        doc.data().T_Phone
      );
    }
  });
  console.log("teachers:" + teachers[0] + " " + teachers[2]);

  document.getElementById("Teacher-Info").innerHTML += `
      <tr>
        <td>${teachers[0]}</td>
        <td>${teachers[1]}</td>
        <td>${teachers[2]}</td>
        <td>${teachers[3]}</td>
      </tr>
    `;
  console.log("Done");
});

const class_info = [];
await getDocs(
  collection(db, "TEACHER", teacher_id, "COURSE", course_name, "CLASS")
).then((snapshot) => {
  snapshot.docs.forEach(async (doc) => {
    if (doc.id == class_name) {
      class_info.push(doc.data().AnswerFile);
      console.log(doc.data().AnswerFile);
      document.getElementById("Class-Info").innerHTML += `
      <tr>
        <td>${class_name}</td>
        <td>${course_name}</td>
        <td>${semester}</td>
      </tr>
    `;
      for (let i = 0; i < class_info[0].length; i++) {
        document.getElementById("Key-Info").innerHTML += `
      <tr>
        <td>Question ${i}</td>
        <td>${class_info[0][i]}</td>
      </tr>`;
      }
    }
  });
});

var Student = [];
await getDocs(
  collection(
    db,
    "TEACHER",
    teacher_id,
    "COURSE",
    course_name,
    "CLASS",
    class_name,
    "STUDENT"
  )
).then((snapshot) => {
  snapshot.docs.forEach(async (doc) => {
    Student.push([doc.id, doc.data().S_Point]);
  });
  console.log(Student);
  for (let i = 0; i < Student.length; i++) {
    document.getElementById("Student-Info").innerHTML += `
        <tr>
          <td>${i}</td>
          <td>${Student[i][0]}</td>
          <td>${Student[i][1]}</td>
        </tr>`;
  }
});
