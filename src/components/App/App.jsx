import { Component } from 'react';
import CSS from './App.module.css';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { fetchPictures } from 'servises/servise';

export class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    error: false,
    search: '',
    total: NaN,
  };

  searchPictures = async values => {
    try {
      this.setState({ pictures: [], isLoading: true });
      const pistures = await fetchPictures(values);
      this.setState({
        pictures: pistures.hits,
        page: 2,
        search: values,
        total: pistures.totalHits,
      });
    } catch (error) {
      this.setState({ error: true });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  nextPagePictures = async () => {
    try {
      const { search, page } = this.state;

      this.setState({ isLoading: true });
      const pistures = await fetchPictures(search, page);
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pistures.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      this.setState({ error: true });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = () => {
    this.setState(prevStata => ({ showModal: !prevStata.showModal }));
  };

  contentModal = (url, alt) => {
    this.setState({
      bigImages: url,
      alt,
    });
  };

  render() {
    const { isLoading, pictures, error, total } = this.state;
    const { searchPictures, nextPagePictures, toggleModal, contentModal } =
      this;

    return (
      <div className={CSS.App}>
        <Searchbar onSubmit={searchPictures} isLoading={isLoading} />
        <ImageGallery
          images={pictures}
          totalHits={total}
          onClick={nextPagePictures}
          isLoading={isLoading}
          toggleModal={toggleModal}
          contentModal={contentModal}
        />
        {error && <div>Походу щось зламалося</div>}
      </div>
    );
  }
}
