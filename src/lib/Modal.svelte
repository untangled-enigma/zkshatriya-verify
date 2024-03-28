<script lang="ts" >
export let imageSrc:string;
export let content:string;
export let btnText:string;


</script>

<div class="backdrop fixed inset-0 bg-gray-500 bg-opacity-75" >
    <div class=" fixed top-1/2 left-1/3 p-6 bg-white rounded-lg shadow-md w-72">
        <div class="relative w-16 mx-auto mb-3 -mt-10">
            <!--   class="max-w-9" -->
            <img class="-mt-1" src="{imageSrc}" alt="cookie"/>
        </div>
        <span class="block w-full mb-3 leading-normal text-gray-800 sm:w-48 text-md text-center font-bold">
            {content}
        </span>
        <div class="flex flex-row-reverse">
            
                <button type="button" on:click class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    {btnText}
                </button>
           
        </div>
    </div>
</div>


