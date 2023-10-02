import { useState, useEffect} from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components/PhotoItem'; 

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(()=> {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, []);

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>

        {/* Área de upload */}

        {loading &&
          <C.Screnwarning>
            <div className="emoji">🤚</div>
            <div>Carregando...</div>
          </C.Screnwarning>
        }

        {!loading && photos.length > 0 &&
          <C.PhotoList>
            {photos.map((item, index) =>(
              <PhotoItem key={index} url={item.url} name={item.name}/>
            ))}
          </C.PhotoList>
        }

        {!loading && photos.length === 0 && 
          <C.Screnwarning>
          <div className="emoji">🥹</div>
          <div>Não há fotos cadastradas no momento</div>
        </C.Screnwarning>
        }
      </C.Area>
    </C.Container>
  );
}

export default App;

