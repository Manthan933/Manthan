import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import githubFill from '@iconify/icons-eva/github-fill';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = (classrooms) => {
  const Childrens = [];

  classrooms.forEach((classroom) => {
    Childrens.push({
      title: classroom.title,
      path: `/class/info?code=${classroom.code}`,
      code: classroom.code
    });
  });
  return [
    {
      title: 'dashboard',
      path: '/dashboard',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'classrooms',
      icon: getIcon(shoppingBagFill),
      children: Childrens
    },
    {
      title: 'github',
      path: '/github',
      icon: getIcon(githubFill)
    }
  ];
};

export default sidebarConfig;
