
getSavedData();
generateRoutine();

function addClassRequest (){
    let getClassName = document.querySelector(".className").value;
    let getPeriodNumber = document.querySelector(".PeriodNumber").value;
    let newEntry =   { 
        className: getClassName,
        subs: [],
        classPerDay: getPeriodNumber,
        days: [
          { name: "Satarday", sub: [] },
          { name: "Sunday", sub: [] },
          { name: "Monday", sub: [] },
          { name: "Tuesday", sub: [] },
          { name: "Wednesday", sub: [] },
          { name: "Thursday", sub: [] }
        ],
      }
      checkClassExistency(newEntry,pushNewClass);
}
function addSubRequest (){
    let getSubjectName = document.querySelector(".subjectName").value;
    let getWeeklyTotalClass = document.querySelector(".wtc").value;
    let newSubEntry =   { 
        name: getSubjectName, weekly: getWeeklyTotalClass 
      }
      pushNewSub(newSubEntry);
      showSubData();

}

function checkClassExistency(newEntry,pushNewClassfunc){
    let classExist = localStorage.getItem("classes");
    if(classExist){
        pushNewClassfunc(newEntry);
        console.log("Working1");
    }else{
        localStorage.setItem("classes",JSON.stringify([]));
        pushNewClassfunc(newEntry);
        console.log("Working2");
    }
}
function pushNewSub(newSubEntry){
            let prevSubValue = JSON.parse(localStorage.getItem("classes"));
            let gettingId = localStorage.getItem("modalOpenedFor");
            let targettedIndex=0;
            // Filtering 
            
            let targetedClass = prevSubValue.find((item)=> item.className.toLowerCase() === gettingId.toLocaleLowerCase() );
            let isSubExist = targetedClass.subs.find((item) => item.name === newSubEntry.name);
          
            targetedClass.subs.forEach((item,index)=>{
                if(item.name === newSubEntry.name ){
                    targettedIndex = index;
                }
            });
            if(isSubExist){
                targetedClass.subs[targettedIndex].name = newSubEntry.name;
                targetedClass.subs[targettedIndex].weekly = parseInt(newSubEntry.weekly);
                console.log(targettedIndex);

            }else{
                targetedClass.subs.push(newSubEntry);
            }
          
       
        localStorage.setItem("classes",JSON.stringify(prevSubValue));

        console.log(prevSubValue);
        // }else{
        //     alert(newEntry.className +" Already Taken !")
        // }
        getSavedData();
}
function pushNewClass(newEntry){
        if(!validateDuplicacy(newEntry.className.toLowerCase())){
        let prevClassValue = JSON.parse(localStorage.getItem("classes"));
        prevClassValue.push(newEntry);
        localStorage.setItem("classes",JSON.stringify(prevClassValue));
        }else{
            alert(newEntry.className +" Already Taken Or Invalid !")
        }
        getSavedData();
}



//Re useable functions ----

function validateSubExistency(){
    let targetedClass = prevSubValue.find((item)=> item.className.toLowerCase() === gettingId.toLocaleLowerCase() );
    let isSubExist = targetedClass.subs.find((item) => item.name === newSubEntry.name);
    return isSubExist
}
function validateDuplicacy(givenClassName){
    if(givenClassName=== ""){
        return true;
    }else{
        let prevClassValue = JSON.parse(localStorage.getItem("classes"));
        let isExist = prevClassValue.find((item)=> item.className.toLowerCase() === givenClassName );
        return isExist;
    }
    
}

function getSavedData(){
    let allData = JSON.parse(localStorage.getItem("classes"));
    let result = document.querySelector(".classes-info");
    console.log(allData);
    let dom = allData.map((item)=> 
        `
       <ul class="list-group class-lists mt-2">
          <li class="list-group-item d-flex justify-content-between"><span><b>Class:</b> ${item.className}</span> <span><b>Max Period</b> (${item.classPerDay})</span>
            <div>
            <button onclick=modalOpenedFor("${item.className}") type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Add / Edit Sub:
          </button>
          <button onclick=deleteClass("${item.className}") type="button" class="btn btn-danger btn-sm" >
            Delete
          </button>
            </div>
            
          </li>
          <div class="">
          ${item.subs.map((item)=>`<ul class="list-group">
          <li class="list-group-item d-flex justify-content-between"> <p> => ${item.name}</p> <p>Per week class: ${item.weekly} </p> </li>

            </ul>`).join('')}
          </div>
             
            </li>
          
        </ul>
  `

    );
    result.innerHTML =  dom.join('');


}




function modalOpenedFor(id){
    localStorage.setItem("modalOpenedFor", id);
    let className =  localStorage.getItem("modalOpenedFor", id);
    document.querySelector(".classNameOnly").innerText = className; 
    showSubData();
}

function getSubData(){
    let prevSubValue = JSON.parse(localStorage.getItem("classes"));
    let gettingId = localStorage.getItem("modalOpenedFor");
    let targetedClass = prevSubValue.find((item)=> item.className.toLowerCase() === gettingId.toLocaleLowerCase() );
    if(targetedClass.subs){
        return targetedClass.subs;
    }
}
function showSubData(){
    let data = getSubData();
    let subData = document.querySelector(".subData");

    let dom = data.map((item)=>
    `<ul class="list-group">
        <li class="list-group-item d-flex justify-content-between"> <p> => ${item.name}</p> <p>Per week class: ${item.weekly} </p> </li>

    </ul>`
    )
    subData.innerHTML = dom.join('');

}

function deleteClass(deletingItemName){
    let prevSubValue = JSON.parse(localStorage.getItem("classes"));
    let updatedValue = prevSubValue.filter(item => item.className !== deletingItemName);
    localStorage.setItem("classes",JSON.stringify(updatedValue))
    console.log(updatedValue);

    getSavedData();


}


function saveTime(){
    let start = parseInt(document.querySelector(".startTIme"));
    let end = parseInt(document.querySelector(".endTime"));
    let duration = parseInt(document.querySelector(".duration"));

    let total = Math.abs(start - end) ;
    let maxPeriod = total/duration;

}


