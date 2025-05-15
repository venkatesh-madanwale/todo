//EventLoopMechanism
//Synchronous Function

function first(){
    second()
    console.log("function_1")
}
function second(){
    console.log("function_2")
}

first()

//function first is add to the callstack
//function second is called inside first and added to the stack
//console.log() is added to the stack
//Follows Last In First Out (LIFO)



//For Ascynchronous Functions
//setTimeout() is an asynchronous function
//It is added to the callstack
//The callback function is offloaded to the node API
//The timer is set to 0ms
//After 0ms the callback is placed to the callback queue
//The callback is sent from the callback queue to the call stack for execution after all the synchronous functions are executed






//Example of Asynchronous function
//setTimeout() is an asynchronous function
console.log("Number1")//This is a synchronous function
setTimeout(()=>{//This is an asynchronous function
    //This is a callback function
    console.log("Number2")
},0)
console.log("Number3")//This is a synchronous function
//The output will be:
//Number1
//Number3
//Number2


//Steps:
//Step 1. 
// console.log("Number1") will be called
// JavaScript will recognises that it as sync function
// It is added to the callstack and immediately it is Executed

//Step 2.
// setTimeout() is called
// JavaScript will recognises that it as async function
// The setTimeout() is added to the stack
// The callback ()=>{console.log("Number2")} is offloaded to node API
// Timer 0ms is being set (Sent to callback queue)
// After 0ms callback is placed to callback queue
// The callback is sent form callback queue to the call backstack for execution after all the sync function is executed

//Step 3.
// console.log("Number3") will be called
// JavaScript will recognises that it as sync function
// It goes to the callstack then to callback queue and immediately executed

//Step 4. Eventloop
// a. Checks that the call stack is empty
// b. Picks up the callback console.log("Number2") from the callback queue
// c. The executes console.log("Number2")



// Synchronous dependent
// This is a synchronous function
function syncDependent() {
  console.log("Step 1: Start")// This will be executed first
  console.log("Step 2: Processing")// This will be executed second
  console.log("Step 3: End")// This will be executed last
}

syncDependent()


// Synchronous independent
// This is a synchronous function
// This function does not depend on any other function
// It can be executed independently
// This function does not depend on any other function
function syncIndependent() {
  console.log("Log user activity")// This will be executed first
  console.log("Fetch settings from local storage")// This will be executed second
  console.log("Display welcome message")// This will be executed last
}

syncIndependent();




// Synchronous with asynchronous independent
// This is a synchronous function
// This function does not depend on any other function
// It can be executed independently
// This function does not depend on any other function
// This function is asynchronous
function syncWithAsyncIndependent() {
  console.log("Start process")// This will be executed first

  setTimeout(() => {
    console.log("Async Task Done (after 2s)");// This will be executed after 2 seconds
  }, 2000)

  console.log("Continue with other work")// This will be executed second
  console.log("End process")// This will be executed last
}

syncWithAsyncIndependent()





// Synchronous with asynchronous dependent
// This is a synchronous function
// This function depends on another function
// This function is asynchronous
// This function is dependent on another function

function syncWithAsyncDependent() {
  console.log("Fetching data...")// This will be executed first

  setTimeout(() => {// This is an asynchronous function
    console.log("Data received")// This will be executed after 2 seconds
    console.log("Processing data...")// This will be executed after data is received
  }, 2000);
}

syncWithAsyncDependent()