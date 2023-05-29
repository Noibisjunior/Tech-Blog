import { Card } from '../blog/Card';
import './blog.css';



export const Cards = ({ cards }) => {
  return (
    <div className='grid'>
      {cards.map((c) => (
        <Card card={c} />
      ))}
    </div>
  );
}

