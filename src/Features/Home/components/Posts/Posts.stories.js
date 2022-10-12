import React from 'react';

import Posts from './index';

//👇 This default export determines where your story goes in the story list
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'App/Posts',
  component: Posts,
};

//👇 We create a “template” of how args map to rendering
const Template = args => <Posts {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  title: 'Post Title',
  posts: [
    {
      id: '1',
      title: 'Title One',
    },
    {
      id: '2',
      title: 'Title Two',
    },
  ],
};
