  let times = JSON.parse(localStorage.getItem("timesList")) || [];

function saveTimes() {
  localStorage.setItem("timesList", JSON.stringify(times));
}

function loadSchedule() {
  const table = document.getElementById("schedule");
  table.innerHTML = "";

  times.forEach(({ subject, time }) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${subject}</td><td>${time}</td>`;
    table.appendChild(row);
  });
}

function addSubject() {
  const subject = document.getElementById("subject").value.trim();
  const time = document.getElementById("time").value;

  if (!subject || !time) {
    alert("يرجى ملء المادة والوقت.");
    return;
  }

  times.push({ subject, time });
  saveTimes();
  loadSchedule();

  document.getElementById("subject").value = "";
  document.getElementById("time").value = "";
}

function removeLastSubject() {
  if (times.length === 0) {
    alert("لا توجد حصص لحذفها!");
    return;
  }

  times.pop();
  saveTimes();
  loadSchedule();
}

function getSelectedAlarmSound() {
  const selected = localStorage.getItem("alarmSound") || "alarm1.mp3";
  return selected;
}

function checkAlarm() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // hh:mm

  for (let { time } of times) {
    if (time === currentTime) {
      const audio = new Audio(getSelectedAlarmSound());
      audio.play();
      break;
    }
  }
}

setInterval(checkAlarm, 1000);

// زر تشغيل المنبّه يدويًا
document.getElementById("alarmBtn").onclick = () => {
  const audio = new Audio(getSelectedAlarmSound());
  audio.play();
};

// تغيير اللغة
const translations = {
  ar: {
    title: "جدول الحصص الأسبوعي",
    subjectLabel: "المادة",
    timeLabel: "الساعة",
    addBtn: "إضافة حصة",
    removeBtn: "حذف آخر حصة",
    alarmBtn: "تشغيل المنبّه",
    notesTitle: "مذكرة جانبية"
  },
  fr: {
    title: "Emploi du temps hebdomadaire",
    subjectLabel: "Matière",
    timeLabel: "Heure",
    addBtn: "Ajouter un cours",
    removeBtn: "Supprimer le dernier cours",
    alarmBtn: "Activer l'alarme",
    notesTitle: "Bloc-notes"
  }
};

 
 