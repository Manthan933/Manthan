import faker from 'faker';
// utils
import { mockImgCover } from '../utils/mockImages';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Whiteboard Templates',
  'Tesla Cybertruck-inspired ',
  'Designify Agency Landing ',
  '✨What is Done is Done ✨',
  'Fresh Prince',
  'Six Socks Studio'
];

const classrooms = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: mockImgCover(index + 1),
  title: POST_TITLES[index + 1],
  subject: faker.name.firstName(),
  code: faker.name.firstName(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.findName(),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`
  }
}));

export default classrooms;
