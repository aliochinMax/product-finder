import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

const DragNDrop = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (item) => {
      if (item.files && item.files.length > 0) {
        // Handle dropped files
        onDrop(item.files[0]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ width: 350, height: 350, marginLeft: 350, border: isOver ? '2px solid red' : '2px dashed black', padding: '20px' }}>
      <p>Drop an image here</p>
    </div>
  );
};

export default DragNDrop;
