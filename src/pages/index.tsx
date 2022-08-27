import { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";

export default function Page() {

  const defaultZoom = 30;
  const [imageZoom, setImageZoom] = useState<number>(defaultZoom);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    try {
      const response = await axios.get('/api/images');

      let data = response.data;
      data = data.map((item: string) => item = `/api/images?img=${item}`);
      
      setImages(data);

    } catch(err: any) {
     console.log(err); 
    }
  }
  
  return(
    <>
      <h1 style={{textAlign: 'center'}}>Programming Tips Gallery</h1>

      <div style={{textAlign: 'center', margin: '1rem 0'}}>
        <button type="button" onClick={() => setImageZoom(state => state - 10)}>- Zoom</button>
        <button type="button" onClick={() => setImageZoom(defaultZoom)}>Default</button>
        <button type="button" onClick={() => setImageZoom(state => state + 10)}>+ Zoom</button>
      </div>

      <div className="images">
        <Images />
      </div>
    </>
  );

  function Images() {
    
    return(
      <>
        {images.length == 0 
          ? (
            <>Carregando lista de imagens...</>
          ) 
          : (
            <>
              {images.map((image, i) => (
                <div className="img-block" key={i}>
                  <Link href={image}>
                    <a target='_blank'>
                      <img src={image} style={{maxWidth: `${imageZoom}rem`}} />
                    </a>
                  </Link>
                </div>
              ))}
            </>
          )
        }
      </>
    );

  }
  
}
