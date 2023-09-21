import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function Image(props) {
  const { src } = props;
  // useSortable({ id: props.id });

  // const styles = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };

  return (
    <div
      // ref={setNodeRef}
      // style={styles}
      // {...attributes}
      // {...listeners}
      className=''
    >
      <img
        src={props.src}
        alt='draggable element'
        className={props.className}
      />
    </div>
  );
}
