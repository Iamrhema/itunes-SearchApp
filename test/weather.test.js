import React from "react";
import app from "../app";
import renderer from "react-test-renderer"

// test the the app component
test('renders correctly', () => { 
    const tree = renderer 
      .create(<app/>) 
      .toJSON();
    //   test the whole component for errors 
    expect(tree).toMatchSnapshot(
    ); 
  }); 
  