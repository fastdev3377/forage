import { ForageButtonProps } from '../Interfaces';
import './ForageButton.css';

function ForageButton(props: ForageButtonProps) {
  const buttonStyle = () => {
    const styleObj: Record<string, any> = props.style ?? {}
    if (props.disabled) styleObj['opacity'] = 0.5
    return styleObj
  }

  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className='Forage-button'
      style={buttonStyle()}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

export default ForageButton;
