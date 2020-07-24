let data = document.querySelector(".data");


                                            //?Fetch data 
async  function getData(){
    const response  = await fetch("https://api.covid19india.org/data.json");
    const stateData = await response.json();
    return stateData;  
}
getData().then((stateData)=>{
    index= 0;
    showData(stateData,index)
});





                                      //?Show Data of State on Search
function stateCase(){
   getData().then((stateData)=>{  
    let text = document.getElementById("getText").value
   if(text==""){
       alert("Enter State name")
   }else{ 
       index= 0;
       for (let i=0;i<=35;i++){
           if(stateData.statewise[i].state.toLowerCase()==text.toLowerCase()||stateData.statewise[i].statecode.toLowerCase()==text.toLowerCase()){
            index = i;
            showData(stateData,index);
            break;
           }else{
               showError();
           }
       }
       return index;
    }
});
}

 
                                                 //? Show Data on Search 
function showData(stateData,index){
    data.innerHTML=`<div class ="box">
    <div class="head"><span>Covid-19 Cases in ${stateData.statewise[index].state}</span>
    </div>
    <div class="total">
    <div class="card"><p>Total Confirmed</p>   ${stateData.statewise[index].confirmed}</div>    
    <div class="card"><p>Total Deaths</p>     ${stateData.statewise[index].deaths}   </div> 
    <div class="card"><p>Total Recovered</p>   ${stateData.statewise[index].recovered}</div>
    <div class="card"><p>Active</p>           ${stateData.statewise[index].active}   </div>       
    </div>
    </div>`;
}



                                             //?Show Error
function showError(){
    console.log("no");
    data.innerHTML=`<div class ="box">
    <div class="head">
        <span style="color:red">Please enter a valid state name </span>
    </div>`
} 


                                              //?Event Listner

btn.addEventListener("click",stateCase);
window.addEventListener("keypress",(e)=>{
if(e.code=="Enter"){
    stateCase();
}else{
    null
}
});