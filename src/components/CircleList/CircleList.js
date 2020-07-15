import React from 'react';

function CircleList(props) {
	const array = props.array ? props.array : [];
  const CircleList = array.map((item, index) => {
		return <div className={item} key={index}></div>
	});
  return (
    <div>{CircleList}</div>
  );
}

export default CircleList;