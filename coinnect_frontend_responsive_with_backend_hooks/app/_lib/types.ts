export type User = {
  id: number;
  name: string;
  email: string;
  initials: string;
  memberSince: string;
  activeGroups: number;
  balance: string;
};

export type QuickAction = {
  title: string;
  subtitle: string;
  tone: string;
  icon: "group" | "bank" | "piggy" | "qr";
};

export type Activity = {
  id: number;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  positive: boolean;
  type: "group" | "incoming" | "outgoing";
};

export type Group = {
  id: number;
  name: string;
  members: string[];
  balance: string;
  detail: string;
  openPayments: number;
};

export type Overview = {
  user: User;
  quickActions: QuickAction[];
  groups: Group[];
  activities: Activity[];
};
