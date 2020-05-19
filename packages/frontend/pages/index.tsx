import React from 'react';

import * as colors from '@colors';
import { Container, Row } from '@styled/div';

export default function Home() {
  const displayColors = (clrs: { [key: string]: string }) => {
    return Object.keys(clrs).map((key: string) => (
      <div
        key={`${clrs[`${key}`]}-${Math.random()}`}
        style={{
          background: clrs[`${key}`],
          height: '60px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            mixBlendMode: 'difference',
            color: '#fff',
          }}
        >
          {clrs[`${key}`]}
        </p>
      </div>
    ));
  };

  return (
    <>
      Home Page
      <Container>
        <Row>
          {Object.entries(colors).map(([name, values], index) => (
            <div
              style={{ margin: '2rem 0' }}
              className="col-md-6"
              key={`${index * Math.random()}-${Math.random()}`}
            >
              <h4 style={{ margin: '2rem 0', wordWrap: 'break-word' }}>
                {name}
              </h4>
              {displayColors(values)}
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}
