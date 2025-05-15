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

console.log("Number1")
setTimeout(()=>{
    console.log("Number2")
},0)
console.log("Number3")

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

function syncDependent() {
  console.log("Step 1: Start")
  console.log("Step 2: Processing")
  console.log("Step 3: End")
}

syncDependent()


// Synchronous independent

function syncIndependent() {
  console.log("Log user activity")
  console.log("Fetch settings from local storage")
  console.log("Display welcome message")
}

syncIndependent();


// Synchronous with asynchronous independent

function syncWithAsyncIndependent() {
  console.log("Start process")

  setTimeout(() => {
    console.log("Async Task Done (after 2s)");
  }, 2000)

  console.log("Continue with other work")
}

syncWithAsyncIndependent()


// Synchronous with asynchronous dependent


function syncWithAsyncDependent() {
  console.log("Fetching data...")

  setTimeout(() => {
    console.log("Data received")
    console.log("Processing data...")
  }, 2000);
}

syncWithAsyncDependent()