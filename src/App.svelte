<script>
  import {Configuration,OpenAIApi} from 'openai'
  const config = new Configuration({
 apiKey:import.meta.env.VITE_OPEN_AI_KEY 
  })
  const openapi = new OpenAIApi(config)
const genchat = async(msg)=>{
  const res = await openapi.createCompletion({
    model:"text-davinci-003",
    prompt:msg,
    temperature:0.5,
    max_tokens:256
  })
  // SEND RESPONSE
  return res.data.choices[0].text
}
const standardMessage = "Make me a recipe with only the following ingredients and store any extra ingredients as a additional ingredient:"
  let mymessage = standardMessage + "";
  let allchat  = []
const btnsend  = async()=>{
  // YOU TYPE HERE
  allchat = [...allchat,{type:'user',text:mymessage}]
  // CLEAN MESSAGE YOU
  mymessage = standardMessage + ""
  const printresponse = await genchat(allchat.map((m)=>m.text).join("/n"))
  // PUSH TO OBJECT IF CHATBOT RESPONSE
  allchat = [...allchat,{type:'bot',text:printresponse}]
  console.debug(printresponse);
}



import "./data/flex-styling.css"
import { JavaScript_CSS_Color_Compiler } from './data/ColorCompiler'
import { onMount } from 'svelte';

onMount(() => {
    JavaScript_CSS_Color_Compiler();
})
let categories = [
    { name: 'Meat', buttons: ['Beef', 'Pork', 'Chicken Breast'], show: false },
    { name: 'Vegetables', buttons: ['Tomato', 'Broccoli', 'Carrot', 'Bell Pepper'], show: false },
    { name: 'Fillers', buttons: ['Potatoes', 'Pasta', 'Spaghetti', 'Rice'], show: false }
  ];

  let currentCategory = null;

  function toggleCategory(category) {
    currentCategory = category;
    category.show = !category.show;
  }

  function toggleButton(category, button)
  {
    mymessage += `${button}, `;
  }
  
  
  function deleteLastWord() {
    const words = mymessage.trim().split(', ');
    if (words.length > 0) {
      words.pop();
      mymessage = words.join(', ');
    }
  }
  

  function goBack() {
    if (currentCategory) {
      currentCategory.show = false;
      currentCategory = null;
    }
  }

  function addToSearchBar(item) {
    mymessage += `${item},`; // Append the item to the search bar message
  }
</script>
<main class="display-f f-dir-column background-color:#FFF">
  <div class="f-grow-full">
    {#each allchat as res_msg}
      <div class="message {res_msg.type}">
        <span class="whosend">
          <!-- WHO SEND -->
          {res_msg.type == 'user'?'You':'chatBot'}
        </span>
        <!-- SHOW MESSAGE HERE -->
       <pre> {res_msg.text}</pre>
      </div>
    {/each}
  
  </div>
  
    
</main>

<!-- CREATE INPUT TEXT MESSAGE -->
  
<div class="display-f f-dir-column f-justify-center">
  <input 
  placeholder="Make me a recipe with.." 
  class="inputtext" type="text" bind:value={mymessage}>

  <button class="btnyousend" on:click={btnsend}>send</button>
</div>

<div class="display-f">
  <button on:click={deleteLastWord}>Delete</button>

  {#if currentCategory}
  <button on:click={goBack}>Back</button>
{:else}
  {#each categories as category}
    <button on:click={() => toggleCategory(category)}>
      {category.name}
    </button>
  {/each}
{/if}

{#each categories as category}
  {#if category === currentCategory && category.show}
    {#each category.buttons as button}
      <button on:click={() => toggleButton(category, button)}>
        {button}
      </button>
    {/each}
  {/if}
{/each}


</div>
<!-- STYLING -->
<style>
  main {
    min-height: 80vh;
    max-height: 80vh;
    overflow-y: scroll;
  }
  .message{
    color: white;
    padding: 20px;
    font-size: 20px;
    opacity: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
/*  IF SEND IS USER*/
  .message.user{
    text-align: center;
    background-color: white;
    color: black;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.5);
    opacity: 1;
    transition: all 2s ease;
  }
/*  IF SEND IS CHATBOT*/
  .message.bot{
    text-align: center;
    background-color: green;
    color: white;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.5);
       opacity: 1;
    transition: all 2s ease
    
  }
  pre {
    white-space: pre-wrap;
    margin: 0;
  }
  
/*STYLE FOR INPUT*/
.inputtext{
  /* position: fixed; */
  color: white;
  height: 60px;
  /* width: 100vw; */
  font-size: 22px;
  text-align: start;
  /* margin-top: 50px; */
}
/*STYLE FOR BUTTON*/
.btnyousend{
  background-color: green;
  color: black;
}
/*STYLE FOR WHOSEND*/
.whosend{
  color: white;
  font-size: 12px;
  background-color: rgb(0, 0, 0);
  padding: 10px;
  font-weight: bold;
  max-height: 20px;
}
</style>