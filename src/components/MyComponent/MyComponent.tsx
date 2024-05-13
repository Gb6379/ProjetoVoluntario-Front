import React, { FC } from 'react';
import { MyComponentWrapper } from './MyComponent.styled';

interface MyComponentProps {}

const MyComponent: FC<MyComponentProps> = () => (
 <MyComponentWrapper>
    MyComponent Component
 </MyComponentWrapper>
);

export default MyComponent;
