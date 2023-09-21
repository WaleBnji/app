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
import test from './assets/image2.jpg';
import test0 from './assets/image1.jpg';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setLoading(true);
    let timeOut = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const [imageArray, setImageArray] = useState([
    {
      id: 0,
      src: test0,
      description: 'a person sitting on top of a sand dune',
      tag: 'person',
    },
    {
      id: 1,
      src: test,
      description: 'an aerial view of a mountain range in the desert',
      tag: 'aerial',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1695051626405-e6a288c882d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHwzfHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a statue of a woman sitting on top of a stone structure',
      tag: 'statue',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1695026513693-451e1aac043f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw0fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a subway station with a man walking through a tunnel',
      tag: 'subway',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1694930103616-52043332f156?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw1fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a mountain covered in fog with trees below',
      tag: 'mountain',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1687360441221-ff5143d5cd5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MXwxfGFsbHw2fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description:
        'Portrait of an autistic man sitting on a park bench while using fidget spinners',
      tag: 'Portrait',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1691135319989-8ae7dd70571a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw3fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a white car parked in a parking garage',
      tag: 'car',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1692911470431-9820cc52c01c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw4fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'an empty subway station with stairs and railings',
      tag: 'subway',
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1694930103692-d37f33cffc75?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw5fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a view of a mountain covered in clouds',
      tag: 'mountain',
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1694845479853-c9721af5a191?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2OTUyMjY2MjN8&ixlib=rb-4.0.3&q=85',
      description: 'a row of seats sitting on top of a train next to a window',
      tag: 'train',
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
    let _fruitItems = [...imageArray];

    //remove and save the dragged item content
    const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0];

    //switch the position
    _fruitItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setImageArray(_fruitItems);
  };

  return (
    <div className='App wrapper '>
      <h1 className='text-3xl font-semibold'>Drag & drop photo gallery</h1>

      <div className='container'>
        <input
          type='text'
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
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

      <button onClick={handleClick}>SignOut</button>
    </div>
  );
};

export default Home;
