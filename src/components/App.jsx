import ImageGallery from './imageGallery/ImageGallery';
import Header from './header/Header';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';
import { useEffect, useState } from 'react';
import { getImageApi } from 'api/imageList';
import Loader from './loader/Loader';
import Modal from './modal/Modal';
import Button from './button/Button';

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [link, setLink] = useState('');
  const [isShowBtn, setIsShowBtn] = useState(false);

  useEffect(() => {
    const getImage = async () => {
      try {
        setIsLoading(true);
        const data = await getImageApi(searchValue, searchPage);
        setImageList(prevImageList => [...prevImageList, ...data.hits]);
        setIsShowBtn(!!data.hits.length);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (searchValue !== '' || searchPage > 1) {
      getImage();
    }
  }, [searchValue, searchPage]);

  const handleChange = value => {
    setImageList([]);
    setSearchValue(value);
    setSearchPage(1);
  };
  const handleModal = src => {
    setLink(src);
    toggleModal();
  };
  const toggleModal = () => {
    setIsShowModal(prevIsShowModal => !prevIsShowModal);
  };
  const handleLoadMore = () => {
    setSearchPage(prevSearchPage => prevSearchPage + 1);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <h1>Sorry, something went wrong</h1>}
      <Header handleChange={handleChange} />
      <ImageGallery>
        <ImageGalleryItem imageList={imageList} handleModal={handleModal} />
      </ImageGallery>
      {isShowBtn && <Button handleLoadMore={handleLoadMore} />}

      {isShowModal && <Modal link={link} toggleModal={toggleModal} />}
    </>
  );
};
export default App;
