import React from "react";
import App from "../App";
import renderer from "react-test-renderer"

// test the the app component
test('renders correctly', () => { 
    const tree = renderer 
      .create(<App/>) 
      .toJSON();
    //   test the whole component for errors 
    expect(tree).toMatchSnapshot(
    ); 
  }); 
  