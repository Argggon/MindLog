import { Log } from '../types/types';

export const mockLogs: Log[] = [
  {
    id: '1',
    time: '08:30',
    type: 'text',
    content: '早上醒来感觉精力充沛，今天要完成项目的第一阶段开发。希望一切顺利！',
  },
  {
    id: '2',
    time: '12:15',
    type: 'voice',
    duration: '01:45',
    content: '午餐时间，和同事讨论了一下项目进展。我们需要加快进度，但也要保证质量。',
  },
  {
    id: '3',
    time: '15:40',
    type: 'text',
    content: '遇到了一个棘手的技术问题，花了两个小时才解决。不过从中学习到了新的调试技巧，值得！',
  },
  {
    id: '4',
    time: '18:20',
    type: 'voice',
    duration: '02:30',
    content: '下班路上，思考明天的计划。需要完成用户界面的优化，还要准备周报。',
  },
];