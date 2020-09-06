import React from 'react';

function Highlight ({ children }: React.Props<{}>) {
  return <span style={{ color: '#25A18E'}}>{children}</span>;
}

export default Highlight;