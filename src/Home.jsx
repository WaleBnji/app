import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from './assets/unsplash_XtUd5SiX464.svg';
import { closestCenter, DndContext } from '@dnd-kit/core';
// import {
//   SortableContext,
//   arrayMove,
//   rectSortingStrategy,
//   verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
import { Image } from './Image';
import ImageSkeleton from './ImageSkeleton';
import Skeleton from 'react-loading-skeleton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import i1 from './assets/image2.jpg';
import i2 from './assets/image1.jpg';
import i3 from './assets/image3.jpg';
import i4 from './assets/image4.jpg';
import i5 from './assets/image5.jpg';
import i6 from './assets/image6.jpg';
import i7 from './assets/image7.jpg';
import i8 from './assets/image8.jpg';
import i9 from './assets/image9.jpg';
import i10 from './assets/image10.jpg';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setLoading(true);
    let timeOut = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const [imageArray, setImageArray] = useState([
    {
      id: 0,
      src: i1,
      description: 'a girl standing',
    },
    {
      id: 1,
      src: i2,
      description: 'a corridor',
    },
    {
      id: 2,
      src: i3,
      description: 'a man on bike',
    },
    {
      id: 3,
      src: i4,
      description: 'an array of buildings',
    },
    {
      id: 4,
      src: i5,
      description: 'a girl standing',
    },
    {
      id: 5,
      src: i6,
      description: 'man in a forest',
    },
    {
      id: 6,
      src: i7,
      description: 'woman in desert',
    },
    {
      id: 7,
      src: i8,
      description: 'midnight stars',
    },
    {
      id: 8,
      src: i9,
      description: 'midnight stars',
    },
    {
      id: 9,
      src: i10,
      description: 'a mountain',
    },
  ]);

  const history = useNavigate();
  const handleClick = () => {
    history('/');
  };

  const filteredImages = imageArray.filter((i) => {
    return i.description.toLowerCase().includes(searchInput.toLowerCase());
  });

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let imageItems = [...imageArray];

    //remove and save the dragged item content
    const draggedItemContent = imageItems.splice(dragItem.current, 1)[0];

    //switch the position
    imageItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the image array
    setImageArray(imageItems);
  };

  return (
    <div className='App wrapper '>
      <h1 className='text-3xl font-semibold'>Drag & drop photo gallery</h1>

      <input
        type='text'
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        className='w-[60%] p-2 my-4 bg-gray-200 lg:w-[40%]'
        placeholder='Input a tag'
      />
      <div className='container'>
        {loading
          ? new Array(10).fill(null).map((i) => <Skeleton height='200px' />)
          : filteredImages?.map((image, index) => {
              return (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => (dragItem.current = index)}
                  onDragEnter={(e) => (dragOverItem.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                  className='cursor-pointer'
                  onDrop={(e) => e.preventDefault()}
                >
                  <img
                    src={image.src}
                    alt={image.description}
                    className='h-[200px] object-cover'
                  />
                </div>
              );
            })}
      </div>

      <button
        onClick={handleClick}
        className='border block w-[80%] rounded-lg mt-8 button text-white py-2 mx-auto lg:w-[40%]'
      >
        SignOut
      </button>
    </div>
  );
};

export default Home;
