import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from './assets/unsplash_XtUd5SiX464.svg';
import { closestCenter, DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Image } from './Image';

const Home = () => {
  const [loading, setLoading] = useState();
  const [imageArray, setImageArray] = useState([
    {
      id: 0,
      src: 'https://images.unsplash.com/photo-1682687219356-e820ca126c92?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a person sitting on top of a sand dune',
    },
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1694445681150-b520d4abc1c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHwyfHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'an aerial view of a mountain range in the desert',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1695051626405-e6a288c882d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHwzfHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a statue of a woman sitting on top of a stone structure',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1695026513693-451e1aac043f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw0fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a subway station with a man walking through a tunnel',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1694930103616-52043332f156?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw1fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a mountain covered in fog with trees below',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1687360441221-ff5143d5cd5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MXwxfGFsbHw2fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description:
        'Portrait of an autistic man sitting on a park bench while using fidget spinners',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1691135319989-8ae7dd70571a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw3fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a white car parked in a parking garage',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1692911470431-9820cc52c01c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw4fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'an empty subway station with stairs and railings',
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1694930103692-d37f33cffc75?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHw5fHx8fHx8Mnx8MTY5NTIyNjYyM3w&ixlib=rb-4.0.3&q=85',
      description: 'a view of a mountain covered in clouds',
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1694845479853-c9721af5a191?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDQ1Njh8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2OTUyMjY2MjN8&ixlib=rb-4.0.3&q=85',
      description: 'a row of seats sitting on top of a train next to a window',
    },
  ]);
  const history = useNavigate();
  const handleClick = () => {
    history('/');
  };

  // useEffect(() => {
  // const fetchImages = async () => {
  //   fetch(
  //     'https://api.unsplash.com/photos?page=1&client_id=b6bOc8r7fcneAlSQlqyLgIbQW6Z09b5_2IEgy49tFZs'
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const rangedData = data?.map((i, idx) => {
  //         return {
  //           id: idx,
  //           src: i?.urls?.full,
  //           description: i?.alt_description,
  //         };
  //       });
  //       setImageArray(rangedData);
  //     });
  // };
  // }, []);

  // const handleDragEnd = (event) => {
  //   console.log('drag trigged');
  //   console.log(event);

  //   const { active, over } = event;
  //   console.log('event', event?.active?.id);
  //   console.log('ACtive:' + active);
  //   console.log('Over:' + over.id);
  //   if (active.id !== over.id) {
  //     setImageArray((items) => {
  //       // console.log('items', items);
  //       const activeIndex = items.indexOf(active?.id);
  //       const overIndex = items.indexOf(active?.id);
  //       console.log('arry move', arrayMove(items, activeIndex, overIndex));
  //       return arrayMove(items, activeIndex, overIndex);
  //     });
  //   }
  // };

  console.log(imageArray);

  const handleDragEnd = (event) => {
    console.log('drag trigged');
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setImageArray((image) => {
      const oldIndex = image.findIndex((img) => img.id === active.id);
      const newIndex = image.findIndex((img) => img.id === over.id);
      console.log(oldIndex);
      console.log(arrayMove(image, oldIndex, newIndex));
      return arrayMove(image, oldIndex, newIndex);
    });
  };

  return (
    <div className='App wrapper '>
      {/* <button onClick={() => fetchImages()}>Fire </button> */}
      <h1 className='text-3xl font-semibold'>Drag & drop photo gallery</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className='  container'>
          <SortableContext items={imageArray} strategy={rectSortingStrategy}>
            {imageArray &&
              imageArray?.map((image) => {
                return (
                  <Image
                    key={image?.id}
                    id={image?.id}
                    alt={image?.description}
                    src={image?.src}
                    className='w-[150px] h-[150px] object-cover'
                  />
                );
              })}
          </SortableContext>
        </div>
      </DndContext>

      <button onClick={handleClick}>SignOut</button>
    </div>
  );
};

export default Home;
