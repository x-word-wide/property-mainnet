import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: ${props => 
    props.size === 'small' ? '1.5rem' : 
    props.size === 'large' ? '3rem' : '2rem'
  };
  height: ${props => 
    props.size === 'small' ? '1.5rem' : 
    props.size === 'large' ? '3rem' : '2rem'
  };
  border: ${props => 
    props.size === 'small' ? '2px' : 
    props.size === 'large' ? '4px' : '3px'
  } solid rgba(67, 97, 238, 0.1);
  border-left: ${props => 
    props.size === 'small' ? '2px' : 
    props.size === 'large' ? '4px' : '3px'
  } solid #4361ee;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const SpinnerText = styled.div`
  color: #4361ee;
  font-size: ${props => 
    props.size === 'small' ? '0.8rem' : 
    props.size === 'large' ? '1.2rem' : '1rem'
  };
  font-weight: 500;
`;

const LoadingSpinner = ({ size = 'medium', text }) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} />
      {text && <SpinnerText size={size}>{text}</SpinnerText>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;