// let at = ["first", "second", "third"];
// at = at.filter((item) => item !== "second");
// at.push("second");
// console.log(at);

// let classes = [
//   { 
//     className: "Play",
//     subs: [
//       { name: "ban", weekly: 6 },
//       { name: "eng", weekly: 5 },
//       { name: "math", weekly: 6 },
//       { name: "art", weekly: 1 },
//     ],
//     classPerDay: 3,
//     days: [
//       { name: "Satarday", sub: [] },
//       { name: "Sunday", sub: [] },
//       { name: "Monday", sub: [] },
//       { name: "Tuesday", sub: [] },
//       { name: "Wednesday", sub: [] },
//       { name: "Thursday", sub: [] }
//     ],
//   },
//   {
//     className: 2,
//     subs: [
//       { name: "ban", weekly: 6 },
//       { name: "eng", weekly: 6 },
//       { name: "science", weekly: 6 },
//       { name: "religion", weekly: 5 },
//       { name: "math", weekly: 6 },
//       { name: "art", weekly: 1 },
//     ],
//     classPerDay: 5,
//     days: [
//       { name: "Satarday", sub: [] },
//       { name: "Sunday", sub: [] },
//       { name: "Monday", sub: [] },
//       { name: "Tuesday", sub: [] },
//       { name: "Wednesday", sub: [] },
//       { name: "Thursday", sub: [] }
//     ],
//   },
//   {
//     className: 3,
//     subs: [
//       { name: "ban", weekly: 6 },
//       { name: "eng", weekly: 6 },
//       { name: "science", weekly: 6 },
//       { name: "religion", weekly: 5 },
//       { name: "math", weekly: 6 },
//       { name: "art", weekly: 1 },
//     ],
//     classPerDay: 5,
//     days: [
//       { name: "Satarday", sub: [] },
//       { name: "Sunday", sub: [] },
//       { name: "Monday", sub: [] },
//       { name: "Tuesday", sub: [] },
//       { name: "Wednesday", sub: [] },
//       { name: "Thursday", sub: [] }
//     ],
//   },

//   //   ...
// ];
let classes = JSON.parse(localStorage.getItem("classes"));
let response = "";

classes.forEach((singleClass, classesIndex) => {
  //Set subject for one day------------------------------
  //   -------------------------------------------------------
  // ----------------------------------------------------------
  singleClass.days.forEach((singleDay, dayIndex) => {
    // Making routin subjects (Step 1 started ) ############################
    let preiodNo = 0;
    singleClass.subs.forEach((singleSubject) => {
      if (preiodNo >= singleClass.classPerDay) {
        return;
      } else {
        if (singleSubject.weekly > 0) {
          //Check if class availabale in hand
          preiodNo += 1;
          singleDay.sub.push(singleSubject.name);
          singleSubject.weekly = singleSubject.weekly - 1; //Updating remaining class;
        } else {
          return;
        }
      }
    });
    // Making routin subjects ended (Step 1 done) ##########################

    // Now checking if overlapped day by day (Step 2 started ) #####################----------------------------------------------------------------
    if (classesIndex == 0) {
      // console.log("No need to check overlapping !");
    } else {
      const loopLength = classesIndex;
      for (let i = 0; i < loopLength; i++) {
        // is overlapping
        const checkingWith = classes[i].days[dayIndex].sub; // taking all classes one by one
        checkingWith.forEach((checkingElement, checkingIndex) => {
          console.log(
            "Matching...... class " +
              singleClass.className +
              "  with class " +
              classes[i].className
          );
          console.log(checkingElement + " VS " + singleDay.sub[checkingIndex]);
          if (checkingElement === singleDay.sub[checkingIndex]) {
            //If matching then delete that index value and push it into last index of array
            // console.log("Mached index no " + checkingIndex);
            console.log("Matched ! " + checkingElement);

            let temp = singleDay.sub.filter(
              (item) => item !== singleDay.sub[checkingIndex]
            );

            temp.push(checkingElement);
            singleDay.sub = temp;
          } else {
            console.log(checkingElement + " Not matched ");
          }
        });
      }
      console.log(
        "================================\n================================\n================================\n\n\n"
      );
    }
    // Now checking if overlapped day by day (Step 2 started ended ) #####################---------------------------------------------------------
    // console.log(singleClass.days.sub);
  });

  //Check overlapping with everyclass
});

console.log("***********The Routine final result !**********************");

function API(){
  let allRoutine = [];
  classes.forEach((element) => {
    let singleClassRoutine = {};
    let entries = {};
    // console.log("Class " + element.className + " routine ");
    // console.log(dayElement.name + " ==> " + " " + dayElement.sub);
    entries['className'] = element.className;
    entries['routine']=[];
      
  
    element.days.forEach((dayElement) => {
      entries['routine'].push(dayElement);
    });
    singleClassRoutine = entries;
  
  
    allRoutine.push(singleClassRoutine);
  
    //Weekly reaming started
    // console.log(
    //   "Weekly remain class for class" +
    //     element.className +
    //     " ---------------------------------- "
    // );
    // console.log(element.subs);
    //Weekly reaming ended
  });
  
  return allRoutine;
}

console.log(API());
function generateRoutine(){

  let displaySpot = document.querySelector(".routine-section");
  let data = API();
  let dom = data.map((singleClass, index)=>
    `<div class="routine p-4">
  <h6 class="fw-bold text-center">Rutine for class ${singleClass.className}</h6>
  <table class="table table-hover table-responsive table-bordered " style="width:100%">
    <tr>
      <th>Days</th>
      <th>7-7:30</th>
      <th>7:30-8:00</th>
      <th>9:00-9:30</th>
      <th>Break</th>
      <th>10:00-10:30</th>
      <th>10:30-11:00</th>
      <th>11:00 - 11:30</th>
      <th>11:30 - 12:00</th>
      <th>12:00 - 12:30</th>
    </tr>
    <tr>
      <th>Sat:</th>
      ${singleClass.routine[0].sub.map(item =>
        `      <td>${item === "" ? "x" : item}</td>
        `
        ).join('')}
  
    </tr>
    <tr>
      <th>Sun:</th>
      ${singleClass.routine[1].sub.map(item =>
        `      <td>${item === "" ? "x" : item}</td>
        `
        ).join('')}
    </tr>
    <tr>
      <th>Mon:</th>
      ${singleClass.routine[2].sub.map(item =>
        `      <td>${item === "" ? "x" : item}</td>
        `
        ).join('')}
    </tr>
    <tr>
      <th>Tue:</th>
      ${singleClass.routine[3].sub.map(item =>
        `      <td>${item === "" ? "x" : item}</td>
        `
        ).join('')}
    </tr>
    <tr>
      <th>Wed:</th>
      ${singleClass.routine[4].sub.map(item =>
        `      <td>${item === "" ? "x" : item}</td>
        `
        ).join('')}
    </tr>
    <tr>
      <th>Thurs:</th>
      ${singleClass.routine[5].sub.map(item =>
        `      <td>${item === "" ? "x" : item}</td>
        `
        ).join('')}
    </tr>
  </table>
</div>
`
    ).join('');

    displaySpot.innerHTML = dom
}


