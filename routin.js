// let at = ["first", "second", "third"];
// at = at.filter((item) => item !== "second");
// at.push("second");
// console.log(at);

let classes = [
  {
    className: 1,
    subs: [
      { name: "ban", weekly: 6 },
      { name: "eng", weekly: 5 },
      { name: "math", weekly: 6 },
      { name: "art", weekly: 1 },
    ],
    classPerDay: 3,
    days: [{ name: "Satarday", sub: [] }],
  },
  {
    className: 2,
    subs: [
      { name: "ban", weekly: 6 },
      { name: "eng", weekly: 6 },
      { name: "science", weekly: 6 },
      { name: "religion", weekly: 5 },
      { name: "math", weekly: 6 },
      { name: "art", weekly: 1 },
    ],
    classPerDay: 5,
    days: [{ name: "Satarday", sub: [] }],
  },
  {
    className: 3,
    subs: [
      { name: "ban", weekly: 6 },
      { name: "eng", weekly: 6 },
      { name: "science", weekly: 6 },
      { name: "religion", weekly: 5 },
      { name: "math", weekly: 6 },
      { name: "art", weekly: 1 },
    ],
    classPerDay: 5,
    days: [{ name: "Satarday", sub: [] }],
  },

  //   ...
];
let response = "";

classes.forEach((singleClass = element, classesIndex) => {
  //Set subject for one day------------------------------
  //   -------------------------------------------------------
  // ----------------------------------------------------------
  singleClass.days.forEach((singleDay = element, dayIndex) => {
    // Making routin subjects (Step 1 started ) ############################
    let preiodNo = 0;
    singleClass.subs.forEach((singleSubject = element) => {
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
classes.forEach((element) => {
  console.log("Class " + element.className + " routine ");
  element.days.forEach((dayElement = element) => {
    console.log(dayElement.name + " ==> " + " " + dayElement.sub);
  });

  //Weekly reaming started
  // console.log(
  //   "Weekly remain class for class" +
  //     element.className +
  //     " ---------------------------------- "
  // );
  // console.log(element.subs);
  //Weekly reaming ended
});
