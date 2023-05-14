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
    days: [
      { name: "Satarday", sub: [] },
      { name: "Sunday", sub: [] },
      { name: "Monday", sub: [] },
      { name: "Tuesday", sub: [] },
      { name: "Wednesday", sub: [] },
      { name: "Thursday", sub: [] },
    ],
  },

  //   ...
];

let response = "";

classes.forEach((singleClass = element) => {
  //Set subject for one day------------------------------
  //   -------------------------------------------------------
  // ----------------------------------------------------------
  singleClass.days.forEach((singleDay = element) => {
    // This code is for random sorting array so that always same series do not appear to choose subject
    // singleClass.subs.sort(() =>
    //   Math.floor(Math.random() * singleClass.subs.length)
    // );
    // This code is for random sorting array so that always same series do not appear to choose subject

    response =
      "Setting subject for class " +
      singleClass.className +
      " for " +
      singleDay.name;
    console.log(response);

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

    console.log(singleDay.sub);
  });

  console.log("After remaining class");
  console.log(singleClass.subs);
  //Check overlapping with everyclass
});
