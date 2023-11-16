import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';

import * as reducers from './reducers';

const initialState: types.CalendarState = {
  timeUnit: 'days',
  selected: new Date().getTime(),
  events: [
    {
      uid: '5e048d1e-f1b3-4d00-99ac-ffb9df08adef',
      start_at: '1700737200000',
      trainings: [
        {
          uid: '5e048d1e-f1b3-4d00-99ac-ffb9df08adef',
          video:
            'https://internal.squash-pride.ru/api/media/drive-boost-drop-cross-2players-amat.MOV',
          groups: ['Drive', 'Drop', 'Cross', 'Boost'],
          level: 'amateur',
          players: 2,
          description:
            'The main point of exercise to learn how to change the power of the shots. When you do drive to yourself-use more control, when you hit boast-use more power. \r\nIt helps to improve:\r\n- footwork;\r\n- the skill of returning to the center of the court;\r\n- ball control;\r\n- reading the trajectory of the ball;\r\n- shots technique;\r\n- stamina.',
          ru_description: '',
          title: 'drive-boost-drop-cross-2players-amat',
        },
      ],
    },
    {
      uid: '5e048d1e-f1b3-4d00-23ds-ffb9df08adef',
      start_at: '1700895600000',
      trainings: [
        {
          uid: '5e048d1e-f1b3-4d00-99ac-ffb9df08adef',
          video:
            'https://internal.squash-pride.ru/api/media/drive-boost-drop-cross-2players-amat.MOV',
          groups: ['Drive', 'Drop', 'Cross', 'Boost'],
          level: 'amateur',
          players: 2,
          description:
            'The main point of exercise to learn how to change the power of the shots. When you do drive to yourself-use more control, when you hit boast-use more power. \r\nIt helps to improve:\r\n- footwork;\r\n- the skill of returning to the center of the court;\r\n- ball control;\r\n- reading the trajectory of the ball;\r\n- shots technique;\r\n- stamina.',
          ru_description: '',
          title: 'drive-boost-drop-cross-2players-amat',
        },
        {
          uid: '5e048d1e-f1b3-4d00-23-ffb9df08adef',
          video:
            'https://internal.squash-pride.ru/api/media/drive-boost-drop-cross-2players-amat.MOV',
          groups: ['Drive', 'Drop', 'Cross', 'Boost'],
          level: 'amateur',
          players: 2,
          description:
            'The main point of exercise to learn how to change the power of the shots. When you do drive to yourself-use more control, when you hit boast-use more power. \r\nIt helps to improve:\r\n- footwork;\r\n- the skill of returning to the center of the court;\r\n- ball control;\r\n- reading the trajectory of the ball;\r\n- shots technique;\r\n- stamina.',
          ru_description: '',
          title: 'drive-boost-drop-cross-2players-amat',
        },
        {
          uid: '5e048d1e-f1b3-234-99ac-ffb9df08adef',
          video:
            'https://internal.squash-pride.ru/api/media/drive-boost-drop-cross-2players-amat.MOV',
          groups: ['Drive', 'Drop', 'Cross', 'Boost'],
          level: 'amateur',
          players: 2,
          description:
            'The main point of exercise to learn how to change the power of the shots. When you do drive to yourself-use more control, when you hit boast-use more power. \r\nIt helps to improve:\r\n- footwork;\r\n- the skill of returning to the center of the court;\r\n- ball control;\r\n- reading the trajectory of the ball;\r\n- shots technique;\r\n- stamina.',
          ru_description: '',
          title: 'drive-boost-drop-cross-2players-amat',
        },
      ],
    },
    // {
    //   uid: '5e048d1e-f1b3-4d00-23ds-ffb9df08adef',
    //   start_at: '170074979913',
    //   trainings: [
    //     {
    //       uid: '5e048d1e-f1b3-4d00-99ac-ffb9df08adef',
    //       video:
    //         'https://internal.squash-pride.ru/api/media/drive-boost-drop-cross-2players-amat.MOV',
    //       groups: ['Drive', 'Drop', 'Cross', 'Boost'],
    //       level: 'amateur',
    //       players: 2,
    //       description:
    //         'The main point of exercise to learn how to change the power of the shots. When you do drive to yourself-use more control, when you hit boast-use more power. \r\nIt helps to improve:\r\n- footwork;\r\n- the skill of returning to the center of the court;\r\n- ball control;\r\n- reading the trajectory of the ball;\r\n- shots technique;\r\n- stamina.',
    //       ru_description: '',
    //       title: 'drive-boost-drop-cross-2players-amat',
    //     },
    //     {
    //       uid: '5e048d1e-f1b3-4d00-23-ffb9df08adef',
    //       video:
    //         'https://internal.squash-pride.ru/api/media/drive-boost-drop-cross-2players-amat.MOV',
    //       groups: ['Drive', 'Drop', 'Cross', 'Boost'],
    //       level: 'amateur',
    //       players: 2,
    //       description:
    //         'The main point of exercise to learn how to change the power of the shots. When you do drive to yourself-use more control, when you hit boast-use more power. \r\nIt helps to improve:\r\n- footwork;\r\n- the skill of returning to the center of the court;\r\n- ball control;\r\n- reading the trajectory of the ball;\r\n- shots technique;\r\n- stamina.',
    //       ru_description: '',
    //       title: 'drive-boost-drop-cross-2players-amat',
    //     },
    //     {
    //       uid: '5e048d1e-f1b3-234-99ac-ffb9df08adef',
    //       video:
    //         'https://internal.squash-pride.ru/api/media/drive-boost-drop-cross-2players-amat.MOV',
    //       groups: ['Drive', 'Drop', 'Cross', 'Boost'],
    //       level: 'amateur',
    //       players: 2,
    //       description:
    //         'The main point of exercise to learn how to change the power of the shots. When you do drive to yourself-use more control, when you hit boast-use more power. \r\nIt helps to improve:\r\n- footwork;\r\n- the skill of returning to the center of the court;\r\n- ball control;\r\n- reading the trajectory of the ball;\r\n- shots technique;\r\n- stamina.',
    //       ru_description: '',
    //       title: 'drive-boost-drop-cross-2players-amat',
    //     },
    //   ],
    // },
  ],

  isLoading: false,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers,
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
