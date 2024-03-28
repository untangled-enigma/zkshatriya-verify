<script lang="ts">
  import { onMount } from "svelte";
  import './index.css'
  import { scoreEngine } from "zkcollector-contract";
  import { verify } from "o1js";
  import Loading from "./lib/Loading.svelte";

  let fileInput:any, verificationKey:any;
  let bLoading = true;

  onMount(async () => {
    const result = await scoreEngine.compile();
    verificationKey = result.verificationKey;
    bLoading = false;
  });

  /// File data vars
  let address:string, score:string, root:string, proof:any;

  let validationStatus = "INIT";
  let validationResult = false; // "INIT", "LOADING" , "RESULT"
  async function readProofFile() {
    validationStatus = "INIT"
    const file = fileInput[0];

    if (!file) {
      console.error("No file selected!");
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (event) => {
      //@ts-ignore
      proof = JSON.parse(event.target.result);
      address = proof.publicInput[0];
      score = proof.publicInput[1];

      root = proof.publicInput[2];

    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  }

  async function onValidate() {
    validationStatus = "LOADING" 
    validationResult = await verify(proof, verificationKey);
    // await new Promise(resolve => setTimeout(resolve, 5000));
    validationStatus = "RESULT" 
 
    console.log(`verification result: ${validationResult}`);
  }
</script>

{#if bLoading}
  <Loading />
{:else}
  <div class="flex flex-wrap w-full">
    <div class="flex flex-col w-full md:w-1/2">
      <div
        class="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24"
      >
        <a href="#" class="p-4 text-xl font-bold text-white bg-black">
          zKshatriya Verify.
        </a>
      </div>
      <div
        class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32"
      >
        <p class="text-3xl text-center">Select Proof.</p>
        <form class="flex flex-col pt-3 md:pt-8">
          <div class="flex flex-row pt-4">
            <input
              bind:files={fileInput}
              type="file"
              class="cursor-pointer py-2 px-4 flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-4/5 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            />

            <button
              type="button"
              on:click={readProofFile}
              class="mx-2 py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"
                >
                </path>
              </svg>
            </button>
          </div>
          {#if address}
            <div class="flex flex-col pt-4 mb-12">
              <div class="m-2">
                <div class="font-bold">Account Internal Index</div>
                <p class="font-light break-all">{address}</p>
              </div>
              <div class="m-2">
                <div class="font-bold">Score</div>
                <div class="font-light break-all">{score}</div>
              </div>
              <div class="m-2">
                <div class="font-bold">Root</div>
                <div class="font-light break-all">{root}</div>
              </div>
            </div>

            <button
              on:click={onValidate}
              type="button"
              class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Validate
            </button>
          {/if}
        </form>

        {#if validationStatus === "LOADING"}
        <div class="mt-10 m-auto" role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
      </div>
        {/if}

        {#if validationStatus === "RESULT"}
          <div class="m-0">
            <div class="mt-2 text-lg text-center font-bold">Proof IS</div>

            {#if validationResult == true}
        
            <div class="flex flex-row">
            <svg
                class="max-w-9"
                viewBox="0 0 117 117"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title />
                <desc />
                <defs />
                <g
                  fill="none"
                  fill-rule="evenodd"
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                >
                  <g fill-rule="nonzero" id="correct">
                    <path
                      d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z"
                      fill="#17AB13"
                      id="Shape"
                    />

                    <path
                      d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z"
                      fill="#4A4A4A"
                      id="Shape"
                    />
                  </g>
                </g>
              </svg>
              <div class="text-green-500 text-md font-bold ml-4 my-auto">VALID</div>
              </div>
            {:else}

              <div class="flex flex-row">

              <svg
                class="max-w-9"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                <path
                  d="M38 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H38C39.1046 44 40 43.1046 40 42V6C40 4.89543 39.1046 4 38 4Z"
                  fill="#ff0000"
                  stroke="#000000"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 30L31 30"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 36H24"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 21L28 13"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28 21L20 13"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              
              </svg>

              <div class="text-red-500 text-md font-bold my-auto">INVALID</div>

            </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    <div class="w-1/2 shadow-2xl">
      <img
        alt="cta-hero"
        class="hidden object-cover w-full h-screen md:block"
        src="/hero-cta2.jpeg"
      />
    </div>
  </div>
{/if}
