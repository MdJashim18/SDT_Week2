function isLeapYear(year) {

    if (year % 4 == 0) {
        console.log("Leap Year");
    }
    else 
    {
        if (year % 400 == 0 && year % 100 == 0) {
            console.log("Leap Year");
        }
        else {
            console.log("Not Leap Year");
        }
    }
}

isLeapYear(2024);
