import React from 'react';
import styled from 'styled-components';
import Navbar from '../page_components/navbar';


const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
`;

export default function Home() {
  return (
    <Container>
      <Navbar />
    </Container>
  )
}
