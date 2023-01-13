var weight,age,height,gender,activity,data;
async function getapi(url) {  
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
   data = await response.json();
  document.getElementById("meal1").innerHTML=data.meals[0].title;
  document.getElementById("meal2").innerHTML=data.meals[1].title;
  document.getElementById("meal3").innerHTML=data.meals[2].title;
  document.getElementById("calori1").innerHTML="calori="+ data.nutrients.calories;
  document.getElementById("calori2").innerHTML="calori="+ data.nutrients.calories;
  document.getElementById("calori3").innerHTML="calori="+ data.nutrients.calories;
  document.getElementById("img1").src=`https://webknox.com/recipeImages/${data.meals[0].id}-556x370.jpg`
  document.getElementById("img2").src=`https://webknox.com/recipeImages/${data.meals[1].id}-556x370.jpg`
  document.getElementById("img3").src=`https://webknox.com/recipeImages/${data.meals[2].id}-556x370.jpg`
   console.log(data); 
}
 async function getCalories() {
        height =  document.getElementById("in1").value;
        weight =  document.getElementById("in2").value;
        age =  document.getElementById("in3").value;
        gender =  document.getElementById("gender").value;
        activity =  document.getElementById("Activity").value;
        let calori =await caloriesCounter();
        getapi(`https://api.spoonacular.com/mealplanner/generate?apiKey=0ebbfb4d95b142b0a4310c847fb9465d&timeFrame=day&targetCalories=${calori}`)
       }

async function getrecipe(val){
        let api_url=`https://api.spoonacular.com/recipes/${data.meals[val].id}/information?apiKey=0ebbfb4d95b142b0a4310c847fb9465d`;
        await fetch(api_url).then((responce)=> responce.json()).then(
           (gata)=>{
               console.log(gata);
              let arr1=[];
              let arr2=[];
             let arr3=[];
    
             for(let i=0;i<gata.analyzedInstructions[0].steps.length;i++){
                   arr1.push(gata.analyzedInstructions[0].steps[i].step);} 
      
             for(let i=0;i<gata.extendedIngredients.length;i++){
                   arr2.push(gata.extendedIngredients[i].aisle);} 
      
            for(let i=0;i<gata.extendedIngredients.length;i++){
                   arr3.push(gata.extendedIngredients[i].amount);} 

           let placeholder = document.querySelector("#data-output");
           let out = "";
          for(let i=0;i<arr2.length;i++){
                   out += `
                         <tr>
                              <td>${arr2[i]}</td>
                              <td>${arr3[i]}</td>
                              <td>${arr1[i]}</td>
                         </tr>`;
                }
 
            placeholder.innerHTML = out;
     }
 );
}
async function caloriesCounter(){
 let Bmrval= await bmr();
 if(activity=="Light"){
  return Bmrval*1.375;

 }
 else if(activity=="Moderate"){
  return Bmrval*1.55;

 }
 else{
  return Bmrval*1.725;
 }

}

function bmr(){
 if(gender=="Female"){
  return 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);

 }
  else{
    return 66.47 + (13.75 * weight) + (5.003 *  height) - (6.755 * age);

  }
}

