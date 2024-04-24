// ------------------------ Declaration part -----------------------------

let result=document.getElementById("result");
let userdate=document.getElementById("dates");
let age_btn=document.getElementById("age");
let today = new Date();
let speech=new SpeechSynthesisUtterance();

// ------------------------ age calculation function ------------------------------

let ageCalculate = () => {
  
   let inputDate = new Date(userdate.value);
  
    let birthDetails = {
      date: inputDate.getDate(),
      month: inputDate.getMonth() + 1,
      year: inputDate.getFullYear(),
    };
  
   let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

  
   
     //----------------------------------------------- checking if selected date is in future --------------------------------------
    if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
      
       result.textContent="Please enter Correct Date of birth";
      
      return;
    }
  else{
    let { years, months, days } = calculateAge(
      birthDetails,
      currentYear,
      currentMonth,
      currentDate
    );

  // ---------------------------------- displaying result ----------------------------------------

result.textContent="You are "+years+" Years "+ months+" Months "+days+" Days old.";
    }
  };
  
  let isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
    return (
      birthDetails.year > currentYear ||
      (birthDetails.year === currentYear &&
        (birthDetails.month > currentMonth ||
          (birthDetails.month === currentMonth &&
            birthDetails.date > currentDate)))
    );
  };

  //---------------------------------------- main calculation -----------------------------------------------
  
let calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthDetails.year;
    let months, days;
  
    if (currentMonth < birthDetails.month) {
      years--;
      months = 12 - (birthDetails.month - currentMonth);
    } else {
      months = currentMonth - birthDetails.month;
    }
  
    if (currentDate < birthDetails.date) {
      months--;
      let lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      let daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
      days = daysInLastMonth - (birthDetails.date - currentDate);
    } else {
      days = currentDate - birthDetails.date;
    }
    return { years, months, days };
  };
  
  let getDaysInMonth = (month, year) => {

// ------------------------------------------ check if month is leap year -------------------------------------------------

    let isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
    let getDaysInMonth = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return getDaysInMonth[month - 1];
  };
  
  //---------------------------------- on click event--------------------------------------
  
 age_btn.addEventListener("click", ageCalculate);
 // 
 document.querySelector("button").addEventListener("click",()=>{
  speech.text=result.textContent;
  window.speechSynthesis.speak(speech);

})