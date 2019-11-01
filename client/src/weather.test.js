import React from "react";
import Weather from "../Components/Weather";
import renderer from "react-test-renderer"

// test the the app component
test('renders correctly', () => { 
    const tree = renderer 
      .create(<Weather/>) 
      .toJSON();
    //   test the whole component for errors 
    expect(tree).toMatchSnapshot(
    ); 
  }); 
  