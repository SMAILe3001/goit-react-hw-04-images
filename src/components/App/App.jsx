import { useState, useEffect } from 'react';
import CSS from './App.module.css';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { fetchPictures } from 'servises/servise';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [total, setTotal] = useState(NaN);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchPictures = values => {
    setPictures([]);

    setSearch(values);
    setPage(1);
  };

  const nextPictures = () => {
    setPage(state => state + 1);
  };

  useEffect(() => {
    if (search === '') {
      return;
    }

    const searchData = async () => {
      try {
        setIsLoading(true);
        const pistures = await fetchPictures(search, page);
        setPictures(prevState => [...prevState, ...pistures.hits]);
        console.log(pistures);
        setTotal(pistures.totalHits);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    searchData();
  }, [page, search]);

  return (
    <div className={CSS.App}>
      <Searchbar onSubmit={searchPictures} isLoading={isLoading} />
      <ImageGallery
        images={pictures}
        totalHits={total}
        onClick={nextPictures}
        isLoading={isLoading}
      />
      {error && <div>Походу щось зламалося</div>}
    </div>
  );
};
