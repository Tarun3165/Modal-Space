import axios from "axios";
import Card from "./components/card";

export default async function Home() {

  const MODAL_SPACE_URL = process.env.MODAL_SPACE_URL; 

  let response = await axios.get(
    `${MODAL_SPACE_URL}/model-spaces`
  );

  let modalSpaceData=response?.data?.data;
  
  return (
   <main>
      <h2 className='text-center p-6 text-xl'>Modal Space</h2>
     <div className='flex m-8 gap-5 justify-center flex-wrap'>
     {
        modalSpaceData?.map((item)=>{
          return <Card key={item?.id} cardData={item}/>
        })
      }
     </div>
      
   </main>
  );
}
