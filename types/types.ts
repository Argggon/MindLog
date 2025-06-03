export type Log = {
  id: string;
  time: string;
  type: 'text' | 'voice';
  content: string;
  duration?: string; // 语音日志的时长
  audioUri?: string; // 语音文件的URI
};