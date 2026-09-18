import React, { useEffect, useState } from 'react'
import "./App.css";
import axios from 'axios';

const App = () => {

   const dummyData = [
     {
       _id: "1",
       originalUrl:
         "https://www.amazon.in/Amazon-Brand-Unpolished-Cholesterol-Additives/dp/B07H2SZV43?fpw=alm&almBrandId=ctnow",
       shortCode: "XFGENY",
       clicks: 6,
     },
     {
       _id: "2",
       originalUrl:
         "https://www.amazon.in/Amazon-Brand-Unpolished-Cholesterol-Additives/dp/B07H2SZV43?fpw=alm&almBrandId=ctnow",
       shortCode: "XFGENY",
       clicks: 8,
     },
     {
       _id: "3",
       originalUrl:
         "https://www.amazon.in/Amazon-Brand-Unpolished-Cholesterol-Additives/dp/B07H2SZV43?fpw=alm&almBrandId=ctnow",
       shortCode: "XFGENY",
       clicks: 4,
     },
   ];
  
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);

  const fetchUrls = async () => {

    const response = await axios.get("http://localhost:5173/api/url");

    console.log(response.data.data.urls);
    setUrls(response.data.data.urls);
    
  }

  const createShortCode = async () => {

    const response = await axios.post("http://localhost:5173/api/url", {
       url : inputValue
    })
    
    console.log(response);
      setCurrentUrl({
        originalUrl: response.data.data.originalUrl,
        shortCode: response.data.data.shortCode,
      });

      fetchUrls();

    

  }

  const deleteUrl = async (id) => {

    await axios.delete(`http://localhost:5173/api/url/${id}`);

    fetchUrls();


  }

  useEffect(()=> {
    fetchUrls();
  },[]);

  

 


  return (
    <main className="p-10 flex flex-col gap-4">
      <div className="w-full max-w-4xl p-2 flex gap-2">
        <input className='border-2  p-2 border-red-300 ' type="text" placeholder='Enter Long URL' value={inputValue} onChange={(e) => {
          setInputValue(e.target.value)
        }} />
        <button onClick={createShortCode} className='bg-orange-500 p-2 '>Shorten</button>
      </div>
      <div className="w-full max-w-4xl p-2"></div>
      <div className="w-full max-w-4xl p-2 flex flex-col gap-4">
        {
          urls.map(url => {
            return (
              <div
                key={url._id}
                className="flex gap-4 items-center border border-neutral-300 p-2"
              >
                <a
                  href={`http://localhost:3000/${url.shortCode}`}
                  target="_blank"
                >
                  {url.shortCode}
                </a>
                <p className="truncate">{url.originalUrl}</p>
                <div>{url.clicks}</div>
                <div className="flex gap-4">
                  <button className="bg-orange-500 p-2 text-white font-bold">
                    COPY
                  </button>
                  <button
                    onClick={() => deleteUrl(url._id)}
                    className="bg-orange-500 p-2 text-white font-bold"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    </main>
  );
}

export default App
